import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable the custom cursor on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    const moveDotX = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMouseMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      moveDotX(event.clientX);
      moveDotY(event.clientY);

      moveRingX(event.clientX);
      moveRingY(event.clientY);

      gsap.to([dot, ring], {
        opacity: 1,
        duration: 0.2,
        overwrite: "auto",
      });

      const target = event.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-cursor-hover]");

      gsap.to(ring, {
        scale: isInteractive ? 1.6 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], {
        opacity: 0,
        duration: 0.2,
      });
    };

    window.addEventListener("pointermove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
