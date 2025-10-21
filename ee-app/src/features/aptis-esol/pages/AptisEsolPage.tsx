import {
  aptisEsolListeningList,
  aptisEsolReadingList,
  aptisEsolSpeakingList,
  aptisEsolWritingList,
} from "@/features/aptis-esol/routes/route";
import CardList from "@/shared/components/card/components/CardList";
import CardWithInfo from "@/shared/components/card/components/CardWithInfo";
import ChatBubbleCard from "@/shared/components/ChatBubbleCard";

export default function AptisEsolPage() {
  return (
    <>
      <title>Aptis Esol - English Encyclopedia</title>
      <div className="padding-x-default py-20">
        {/* Phần giới thiệu */}
        <div className="relative mb-12 max-w-3xl">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-4xl">
            Chứng Chỉ Tiếng Anh
            <br /> <span className="text-5xl text-[#FF3333]">Aptis ESOL</span>
          </h1>
          <ul className="mt-8 list-inside list-disc space-y-2 text-gray-700">
            <li className="leading-relaxed">
              Được phát triển bởi{" "}
              <span className="font-semibold">Hội đồng Anh</span>, đánh giá 4 kỹ
              năng ngôn ngữ.
            </li>
            <li className="leading-relaxed">
              Kiểm tra{" "}
              <span className="font-semibold">Nghe, Nói, Đọc, Viết</span> cùng
              phần Ngữ pháp & Từ vựng.
            </li>
            <li className="leading-relaxed">
              Kết quả chuẩn hóa theo{" "}
              <span className="font-semibold">CEFR (A1–C)</span>, rõ ràng và
              minh bạch.
            </li>
            <li className="leading-relaxed">
              Ứng dụng linh hoạt cho{" "}
              <span className="font-semibold">
                học tập, công việc và du học
              </span>
              .
            </li>
          </ul>
        </div>
        <div className="my-20 flex gap-4">
          <ChatBubbleCard
            title="Hình Thức"
            subtitle="IELTS có 4 kỹ năng"
            align="bottom-left"
            className="flex-1"
            color="#993333"
            children={
              <ul className="list-disc pl-5">
                <li>Kỹ Năng Nghe (Listening)</li>
                <li>Kỹ Năng Đọc (Reading)</li>
                <li>Kỹ Năng Viết (Writing)</li>
                <li>Kỹ Năng Nói (Speaking)</li>
              </ul>
            }
          />
          <ChatBubbleCard
            title="Hình Thức"
            subtitle="IELTS có 4 kỹ năng: Nghe, Nói, Đọc, Viết."
            className="flex-1"
            align="bottom-middle"
            color="#993333"
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
            color="#993333"
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
      </div>
      <div>
        <div className="relative before:absolute before:top-0 before:left-20 before:z-4 before:border-t-[100px] before:border-r-[48px] before:border-b-[48px] before:border-t-amber-500 before:border-r-amber-500 before:border-b-transparent before:content-[''] after:absolute after:top-0 after:left-20 after:z-4 after:border-t-[100px] after:border-b-[48px] after:border-l-[48px] after:border-t-amber-500 after:border-b-transparent after:border-l-amber-500 after:content-['']"></div>
        <div className="relative before:absolute before:top-0 before:right-20 before:z-4 before:border-t-[100px] before:border-r-[48px] before:border-b-[48px] before:border-t-amber-500 before:border-r-amber-500 before:border-b-transparent before:content-[''] after:absolute after:top-0 after:right-20 after:z-4 after:border-t-[100px] after:border-b-[48px] after:border-l-[48px] after:border-t-amber-500 after:border-b-transparent after:border-l-amber-500 after:content-['']"></div>
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
              items={aptisEsolListeningList}
              basePath="/aptis-esol"
              subFolder="listening"
              className="grid-cols-1 sm:grid-cols-3"
              subtitle="listening"
              modifier={["A1-A2", "B1-B2", "C1-C2"]}
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
              Làm quen với các dạng bài tập và kỹ năng cần thiết cho phần thi
              Nói.
            </p>
            {/* Danh sách card */}
            <CardList
              items={aptisEsolSpeakingList}
              basePath="/aptis-esol"
              subFolder="speaking"
              className="grid-cols-1 sm:grid-cols-3"
              subtitle="speaking"
              modifier={["A1-A2", "B1-B2", "C1-C2"]}
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
              Làm quen với các dạng bài tập và kỹ năng cần thiết cho phần thi
              Đọc.
            </p>
            {/* Danh sách card */}
            <CardList
              items={aptisEsolReadingList}
              basePath="/aptis-esol"
              subFolder="reading"
              className="grid-cols-1 sm:grid-cols-3"
              subtitle="reading"
              modifier={["A1-A2", "B1-B2", "C1-C2"]}
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
              items={aptisEsolWritingList}
              basePath="/aptis-esol"
              subFolder="writing"
              className="grid-cols-1 sm:grid-cols-3"
              subtitle="writing"
              modifier={["A1-A2", "B1-B2", "C1-C2"]}
            />
          </section>
          <section className="container mx-auto my-12 flex flex-col gap-8">
            {" "}
            <div>
              <h2 className="text-md mb-4 font-bold sm:text-xl">
                Tuyên bố miễn trừ trách nhiệm
              </h2>
              <p className="text-gray-200">
                Ứng dụng này được thiết kế để hỗ trợ bạn chuẩn bị cho kỳ thi
                IELTS thông qua các tài liệu luyện tập, mẹo và chiến lược. Tuy
                nhiên, ứng dụng không được liên kết hoặc xác nhận bởi các tổ
                chức IELTS chính thức, bao gồm <strong>British Council</strong>,{" "}
                <strong>IDP: IELTS Australia</strong> hoặc{" "}
                <strong>Cambridge Assessment English</strong>. Để có sự chuẩn bị
                chính xác và đáng tin cậy nhất, chúng tôi khuyến nghị bạn sử
                dụng các tài liệu và bài thi thử chính thức từ các tổ chức này.
              </p>
            </div>
            <div>
              <h2 className="text-md mb-4 font-bold sm:text-xl">
                Khuyến khích luyện thi IELTS
              </h2>
              <p className="text-gray-200">
                Để đạt kết quả tốt nhất trong kỳ thi IELTS, chúng tôi khuyên bạn
                nên mua và luyện tập với bộ sách{" "}
                <strong>Cambridge IELTS</strong> (từ quyển 1 đến 20), do{" "}
                <strong>Cambridge Assessment English</strong> biên soạn. Bộ sách
                này cung cấp các bài thi thử sát với định dạng và độ khó của kỳ
                thi IELTS thực tế, giúp bạn nâng cao kỹ năng và tự tin để đạt
                band điểm mong muốn. Hãy truy cập trang web chính thức của{" "}
                <a
                  href="https://www.ielts.org"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  IELTS
                </a>{" "}
                hoặc các nền tảng được ủy quyền tại Việt Nam để tìm thêm tài
                liệu và thông tin về kỳ thi.
              </p>
            </div>
          </section>
        </div>
      </div>
      <CardWithInfo
        title="Card Title"
        description="Card Description"
        link="https://example.com"
        className="margin-x-default"
      />
    </>
  );
}
