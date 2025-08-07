import { posList } from "@/features/pos/routes/route";
import CardList from "@/shared/components/CardList";
export default function PosPage() {
  return (
    <>
      <title>Từ loại - English Encyclopedia</title>
      <div className="margin-default py-10">
        {/* Phần giới thiệu */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Từ loại
          </h1>
          <p className="text-gray-600 sm:text-lg">
            Từ loại (part of speech) là một trong những phần quan trọng nhất
            trong ngữ pháp tiếng Anh. Giúp phân loại từ vựng theo chức năng và ý
            nghĩa của chúng trong câu.
          </p>
        </div>
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Danh sách từ loại
          </h2>
          {/* Danh sách card */}
          <CardList
            items={posList}
            basePath="/pos"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          />
        </section>
      </div>
    </>
  );
}
