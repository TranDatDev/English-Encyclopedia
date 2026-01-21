import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function FadeInSection({
  children,
  duration = 800,
  translate = "30px",
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  translate?: string;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const style = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${translate})`,
    config: { mass: 1, tension: 120, friction: 20, duration },
  });

  return (
    <animated.div
      ref={ref}
      style={style}
      className={`print:transform-none print:opacity-100 ${className ?? ""}`}
    >
      {children}
    </animated.div>
  );
}
