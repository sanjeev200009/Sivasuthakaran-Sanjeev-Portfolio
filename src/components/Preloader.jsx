import { useEffect, useRef, useState } from "react";
import "./preloader.css";

const LOAD_TO_NINETY_FOUR_MS = 1900;
const LOAD_FINISH_MS = 260;
// Keep in sync with preloader.css: content exit, then 6 columns at 70ms stagger rising over 760ms.
const COLUMN_COUNT = 6;
const CURTAIN_RISE_MS = 300 + (COLUMN_COUNT - 1) * 70 + 760;
const REDUCED_HOLD_MS = 500;
const REDUCED_EXIT_MS = 220;

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("loading");
  const [visible, setVisible] = useState(true);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    let loadListener;
    let activeAnimation;

    const ready =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => {
            loadListener = resolve;
            window.addEventListener("load", loadListener, { once: true });
          });

    const animateProgress = async ({
      fromScale,
      toScale,
      fromValue,
      toValue,
      duration,
      easing,
    }) => {
      const progressElement = progressRef.current;
      const counterElement = counterRef.current;
      if (!progressElement || !counterElement || cancelled) return;

      activeAnimation = progressElement.animate(
        [
          { transform: `scaleX(${fromScale})` },
          { transform: `scaleX(${toScale})` },
        ],
        { duration, easing, fill: "forwards" },
      );

      const updateCounter = () => {
        if (cancelled || !activeAnimation) return;
        const timing = activeAnimation.effect.getComputedTiming();
        const animationProgress = timing.progress ?? 0;
        const value = Math.floor(
          fromValue + (toValue - fromValue) * animationProgress,
        );
        counterElement.textContent = String(value);

        if (animationProgress < 1) {
          frameId = window.requestAnimationFrame(updateCounter);
        }
      };

      frameId = window.requestAnimationFrame(updateCounter);

      try {
        await activeAnimation.finished;
      } catch {
        return;
      }

      if (cancelled) return;
      progressElement.style.transform = `scaleX(${toScale})`;
      counterElement.textContent = String(toValue);
      activeAnimation.cancel();
      activeAnimation = undefined;
    };

    const run = async () => {
      if (reducedMotionRef.current) {
        progressRef.current.style.transform = "scaleX(1)";
        counterRef.current.textContent = "100";
        await Promise.all([ready, wait(REDUCED_HOLD_MS)]);
      } else {
        await animateProgress({
          fromScale: 0,
          toScale: 0.94,
          fromValue: 0,
          toValue: 94,
          duration: LOAD_TO_NINETY_FOUR_MS,
          easing: "cubic-bezier(0.12, 0.23, 0.5, 1)",
        });
        await ready;
        await animateProgress({
          fromScale: 0.94,
          toScale: 1,
          fromValue: 94,
          toValue: 100,
          duration: LOAD_FINISH_MS,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        });
      }

      if (!cancelled) setPhase("revealing");
    };

    run();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      activeAnimation?.cancel();
      if (loadListener) window.removeEventListener("load", loadListener);
    };
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return undefined;

    const exitDuration = reducedMotionRef.current
      ? REDUCED_EXIT_MS
      : CURTAIN_RISE_MS;
    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, exitDuration);

    return () => window.clearTimeout(timer);
  }, [onComplete, phase]);

  if (!visible) return null;

  return (
    <div
      className={`portfolio-preloader ${phase === "revealing" ? "is-revealing" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={phase === "revealing" ? "Portfolio ready" : "Loading portfolio"}
    >
      {/* Backdrop split along the page's 6 guide columns; they rise in a staggered wave on reveal */}
      <div className="portfolio-preloader__cols" aria-hidden="true">
        {Array.from({ length: COLUMN_COUNT }, (_, index) => (
          <span key={index} style={{ "--col": index }} />
        ))}
      </div>

      <div className="portfolio-preloader__content" aria-hidden="true">
        <p className="portfolio-preloader__label">SANJEEV.STUDIO</p>

        <div className="portfolio-preloader__track">
          <span ref={progressRef} className="portfolio-preloader__progress" />
        </div>

        <p className="portfolio-preloader__counter">
          <span ref={counterRef}>0</span>
          <span className="portfolio-preloader__percent">%</span>
        </p>
      </div>
    </div>
  );
}
