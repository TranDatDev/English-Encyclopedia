import {
  activeTenseList,
  grammarMultipleChoiceExerciseList,
  grammarPronounceExerciseList,
  grammarStressExerciseList,
  passiveTenseList,
} from "@/features/grammar/routes/list";
import CardList from "@/shared/components/card/components/CardList";
import { Heading } from "@/shared/components/Heading";

export default function GrammarPage() {
  return (
    <>
      <title>Ngữ Pháp - English Encyclopedia</title>
      <div className="margin-x-default py-10">
        {/* Phần giới thiệu */}
        <div className="mb-12 max-w-3xl">
          <Heading level={1}>Ngữ Pháp</Heading>
          <p className="text-black-600 dark:text-white-600 sm:text-lg">
            Ngữ pháp (grammar) là một trong những phần quan trọng nhất trong
            việc học tiếng Anh. Giúp phân loại từ vựng theo chức năng và ý nghĩa
            của chúng trong câu.
          </p>
        </div>
        <section>
          <Heading level={2}>Các Thì (Tenses)</Heading>
          <h3 className="mt-8 mb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Thể Chủ Động (Active Voice)
          </h3>
          <blockquote className="m-28 text-5xl leading-20">
            “Thể chủ động đặt chủ thể vào trung tâm hành động — ai làm, làm gì
            được thể hiện rõ ràng. Câu văn vì thế trở nên trực diện, mạch lạc và
            đầy sức thuyết phục.”
          </blockquote>
          {/* Danh sách card */}
          <CardList
            items={activeTenseList}
            basePath="/grammar"
            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            subtitle="Thể Chủ Động"
          />
          <h3 className="mt-8 mb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Thể Bị Động (Passive Voice)
          </h3>
          <blockquote className="m-28 text-5xl leading-20">
            “Trong thể bị động, hành động được đặt lên trước, còn chủ thể có thể
            ẩn đi hoặc lùi về phía sau — điều được nhấn mạnh không phải là ai
            làm, mà là điều gì đã xảy ra. Nhờ đó, câu văn trở nên khách quan,
            tinh tế và giàu chiều sâu biểu đạt.”
          </blockquote>
          <CardList
            items={passiveTenseList}
            basePath="/grammar"
            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            subtitle="Thể Bị Động"
          />
        </section>
      </div>
      <section className="margin-x-default py-10">
        <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
          Bài tập trắc nghiệm
        </h2>
        {/* Danh sách bài tập */}
        <CardList
          items={grammarMultipleChoiceExerciseList.map(({ slug, label }) => ({
            slug,
            label,
          }))}
          basePath="/grammar"
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
          items={grammarStressExerciseList.map(({ slug, label }) => ({
            slug,
            label,
          }))}
          basePath="/grammar"
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          hasImage={false}
        />
      </section>
      <section className="margin-x-default py-10">
        <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
          Bài tập phát âm
        </h2>
        {/* Danh sách bài tập */}
        <CardList
          items={grammarPronounceExerciseList.map(({ slug, label }) => ({
            slug,
            label,
          }))}
          basePath="/grammar"
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          hasImage={false}
        />
      </section>
    </>
  );
}
