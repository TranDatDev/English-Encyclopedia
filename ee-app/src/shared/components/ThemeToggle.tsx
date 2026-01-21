// src/components/ThemeToggle.tsx
import { Icon } from "@iconify/react/dist/iconify.js";

import { useTheme } from "@/features/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={toggleTheme}
        className="rounded bg-gray-200 p-2 text-gray-800 transition-colors duration-300 focus:ring focus:outline-none dark:bg-gray-700 dark:text-gray-200"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Icon icon="material-symbols:dark-mode" width={20} height={20} />
        ) : (
          <Icon icon="material-symbols:light-mode" width={20} height={20} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
