import noun from "@/features/pos/markdown/noun.md";
import MarkdownSection from "@/shared/components/MarkdownSection";

const NounPage = () => {
  return (
    <div className="flex">
      <main className="w-fit">
        <MarkdownSection content={noun} />
      </main>
      <aside className="px-4">
        <h1>haha</h1>
      </aside>
    </div>
  );
};

export default NounPage;
