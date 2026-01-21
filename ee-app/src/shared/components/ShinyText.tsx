import { cn } from "@/shared/utils/cn";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={cn("shiny-text", disabled && "disabled", className)}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
