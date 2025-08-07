import FadeInSection from "@/shared/components/FadeInSection";
export default function MarkdownH1({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <h4 id={id} className="text-lg font-medium text-gray-600 mt-4 mb-2">
      {children}
    </h4>
  );
}
