import { useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

function MagneticButton({
  children,
  className = "",
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const bounds = button.getBoundingClientRect();

    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(button, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

export default MagneticButton;
