import { describe, expect, it } from "vitest";
import {
  animate,
  createTimeline,
  scrambleText,
  splitText,
  stagger,
  svg,
} from "animejs";

/**
 * Smoke tests for the anime.js surface the site relies on. Every symbol we
 * import here is used by production code (Hero, AnatomyShowcase, useAnimeReveal,
 * AnimatedHeading, ScrambleLabel). A silent breaking change in a minor bump
 * (e.g. `text.split()` was deprecated in favour of top-level `splitText()` in
 * 4.5) surfaces here before it makes it to prod.
 */

describe("anime.js public API contract", () => {
  it("exports the core animation primitives as callable functions", () => {
    expect(typeof animate).toBe("function");
    expect(typeof createTimeline).toBe("function");
    expect(typeof stagger).toBe("function");
  });

  it("exports splitText as a top-level function (v4.5+ shape)", () => {
    expect(typeof splitText).toBe("function");
  });

  it("exports scrambleText as a top-level function", () => {
    expect(typeof scrambleText).toBe("function");
  });

  it("exposes the svg namespace with createDrawable", () => {
    expect(svg).toBeDefined();
    expect(typeof svg.createDrawable).toBe("function");
  });

  it("stagger(n) returns a value usable as a delay/param", () => {
    // stagger returns either a function or a stagger descriptor depending on
    // whether options are passed. Either way, calling it must not throw.
    expect(() => stagger(50)).not.toThrow();
    expect(() => stagger(50, { start: 200 })).not.toThrow();
  });
});
