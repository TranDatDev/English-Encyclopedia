import { loadMarkdownByFeature } from "@/shared/utils/loadMarkdownFiles";
import CardList from "@/shared/components/CardList";

export const activeTenseList = loadMarkdownByFeature("grammar", "tense/active");

export default function GrammarPage() {
  return (
    <>
      <title>Ngữ Pháp - English Encyclopedia</title>
      <div className="margin-default py-10">
        {/* Phần giới thiệu */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Ngữ Pháp
          </h1>
          <p className="text-gray-600 sm:text-lg">
            Ngữ pháp (grammar) là một trong những phần quan trọng nhất trong
            việc học tiếng Anh. Giúp phân loại từ vựng theo chức năng và ý nghĩa
            của chúng trong câu.
          </p>
        </div>
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Các Thì Chủ Động
          </h2>
          {/* Danh sách card */}
          <CardList
            items={activeTenseList}
            basePath="/grammar"
            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            subtitle="Thể Chủ Động"
          />
        </section>
      </div>
    </>
  );
}
