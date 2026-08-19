import { useEffect, useRef, useState } from "react";

/**
 * Owns the `is-visible` reveal class in React state.
 *
 * The inline observer in BaseLayout also adds `is-visible` to every
 * `[data-observe]` element. That is fine for plain Astro markup, but a
 * hydrated React island is a different story: if the script tags the node
 * before React hydrates, React reconciles className back to its own static
 * value and strips the class off again. The observer has already unobserved
 * by then, so nothing ever puts it back and the section sits at opacity 0
 * permanently. Whether that happens is a timing race, which is why it tends
 * to show up on slower devices and not on a fast local dev server.
 *
 * Any island that carries the `reveal` class should own it through this hook
 * rather than relying on the global script.
 *
 * threshold is 0 on purpose. An element taller than the root height divided
 * by the threshold can never reach that ratio, so a tall section with a
 * fractional threshold may never fire at all on a short viewport. Firing on
 * first contact sidesteps that; `rootMargin` still gives the early trigger.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "120px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
