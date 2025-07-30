// src/features/pos/routes/route.tsx
import type { RouteObject } from "react-router";
import MainLayout from "@/shared/layouts/MainLayout";
import PosPage from "@/features/pos/pages/PosPage";
import MarkdownSection from "@/shared/components/MarkdownSection";

// Load tất cả file .md
const files = import.meta.glob("@/features/pos/markdown/*.md", { eager: true });

// Tạo danh sách markdown từ loại
export const posList = Object.entries(files).map(([path, file]) => {
  const name = path.split("/").pop()?.replace(".md", "") || "";
  const rawContent = (file as { default: string }).default;

  // Tìm dòng có "# " đầu tiên
  const match = rawContent.match(/^#\s+(.*)/m);
  const label = match?.[1] || name.charAt(0).toUpperCase() + name.slice(1);

  return {
    slug: name,
    label,
    content: rawContent,
  };
});

// Tạo route cho từng markdown
const children: RouteObject[] = posList.map(({ slug, content }) => ({
  path: slug,
  element: <MarkdownSection content={content} />,
}));

// Route chính
const posRoutes: RouteObject = {
  path: "pos",
  element: <MainLayout />,
  children: [{ index: true, element: <PosPage /> }, ...children],
};

export default posRoutes;
