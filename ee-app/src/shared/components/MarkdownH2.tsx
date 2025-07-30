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
      <h2
        id={id}
        className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-1 scroll-mt-24"
      >
        {children}
      </h2>
    </FadeInSection>
  );
}
