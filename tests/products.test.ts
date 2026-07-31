import { describe, expect, it } from "vitest";
import { products } from "../src/data/products";

/**
 * Data-integrity tests for the shop catalogue.
 *
 * The shop trusts this array end-to-end (routing by slug, Stripe pricing in
 * pence, category filters, badge behaviour), so a bad entry lands in prod
 * immediately. These tests lock the invariants the rest of the app assumes.
 */

describe("products catalogue", () => {
  it("has at least one product", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("gives every product a non-empty id, slug and name", () => {
    for (const p of products) {
      expect(p.id, `product ${JSON.stringify(p)} needs an id`).toBeTruthy();
      expect(p.slug, `product ${p.id} needs a slug`).toBeTruthy();
      expect(p.name, `product ${p.id} needs a name`).toBeTruthy();
    }
  });

  it("keeps every id unique", () => {
    const seen = new Map<string, number>();
    for (const p of products) {
      seen.set(p.id, (seen.get(p.id) ?? 0) + 1);
    }
    const dupes = [...seen.entries()].filter(([, n]) => n > 1);
    expect(dupes, `duplicate product ids: ${JSON.stringify(dupes)}`).toEqual(
      [],
    );
  });

  it("keeps every slug unique (URL routing depends on it)", () => {
    const seen = new Map<string, number>();
    for (const p of products) {
      seen.set(p.slug, (seen.get(p.slug) ?? 0) + 1);
    }
    const dupes = [...seen.entries()].filter(([, n]) => n > 1);
    expect(dupes, `duplicate product slugs: ${JSON.stringify(dupes)}`).toEqual(
      [],
    );
  });

  it("stores prices as positive integer pence (Stripe format)", () => {
    for (const p of products) {
      expect(Number.isInteger(p.price), `${p.id} price must be integer`).toBe(
        true,
      );
      expect(p.price, `${p.id} price must be > 0`).toBeGreaterThan(0);
    }
  });

  it("matches displayPrice to the pence value in £X.XX format", () => {
    for (const p of products) {
      const expected = `£${(p.price / 100).toFixed(2)}`;
      expect(
        p.displayPrice,
        `${p.id} displayPrice out of sync with price`,
      ).toBe(expected);
    }
  });

  it("only uses a known set of categories", () => {
    // Kept in sync with the sidebar filter and MaterialsBook copy.
    const allowed = new Set([
      "Articulated",
      "Voronoi",
      "Fidget",
      "Keychains",
      "Tealights",
      "Idol",
      "Bundle",
      "Other",
      "Home",
      "Easter",
      "Clicker",
    ]);
    for (const p of products) {
      expect(
        allowed.has(p.category),
        `${p.id} has unknown category "${p.category}"`,
      ).toBe(true);
    }
  });

  it("keeps stock as null or a non-negative integer", () => {
    for (const p of products) {
      if (p.stock === null) continue;
      expect(
        Number.isInteger(p.stock),
        `${p.id} stock must be integer or null`,
      ).toBe(true);
      expect(
        p.stock,
        `${p.id} stock cannot be negative`,
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it("marks every image path as an absolute site path", () => {
    for (const p of products) {
      if (!p.image) continue;
      expect(
        p.image.startsWith("/"),
        `${p.id} image "${p.image}" must start with /`,
      ).toBe(true);
      if (p.images) {
        for (const extra of p.images) {
          expect(
            extra.startsWith("/"),
            `${p.id} extra image "${extra}" must start with /`,
          ).toBe(true);
        }
      }
    }
  });
});
