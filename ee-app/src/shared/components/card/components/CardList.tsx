import { useTrail } from "@react-spring/web";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import type { CardItem } from "@/shared/components/card/components/Card";
import { Card } from "@/shared/components/card/components/Card";
import {
  ANIMATION_CONFIG,
  ANIMATION_TRIGGER_CONFIG,
  IS_INVISIBLE,
  IS_VISIBLE,
} from "@/shared/constants/animation.constant";

// Định nghĩa kiểu cho props của CardList
interface CardListProps {
  items: CardItem[];
  basePath: string;
  subFolder?: string;
  className?: string;
  subtitle?: string;
  modifiers?: string[];
  hasImage?: boolean;
}

// Hàm thành phần chính để hiển thị danh sách card với hiệu ứng
const CardList = ({
  items,
  basePath,
  subFolder,
  className,
  subtitle,
  modifiers = [],
  hasImage = true,
}: CardListProps) => {
  const [ref, inView] = useInView(ANIMATION_TRIGGER_CONFIG);

  const trail = useTrail(items.length, {
    from: IS_INVISIBLE,
    to: inView ? IS_VISIBLE : IS_INVISIBLE,
    config: ANIMATION_CONFIG,
  });

  const cardListStyle = clsx(
    "mt-4 mb-8 grid items-start gap-4 lg:mt-6 lg:mb-16 lg:gap-8",
    className,
  );
  return (
    <div ref={ref} className={cardListStyle}>
      {items.map((item, index) => (
        <Card
          key={item.slug}
          item={item}
          basePath={basePath}
          subFolder={subFolder}
          subtitle={subtitle}
          modifier={modifiers[index]}
          style={trail[index]}
          hasImage={hasImage}
        />
      ))}
    </div>
  );
};

export default CardList;
