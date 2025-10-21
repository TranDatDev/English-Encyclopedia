import { Icon } from "@iconify/react";
import { animated,useTransition } from "@react-spring/web";
import { useEffect,useState } from "react";

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

  // auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // animation transition
  const transitions = useTransition(index, {
    key: images[index],
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
      className={`relative overflow-hidden ${size} ${rounded} shadow-xl bg-gray-100`}
    >
      {/* images */}
      {transitions((style, i) => (
        <animated.img
          key={images[i]}
          src={images[i]}
          alt={`carousel-${i}`}
          className={`absolute inset-0 w-full h-full object-cover ${rounded}`}
          style={style}
        />
      ))}

      {/* controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button
          onClick={goPrev}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition text-white"
        >
          <Icon icon="mdi:chevron-left" />
        </button>
        <button
          onClick={goNext}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition text-white"
        >
          <Icon icon="mdi:chevron-right" />
        </button>
      </div>

      {/* dots indicator */}
      <div className="absolute bottom-4 right-8 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
