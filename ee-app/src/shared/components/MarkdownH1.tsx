import FadeInSection from "@/shared/components/FadeInSection";
export default function MarkdownH1({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <h1
      id={id}
      className="text-3xl font-extrabold text-gray-800 mt-4 mb-4 border-b border-gray-300 pb-2"
    >
      {children}
    </h1>
  );
}
