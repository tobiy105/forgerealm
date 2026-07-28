import { useEffect, useRef, useState } from "react";
import { onScroll } from "animejs";
import type { DependencyList, RefObject } from "react";
import type {
  ScrollObserver,
  ScrollThresholdParam,
  ScrollThresholdValue,
  Timer,
} from "animejs";
import { clearWillChange, prefersReducedMotion, setWillChange } from "./motion";

type ScrubOpts = {
  /** viewport crossing where the scrub starts (anime threshold syntax) */
  enter?: ScrollThresholdValue | ScrollThresholdParam;
  /** viewport crossing where the scrub ends */
  leave?: ScrollThresholdValue | ScrollThresholdParam;
  /** onScroll `sync` — a number gives smooth catch-up (default 0.25) */
  sync?: boolean | number | string;
  /** selector for descendants that get will-change while the root is in view */
  willChange?: string;
  /** tear down and rebuild the timeline on resize instead of refreshing bounds */
  rebuildOnResize?: boolean;
};

/**
 * Scroll-scrubbed timeline: `build` returns an anime Timeline/JSAnimation
 * (author it with `autoplay: false`) whose progress is then driven by the
 * root element's viewport crossing via anime v4 `onScroll`, with smooth
 * catch-up. Resize refreshes the observer bounds (or rebuilds the timeline
 * with `rebuildOnResize`); `refresh(true)` forces a rebuild manually. Under
 * `prefers-reduced-motion` the timeline is built once, sought to its final
 * frame and left static. Scrub targets must NEVER carry `data-ar`.
 */
export function useScrollScrub<T extends HTMLElement>(
  build: (root: T) => Timer,
  {
    enter = "bottom top",
    leave = "top bottom",
    sync = 0.25,
    willChange,
    rebuildOnResize = false,
  }: ScrubOpts = {},
  deps: DependencyList = [],
): { ref: RefObject<T | null>; refresh: (rebuild?: boolean) => void } {
  const ref = useRef<T>(null);
  // Stable identity across renders so consumers can safely call it anywhere.
  const [refreshBox] = useState(() => ({
    fn: (_rebuild?: boolean) => {},
  }));

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === "undefined") return;

    if (prefersReducedMotion()) {
      // Static final state: build once, jump to the end, never tick.
      const anim = build(root);
      anim.pause();
      anim.seek(anim.duration);
      refreshBox.fn = () => {};
      return () => anim.cancel();
    }

    const wcTargets = willChange
      ? Array.from(root.querySelectorAll<HTMLElement>(willChange))
      : [];

    let anim: Timer | null = null;
    let observer: ScrollObserver | null = null;

    const teardown = () => {
      clearWillChange(wcTargets);
      observer?.revert();
      anim?.cancel();
      observer = null;
      anim = null;
    };

    const setup = () => {
      anim = build(root);
      observer = onScroll({
        target: root,
        enter,
        leave,
        sync,
        onEnter: () => setWillChange(wcTargets),
        onLeave: () => clearWillChange(wcTargets),
      });
      observer.link(anim);
    };

    const refresh = (rebuild = false) => {
      if (rebuild || rebuildOnResize) {
        teardown();
        setup();
      } else {
        observer?.refresh();
      }
    };
    refreshBox.fn = refresh;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => refresh(), 150);
    };

    setup();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      refreshBox.fn = () => {};
      teardown();
    };
  }, deps);

  return { ref, refresh: (rebuild?: boolean) => refreshBox.fn(rebuild) };
}
