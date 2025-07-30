import FadeInSection from "@/shared/components/FadeInSection";
export default function MarkdownH1({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <FadeInSection duration={500} translate="10px">
      <h4 id={id} className="text-lg font-medium text-gray-600 mt-4 mb-2">
        {children}
      </h4>
    </FadeInSection>
  );
}
