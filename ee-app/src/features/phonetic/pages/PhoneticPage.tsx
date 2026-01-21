import {
  phoneticPronounceExerciseList,
  phoneticStressExerciseList,
  pronounceList,
  stressList,
} from "@/features/phonetic/routes/list";
import CardList from "@/shared/components/card/components/CardList";

const freeSpeakingSites = [
  {
    name: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish",
    description: "Kho học liệu miễn phí về phát âm, hội thoại và luyện nói.",
  },
  {
    name: "VOA Learning English",
    url: "https://learningenglish.voanews.com",
    description: "Tin tức đọc chậm kèm hội thoại giúp luyện nói tự nhiên.",
  },
  {
    name: "Breaking News English",
    url: "https://breakingnewsenglish.com",
    description: "Luyện nói dựa trên bài báo thời sự miễn phí.",
  },
  {
    name: "ESL Conversation Questions",
    url: "https://eslconversationquestions.com",
    description: "Hàng nghìn câu hỏi thảo luận để luyện nói.",
  },
  {
    name: "ESL Discussions",
    url: "https://esldiscussions.com",
    description: "PDF câu hỏi hội thoại 2 chiều miễn phí.",
  },
  {
    name: "ESL Speaking",
    url: "https://eslspeaking.org",
    description: "Ý tưởng hoạt động và chủ đề luyện nói.",
  },
  {
    name: "IELTS Liz (Free Section)",
    url: "https://www.ieltsliz.com",
    description: "Mẹo và bài mẫu Speaking miễn phí.",
  },
  {
    name: "IELTS Buddy",
    url: "https://www.ieltsbuddy.com",
    description: "Bài tập và hướng dẫn Speaking miễn phí.",
  },
  {
    name: "IELTS Speaking (Free)",
    url: "https://ieltsspeaking.co.uk",
    description: "Câu hỏi và bài mẫu Speaking không mất phí.",
  },
  {
    name: "English Club",
    url: "https://www.englishclub.com/speaking",
    description: "Học nói qua hội thoại và bài tập miễn phí.",
  },
  {
    name: "Elllo",
    url: "https://elllo.org",
    description: "Audio và video hội thoại kèm câu hỏi thảo luận.",
  },
  {
    name: "ManyThings.org",
    url: "https://www.manythings.org",
    description: "Các hoạt động Speaking đơn giản.",
  },
  {
    name: "Speakspeak",
    url: "https://speakspeak.com",
    description: "Câu hỏi speaking và đoạn hội thoại miễn phí.",
  },
  {
    name: "My English Pages",
    url: "https://www.myenglishpages.com",
    description: "Chủ đề Speaking và câu hỏi luyện nói.",
  },
  {
    name: "LearnEnglish Teens",
    url: "https://learnenglishteens.britishcouncil.org/speaking",
    description: "Video và bài luyện nói miễn phí.",
  },
  {
    name: "LearnEnglish",
    url: "https://learnenglish.britishcouncil.org",
    description: "Hội thoại và bài tập Speaking thực tế.",
  },
  {
    name: "Agenda Web",
    url: "https://agendaweb.org",
    description: "Câu hỏi speaking theo chủ đề.",
  },
  {
    name: "ESL Fast",
    url: "https://eslfast.com",
    description: "Hàng trăm đoạn hội thoại ngắn và bài luyện nói.",
  },
  {
    name: "TalkEnglish Basic Lessons (Free)",
    url: "https://talkenglish.com/lessons/basics",
    description: "Các bài hội thoại mẫu để luyện nói theo đoạn.",
  },
  {
    name: "Conversation Questions (ITeSLJ)",
    url: "https://iteslj.org/questions",
    description: "Tổng hợp câu hỏi speaking miễn phí.",
  },
];

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

      {/* SECTION MỚI */}
      <section className="margin-x-default py-14">
        <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
          Trang web luyện Speaking miễn phí
        </h2>

        <div className="space-y-6">
          {freeSpeakingSites.map((site) => (
            <div
              key={site.url}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener"
                className="text-lg font-semibold text-blue-700 hover:underline"
              >
                {site.name}
              </a>
              <p className="mt-1 text-gray-600">{site.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PhoneticPage;
