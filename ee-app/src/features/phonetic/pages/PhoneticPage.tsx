import {
  phoneticPronounceExerciseList,
  phoneticStressExerciseList,
  pronounceList,
  stressList,
} from "@/features/phonetic/routes/list";
import CardList from "@/shared/components/card/components/CardList";

const PhoneticPage = () => {
  return (
    <>
      <title>Ngữ Âm - English Encyclopedia</title>
      <div className="margin-x-default py-10">
        <div className="mb-12 max-w-3xl">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
            Ngữ Âm
          </h1>
          <p className="text-gray-600 sm:text-lg">
            Ngữ âm (phonetic) là một trong những phần quan trọng nhất trong việc
            học tiếng Anh. Giúp phân loại từ vựng theo chức năng và ý nghĩa của
            chúng trong câu.
          </p>
        </div>
        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Ngữ Âm Trong Tiếng Anh
          </h2>
          <h3 className="mt-8 mb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Phiên Âm
          </h3>
          {/* Danh sách card */}
          <CardList
            items={pronounceList}
            basePath="/phonetic"
            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            subtitle="Thể Chủ Động"
          />
          <h3 className="mt-8 mb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Trọng Âm (Stress)
          </h3>
          <CardList
            items={stressList}
            basePath="/phonetic"
            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            subtitle="Thể Bị Động"
          />
        </section>
      </div>
      <section className="margin-x-default py-10">
        <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
          Bài tập phát âm
        </h2>
        {/* Danh sách bài tập */}
        <CardList
          items={phoneticStressExerciseList.map(({ slug, label }) => ({
            slug,
            label,
          }))}
          basePath="/phonetic"
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          hasImage={false}
        />
      </section>
      <section className="margin-x-default py-10">
        <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
          Bài tập trọng âm
        </h2>
        {/* Danh sách bài tập */}
        <CardList
          items={phoneticPronounceExerciseList.map(({ slug, label }) => ({
            slug,
            label,
          }))}
          basePath="/phonetic"
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          hasImage={false}
        />
      </section>
    </>
  );
};

export default PhoneticPage;
