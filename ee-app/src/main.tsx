import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/features/contexts/ThemeContext";
import ThemeToggle from "@/shared/components/ThemeToggle";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <ThemeToggle />
    </ThemeProvider>
  </StrictMode>,
);
