import { animated, SpringValue } from "@react-spring/web";
import clsx from "clsx";
import { Link } from "react-router";

export interface CardItem {
  slug: string;
  label: string;
}

interface CardStyle {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

interface CardProps {
  item: CardItem;
  basePath: string;
  subFolder?: string;
  subtitle?: string;
  modifier?: string;
  style?: CardStyle;
  hasImage?: boolean;
}

export const Card: React.FC<CardProps> = ({
  item,
  basePath,
  subFolder,
  subtitle,
  modifier,
  style,
  hasImage = true,
}) => {
  const { slug, label } = item;

  // hàm tái sử dụng để xây dựng đường dẫn
  const buildPath = (ext?: string) => {
    const prefix = subFolder ? `${subFolder}/` : "";
    return `${basePath}/${prefix}${slug}${ext ? `.${ext}` : ""}`;
  };

  const imagePath = buildPath("jpg");
  const linkPath = buildPath();

  return (
    <animated.div style={style} className="h-full">
      <Link
        to={linkPath}
        className={clsx(
          "group bg-white-950 dark:bg-black-950 block h-full overflow-hidden rounded-t-xl shadow-lg transition-transform duration-200",
          "dark: hover:dark:shadow-black-800 hover:scale-[1.075] hover:shadow-2xl",
        )}
      >
        {hasImage && <CardImage src={imagePath} alt={label} />}
        <CardContent label={label} subtitle={subtitle} modifier={modifier} />
      </Link>
    </animated.div>
  );
};

export default Card;

// Phần ảnh
const CardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="aspect-video w-full overflow-hidden bg-gray-100">
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-200 dark:brightness-90"
    />
  </div>
);

// Phần nội dung
const CardContent = ({
  label,
  subtitle,
  modifier,
}: {
  label: string;
  subtitle?: string;
  modifier?: string;
}) => (
  <div className="p-4">
    <p className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-600 dark:text-white">
      {label}
    </p>
    {subtitle && (
      <p className="text-sm text-gray-800 dark:text-white">
        {subtitle} {modifier && `(${modifier})`}
      </p>
    )}
    <p className="dark:text-white-900 mt-2 text-sm text-gray-600">
      Tổng hợp kiến thức từ A đến Z
    </p>
  </div>
);
