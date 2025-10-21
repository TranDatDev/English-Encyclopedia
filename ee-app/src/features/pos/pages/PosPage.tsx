import { posJsonList, posList } from "@/features/pos/routes/route";
import CardList from "@/shared/components/card/components/CardList";

export default function PosPage() {
  return (
    <>
      <title>Từ loại - English Encyclopedia</title>
      <div className="margin-x-default py-10">
        {/* Phần giới thiệu */}
        <div className="mb-12 max-w-3xl">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
            Từ loại
          </h1>
          <p className="text-gray-600 sm:text-lg">
            Từ loại (part of speech) là một trong những phần quan trọng nhất
            trong ngữ pháp tiếng Anh. Giúp phân loại từ vựng theo chức năng và ý
            nghĩa của chúng trong câu.
          </p>
        </div>
        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Danh sách từ loại
          </h2>
          {/* Danh sách card */}
          <CardList
            items={posList}
            basePath="/pos"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          />
        </section>
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Bài tập trắc nghiệm
          </h2>
          {/* Danh sách bài tập */}
          <CardList
            items={posJsonList.map(({ slug, label }) => ({ slug, label }))}
            basePath="/pos"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          />
        </section>
      </div>
    </>
  );
}
