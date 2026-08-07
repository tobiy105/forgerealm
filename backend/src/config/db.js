/**
 * Postgres pool for Neon.
 *
 * Preserves the mysql2-style call shape the rest of the app already uses:
 *   const [rows] = await pool.query('SELECT * FROM x WHERE id = ?', [42]);
 *
 * so the ~30 existing call sites don't need touching. The wrapper:
 *   - rewrites `?` placeholders to Postgres `$1, $2, ...` positional params
 *   - returns a [rows, meta] tuple so `const [rows] = ...` destructures the
 *     way mysql2 always did
 *
 * Configuration order:
 *   1. DATABASE_URL — Neon-style URL, `postgresql://user:pass@host/db`.
 *      SSL is forced on because Neon (and any managed Postgres worth using)
 *      refuses non-TLS connections.
 *   2. Falls back to individual DB_HOST / DB_USER / DB_PASS / DB_NAME env
 *      vars for local dev against a plain Postgres instance without TLS.
 *
 * Sites that need Postgres-specific SQL (`RETURNING id` instead of
 * mysql2's `result.insertId`, multi-row inserts via UNNEST rather than
 * MySQL's `VALUES ?` shorthand) have been hand-fixed at the call sites.
 */

const { Pool } = require("pg");

const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASS || undefined,
      database: process.env.DB_NAME || "forgerealm",
      max: 10,
    };

const rawPool = new Pool(config);

/**
 * Rewrite mysql2-style `?` placeholders to Postgres `$1, $2, ...`.
 * Skips `?` characters inside single-quoted string literals so `WHERE
 * note LIKE 'hey?'` doesn't get mangled.
 */
function toPgPlaceholders(sql) {
  let out = "";
  let i = 0;
  let n = 0;
  let inString = false;
  while (i < sql.length) {
    const ch = sql[i];
    if (ch === "'") {
      // Toggle in/out of a string. Handle escaped '' inside strings.
      if (inString && sql[i + 1] === "'") {
        out += "''";
        i += 2;
        continue;
      }
      inString = !inString;
      out += ch;
      i++;
      continue;
    }
    if (!inString && ch === "?") {
      n += 1;
      out += "$" + n;
      i++;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

/**
 * Wrap a pg client (either a pool member or a dedicated per-transaction
 * connection) so callers see the mysql2-style tuple return + `?` placeholders.
 */
function wrapClient(pgClient) {
  const q = async (sql, params) => {
    const text = toPgPlaceholders(sql);
    const result = await pgClient.query(text, params);
    return [result.rows, { rowCount: result.rowCount, fields: result.fields }];
  };
  return {
    query: q,
    // mysql2 exposed both `.query` and `.execute` — keep the alias so
    // controllers that reach for `.execute` don't need editing.
    execute: q,
    beginTransaction: () => pgClient.query("BEGIN"),
    commit: () => pgClient.query("COMMIT"),
    rollback: () => pgClient.query("ROLLBACK"),
    // Only a dedicated connection has `.release()` — pool-level queries
    // don't. The transaction code path is the only caller.
    release: () =>
      typeof pgClient.release === "function" ? pgClient.release() : undefined,
  };
}

const pool = {
  ...wrapClient(rawPool),
  /**
   * Mysql2-parity: check out a dedicated client for a transaction. Callers
   * must call `.release()` in a finally block.
   */
  getConnection: async () => wrapClient(await rawPool.connect()),
  end: () => rawPool.end(),
  /** Exposed for tests + debugging. */
  _raw: rawPool,
  _toPgPlaceholders: toPgPlaceholders,
};

module.exports = pool;
