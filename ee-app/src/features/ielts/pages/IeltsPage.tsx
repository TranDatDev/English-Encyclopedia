import {
  ieltsJsonList,
  ieltsListeningList,
  ieltsReadingList,
  ieltsSpeakingList,
  ieltsWritingList,
} from "@/features/ielts/routes/route";
import CardList from "@/shared/components/card/components/CardList";
import ChatBubbleCard from "@/shared/components/ChatBubbleCard";
import Timeline from "@/shared/components/TimeLine";

export default function IeltsPage() {
  return (
    <>
      <title>IELTS - English Encyclopedia</title>
      <div className="margin-x-default py-10">
        {/* Phần giới thiệu */}
        <div className="mb-12 rounded-2xl bg-blue-100 p-8 pb-32 shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">
            IELTS
          </h1>
          <h2>WORK IN PROCESS</h2>
          <p className="max-w-xl text-gray-600 sm:text-lg">
            IELTS (International English Language Testing System) là một trong
            những kỳ thi đánh giá năng lực tiếng Anh phổ biến nhất trên thế
            giới. Kỳ thi này giúp đánh giá khả năng sử dụng tiếng Anh của thí
            sinh trong các tình huống học tập và làm việc.
          </p>
        </div>
        <div className="my-20 flex hidden gap-4">
          <ChatBubbleCard
            title="Hình Thức"
            subtitle="IELTS có 4 kỹ năng: Nghe, Nói, Đọc, Viết."
            align="bottom-left"
            className="flex-1"
            children={
              <ul className="list-disc pl-5">
                <li>Nghe: 30 phút</li>
                <li>Đọc: 60 phút</li>
                <li>Viết: 60 phút</li>
                <li>Nói: 11-14 phút</li>
              </ul>
            }
          />
          <ChatBubbleCard
            title="Hình Thức"
            subtitle="IELTS có 4 kỹ năng: Nghe, Nói, Đọc, Viết."
            className="flex-1"
            align="bottom-middle"
            children={
              <ul className="list-disc pl-5">
                <li>Nghe: 30 phút</li>
                <li>Đọc: 60 phút</li>
                <li>Viết: 60 phút</li>
                <li>Nói: 11-14 phút</li>
              </ul>
            }
          />
          <ChatBubbleCard
            title="Hình Thức"
            subtitle="IELTS có 4 kỹ năng: Nghe, Nói, Đọc, Viết."
            align="bottom-right"
            className="flex-1"
            children={
              <ul className="list-disc pl-5">
                <li>Nghe: 30 phút</li>
                <li>Đọc: 60 phút</li>
                <li>Viết: 60 phút</li>
                <li>Nói: 11-14 phút</li>
              </ul>
            }
          />
        </div>
        <div className="">
          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Thời gian làm bài
          </h2>
          <Timeline
            items={[
              {
                name: "Listening",
                duration: 30, // chỉ tính phần nghe
                children: [
                  { name: "Recording 1", duration: 7.5 },
                  { name: "Recording 2", duration: 7.5 },
                  { name: "Recording 3", duration: 7.5 },
                  { name: "Recording 4", duration: 7.5 },
                ],
              },
              {
                name: "Reading",
                duration: 60,
                children: [
                  { name: "Passage 1", duration: 15 },
                  { name: "Passage 2", duration: 20 },
                  { name: "Passage 3", duration: 25 },
                ],
              },
              {
                name: "Writing",
                duration: 60,
                children: [
                  { name: "Task 1", duration: 20 },
                  { name: "Task 2", duration: 40 },
                ],
              },
              {
                name: "Speaking",
                duration: 12, // trung bình 11–14
                children: [
                  { name: "Part 1", duration: 4.5 },
                  { name: "Part 2", duration: 3 }, // 1 phút chuẩn bị + 2 phút nói
                  { name: "Part 3", duration: 4.5 },
                ],
              },
            ]}
          />
        </div>
        <section className="mt-12 hidden">
          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Bài tập trắc nghiệm
          </h2>
          {/* Danh sách bài tập */}
          <CardList
            items={ieltsJsonList.map(({ slug, label }) => ({ slug, label }))}
            basePath="/ielts"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />
        </section>
      </div>
      <div className="padding-x-default relative overflow-hidden bg-gradient-to-r from-[hsl(0,50%,30%)] to-[hsl(0,50%,45%)] pt-32 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px] mix-blend-overlay"></div>
        <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_2px,transparent_2px)] [background-size:6px_6px] opacity-30 mix-blend-overlay"></div>
        <section className="mb-48 rounded-xl">
          <p className="mx-auto mb-2 w-fit rounded-full bg-amber-500 px-4 py-2 text-center text-xl">
            Học Tập
          </p>
          <h2 className="mb-4 text-center text-4xl leading-12 font-semibold">
            Kiến Thức Kỹ Năng Nghe
          </h2>
          <p className="mb-20 text-center text-lg font-medium text-gray-200">
            Làm quen với các dạng bài tập và kỹ năng cần thiết cho phần thi
            Nghe.
          </p>
          {/* Danh sách card */}
          <CardList
            items={ieltsListeningList}
            basePath="/ielts"
            subFolder="listening"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />
        </section>
        <section className="mb-48 rounded-xl">
          <p className="mx-auto mb-2 w-fit rounded-full bg-amber-500 px-4 py-2 text-center text-xl">
            Học Tập
          </p>
          <h2 className="mb-4 text-center text-4xl leading-12 font-semibold">
            Kiến Thức Kỹ Năng Nói
          </h2>
          <p className="mb-20 text-center text-lg font-medium text-gray-200">
            Làm quen với các dạng bài tập và kỹ năng cần thiết cho phần thi Nói.
          </p>
          {/* Danh sách card */}
          <CardList
            items={ieltsSpeakingList}
            basePath="/ielts"
            subFolder="speaking"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />
        </section>
        <section className="mb-48 rounded-xl">
          <p className="mx-auto mb-2 w-fit rounded-full bg-amber-500 px-4 py-2 text-center text-xl">
            Học Tập
          </p>
          <h2 className="mb-4 text-center text-4xl leading-12 font-semibold">
            Kiến Thức Kỹ Năng Đọc
          </h2>
          <p className="mb-20 text-center text-lg font-medium text-gray-200">
            Làm quen với các dạng bài tập và kỹ năng cần thiết cho phần thi Đọc.
          </p>
          {/* Danh sách card */}
          <CardList
            items={ieltsReadingList}
            basePath="/ielts"
            subFolder="reading"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />
        </section>
        <section className="mb-48 rounded-xl">
          <p className="mx-auto mb-2 w-fit rounded-full bg-amber-500 px-4 py-2 text-center text-xl">
            Học Tập
          </p>
          <h2 className="mb-4 text-center text-4xl leading-12 font-semibold">
            Kiến Thức Kỹ Năng Viết
          </h2>
          <p className="mb-20 text-center text-lg font-medium text-gray-200">
            Làm quen với các dạng bài tập và kỹ năng cần thiết cho phần thi
            Viết.
          </p>
          {/* Danh sách card */}
          <CardList
            items={ieltsWritingList}
            basePath="/ielts"
            subFolder="writing"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />
        </section>
        <section className="container mx-auto my-12 flex flex-col gap-8">
          {" "}
          <div>
            <h2 className="text-md mb-4 font-bold sm:text-xl">
              Tuyên bố miễn trừ trách nhiệm
            </h2>
            <p className="text-gray-200">
              Ứng dụng này được thiết kế để hỗ trợ bạn chuẩn bị cho kỳ thi IELTS
              thông qua các tài liệu luyện tập, mẹo và chiến lược. Tuy nhiên,
              ứng dụng không được liên kết hoặc xác nhận bởi các tổ chức IELTS
              chính thức, bao gồm <strong>British Council</strong>,{" "}
              <strong>IDP: IELTS Australia</strong> hoặc{" "}
              <strong>Cambridge Assessment English</strong>. Để có sự chuẩn bị
              chính xác và đáng tin cậy nhất, chúng tôi khuyến nghị bạn sử dụng
              các tài liệu và bài thi thử chính thức từ các tổ chức này.
            </p>
          </div>
          <div>
            <h2 className="text-md mb-4 font-bold sm:text-xl">
              Khuyến khích luyện thi IELTS
            </h2>
            <p className="text-gray-200">
              Để đạt kết quả tốt nhất trong kỳ thi IELTS, chúng tôi khuyên bạn
              nên mua và luyện tập với bộ sách <strong>Cambridge IELTS</strong>{" "}
              (từ quyển 1 đến 20), do{" "}
              <strong>Cambridge Assessment English</strong> biên soạn. Bộ sách
              này cung cấp các bài thi thử sát với định dạng và độ khó của kỳ
              thi IELTS thực tế, giúp bạn nâng cao kỹ năng và tự tin để đạt band
              điểm mong muốn. Hãy truy cập trang web chính thức của{" "}
              <a
                href="https://www.ielts.org"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                IELTS
              </a>{" "}
              hoặc các nền tảng được ủy quyền tại Việt Nam để tìm thêm tài liệu
              và thông tin về kỳ thi.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
