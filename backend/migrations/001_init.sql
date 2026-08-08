-- ForgeRealm site DB — initial Postgres schema for Neon.
-- Ported from the MySQL RDS dump on migration day. Column names, defaults,
-- indexes and FK constraints match the MySQL originals; MySQL-specific types
-- are translated:
--   int AUTO_INCREMENT     -> integer GENERATED ALWAYS AS IDENTITY
--   json                   -> jsonb
--   tinyint(1)             -> boolean
--   datetime / timestamp   -> timestamptz
--   mediumblob             -> bytea
-- MySQL's `ON UPDATE CURRENT_TIMESTAMP` behaviour on `orders.updated_at`
-- is preserved via a BEFORE UPDATE trigger at the bottom of this file.

BEGIN;

-- --------------------------------------------------------------------------
-- admin_users
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username      varchar(100)  NOT NULL UNIQUE,
  password_hash varchar(255)  NOT NULL,
  salt          varchar(100)  NOT NULL,
  role          varchar(50)   NOT NULL DEFAULT 'admin',
  created_at    timestamptz   NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------------
-- users
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                              integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username                        varchar(100)  NOT NULL UNIQUE,
  email                           varchar(255)  UNIQUE,
  password_hash                   varchar(255)  NOT NULL,
  salt                            varchar(100)  NOT NULL,
  role                            varchar(50)   NOT NULL DEFAULT 'user',
  created_at                      timestamptz   NOT NULL DEFAULT NOW(),
  email_verified                  boolean       NOT NULL DEFAULT FALSE,
  email_verification_token_hash   varchar(255),
  email_verification_sent_at      timestamptz,
  email_verified_at               timestamptz,
  password_reset_token_hash       varchar(255),
  password_reset_sent_at          timestamptz
);

-- --------------------------------------------------------------------------
-- user_activation_tokens
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_activation_tokens (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    integer      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      varchar(255) NOT NULL UNIQUE,
  expires_at timestamptz  NOT NULL,
  used_at    timestamptz,
  created_at timestamptz  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_uat_user_id ON user_activation_tokens (user_id);

-- --------------------------------------------------------------------------
-- products
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        varchar(255)   NOT NULL,
  description text,
  price       numeric(10,2)  NOT NULL,
  stock       integer        NOT NULL,
  created_at  timestamptz    NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------------
-- product_images
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_images (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id integer      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  path       varchar(500) NOT NULL,
  is_primary boolean      NOT NULL DEFAULT FALSE,
  created_at timestamptz  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images (product_id);

-- --------------------------------------------------------------------------
-- orders
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id          varchar(255)  NOT NULL UNIQUE,
  user_id           integer       REFERENCES users(id) ON DELETE SET NULL,
  total_amount      numeric(10,2) NOT NULL,
  items_json        jsonb         NOT NULL,
  email             varchar(255)  NOT NULL,
  status            varchar(50)   NOT NULL DEFAULT 'completed',
  created_at        timestamptz   NOT NULL DEFAULT NOW(),
  updated_at        timestamptz   NOT NULL DEFAULT NOW(),
  refund_amount     numeric(10,2),
  refunded_at       timestamptz,
  shipping_address  text,
  notes             text
);
CREATE INDEX IF NOT EXISTS idx_orders_order_id   ON orders (order_id);
CREATE INDEX IF NOT EXISTS idx_orders_email      ON orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id    ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);

-- Emulate MySQL's `ON UPDATE CURRENT_TIMESTAMP` for orders.updated_at.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_set_updated_at ON orders;
CREATE TRIGGER trg_orders_set_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- --------------------------------------------------------------------------
-- receipts
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS receipts (
  id             integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id       varchar(255) NOT NULL UNIQUE,
  invoice_number varchar(50)  NOT NULL,
  customer_name  varchar(255) DEFAULT '',
  customer_email varchar(255) DEFAULT '',
  items_json     text,
  subtotal_pence integer      NOT NULL DEFAULT 0,
  shipping_pence integer      NOT NULL DEFAULT 0,
  total_pence    integer      NOT NULL DEFAULT 0,
  pdf_data       bytea,
  created_at     timestamptz  NOT NULL DEFAULT NOW()
);

COMMIT;
