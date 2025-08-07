// src/components/CardList.tsx
import { Link } from "react-router-dom";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
type CardItem = {
  slug: string;
  label: string;
};

interface CardListProps {
  items: CardItem[];
  basePath?: string;
  className?: string;
  subtitle?: string;
}

export default function CardList({
  items,
  basePath,
  className,
  subtitle,
}: CardListProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: inView
      ? { opacity: 1, transform: "translateY(0px)" }
      : { opacity: 0, transform: "translateY(10px)" },
    config: { tension: 450, friction: 30, clamp: true },
  });

  return (
    <div ref={ref} className={`grid gap-4 lg:gap-8 items-start ${className}`}>
      {trail.map((style, i) => {
        const { slug, label } = items[i];
        return (
          <animated.div key={slug} style={style}>
            <Link
              to={`${basePath}/${slug}`}
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.075] transition-transform duration-200 bg-white"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  loading="lazy"
                  src={`${basePath}/${slug}.jpg`}
                  alt={slug}
                  className="w-full h-full object-cover transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {label}
                </p>
                {subtitle && (
                  <p className="text-gray-800 text-sm">{subtitle}</p>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  Tổng hợp kiến thức từ A đến Z
                </p>
              </div>
            </Link>
          </animated.div>
        );
      })}
    </div>
  );
}
