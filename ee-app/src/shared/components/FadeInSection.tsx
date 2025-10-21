import { animated,useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function FadeInSection({
  children,
  duration = 800,
  translate = "30px",
}: {
  children: React.ReactNode;
  duration?: number;
  translate?: string;
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
      className="print:opacity-100 print:transform-none"
    >
      {children}
    </animated.div>
  );
}
