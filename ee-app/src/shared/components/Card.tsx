import { cn } from "@/shared/utils/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined";
};

const Card = ({ children, className, variant = "default" }: CardProps) => {
  const baseStyle = "min-h-[20vh] rounded-md text-gray-900";
  const variantStyle = {
    default: "",
    outlined: "border-2 border-gray-400",
    shadow: "shadow-md",
  };
  return (
    <div className={cn(baseStyle, variantStyle[variant], className)}>
      {children}
    </div>
  );
};

export default Card;
