import FadeInSection from "@/shared/components/FadeInSection";
export default function MarkdownH1({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <h3 id={id} className="text-2xl font-semibold text-gray-700 mt-6 mb-3">
      {children}
    </h3>
  );
}
