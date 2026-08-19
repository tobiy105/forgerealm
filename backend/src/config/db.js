/**
 * Postgres pool for Neon.
 *
 * Preserves the `?`-placeholder, tuple-returning call shape the rest of the
 * app already uses:
 *   const [rows] = await pool.query('SELECT * FROM x WHERE id = ?', [42]);
 *
 * so the ~30 existing call sites don't need touching. The wrapper:
 *   - rewrites `?` placeholders to Postgres `$1, $2, ...` positional params
 *   - returns a [rows, meta] tuple so `const [rows] = ...` destructures
 *
 * Configuration is DATABASE_URL only, and it is required. There is
 * deliberately no host/user/password fallback: those variable names are
 * still set on some deploy targets and pointing at retired infrastructure,
 * so a fallback would let a missing DATABASE_URL silently connect somewhere
 * unintended instead of failing loudly.
 *
 * Sites that need Postgres-specific SQL (`RETURNING id` for generated keys,
 * multi-row inserts via UNNEST) have been hand-fixed at the call sites.
 */

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error(
    "FATAL: DATABASE_URL environment variable is required (Postgres connection string)",
  );
  process.exit(1);
}

// Managed Postgres refuses non-TLS connections; a local instance usually has
// no certificate at all, so only ask for TLS when we are not on localhost.
const isLocalConnection =
  /@(localhost|127\.0\.0\.1)[:/]/.test(connectionString) ||
  /[?&]sslmode=disable\b/.test(connectionString);

const rawPool = new Pool({
  connectionString,
  ...(isLocalConnection ? {} : { ssl: { rejectUnauthorized: false } }),
  max: 10,
});

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
