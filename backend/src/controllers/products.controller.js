const fs = require("fs");
const path = require("path");
const pool = require("../config/db");
const { ApiError, asyncHandler } = require("../utils/errors");

const moveFileToProductDir = async (productId, file) => {
  const destDir = path.join(
    __dirname,
    `../../uploads/products/product-${productId}`,
  );
  await fs.promises.mkdir(destDir, { recursive: true });
  const destPath = path.join(destDir, path.basename(file.path));
  await fs.promises.rename(file.path, destPath);
  return {
    absolute: destPath,
    relative: path
      .relative(path.join(__dirname, "../../uploads"), destPath)
      .replace(/\\/g, "/"),
  };
};

const getProducts = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.*, (
        SELECT path FROM product_images img
        WHERE img.product_id = p.id AND img.is_primary = 1
        ORDER BY img.id ASC LIMIT 1
      ) AS primary_image
     FROM products p
     ORDER BY p.created_at DESC`,
  );
  res.json(rows);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [[product]] = await pool.query("SELECT * FROM products WHERE id = ?", [
    id,
  ]);
  if (!product) throw new ApiError(404, "Product not found");

  const [images] = await pool.query(
    "SELECT id, path, is_primary, created_at FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, id ASC",
    [id],
  );

  res.json({ ...product, images });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !price || !stock) {
    throw new ApiError(400, "name, price, and stock are required");
  }

  const priceNum = parseFloat(price);
  const stockNum = parseInt(stock, 10);

  if (Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
    throw new ApiError(
      400,
      "price must be a number and stock must be an integer",
    );
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      "INSERT INTO products (name, description, price, stock, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, description || "", priceNum, stockNum],
    );
    const productId = result.insertId;

    const files = req.files || [];
    const imageInserts = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const paths = await moveFileToProductDir(productId, file);
      imageInserts.push([productId, paths.relative, i === 0 ? 1 : 0]);
    }

    if (imageInserts.length > 0) {
      await conn.query(
        "INSERT INTO product_images (product_id, path, is_primary, created_at) VALUES ?",
        [imageInserts.map((row) => [...row, new Date()])],
      );
    }

    await conn.commit();

    const [[created]] = await conn.query(
      "SELECT * FROM products WHERE id = ?",
      [productId],
    );
    const [images] = await conn.query(
      "SELECT id, path, is_primary, created_at FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, id ASC",
      [productId],
    );

    res.status(201).json({ ...created, images });
  } catch (err) {
    await conn.rollback();
    if (req.files) {
      await Promise.all(
        req.files.map((f) => fs.promises.unlink(f.path).catch(() => {})),
      );
    }
    throw err;
  } finally {
    conn.release();
  }
});

module.exports = { getProducts, getProductById, createProduct };
