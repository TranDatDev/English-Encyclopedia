import { Icon } from "@iconify/react";
import { animated, useTransition } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface AutoCarouselProps {
  images: string[];
  interval?: number;
  size?: string;
  rounded?: string;
}

export default function AutoCarousel({
  images,
  interval = 5000,
  size = "w-96 h-96",
  rounded = "rounded-3xl",
}: AutoCarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  if (!images || images.length === 0) return null;

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images, interval]);

  const transitions = useTransition(index, {
    from: { opacity: 0, transform: "translateX(30px) scale(1.05)" },
    enter: { opacity: 1, transform: "translateX(0px) scale(1)" },
    leave: { opacity: 0, transform: "translateX(-30px) scale(0.95)" },
    config: { tension: 250, friction: 28 },
  });

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className={`relative overflow-hidden ${size} ${rounded} bg-gray-100 shadow-xl`}
    >
      {transitions((style, i) => (
        <animated.img
          key={i}
          src={images[i]}
          alt=""
          style={style}
          className={`absolute inset-0 h-full w-full object-cover ${rounded}`}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button
          onClick={goPrev}
          className="rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        >
          <Icon icon="mdi:chevron-left" width={20} height={20} />
        </button>
        <button
          onClick={goNext}
          className="rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        >
          <Icon icon="mdi:chevron-right" width={20} height={20} />
        </button>
      </div>

      <div className="absolute right-8 bottom-4 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "scale-110 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
