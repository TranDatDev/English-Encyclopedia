import { Icon } from "@iconify/react";

import {
  aptisEsolListeningList,
  aptisEsolReadingList,
  aptisEsolSpeakingList,
  aptisEsolWritingList,
} from "@/features/aptis-esol/routes/route";
import { activeTenseList } from "@/features/grammar/routes/list";
import { posList } from "@/features/pos/routes/route";
import AutoCarousel from "@/shared/components/AutoCarousel";
import CardList from "@/shared/components/card/components/CardList";
import ChatBubbleCard from "@/shared/components/ChatBubbleCard";
import FadeInSection from "@/shared/components/FadeInSection";

const HomePage = () => {
  const modules = import.meta.glob(
    "@/shared/assets/landing/*.{png,jpg,jpeg,webp}",
    {
      eager: true,
    },
  );

  // modules: Record<string, { default: string }>
  const imgs: string[] = Object.values(modules).map(
    (m) => (m as { default: string }).default,
  );
  console.log("imgs", imgs);
  return (
    <>
      <div className="padding-x-default relative aspect-[21/9] min-h-[50vh] overflow-hidden bg-gradient-to-b from-[#68BBE3] to-[#68BBE3] py-30">
        <div className="pointer-events-none absolute top-20 right-0 h-[300px] w-[300px] bg-[radial-gradient(circle,_rgba(255,165,0,0.7)_0%,_transparent_70%)]"></div>
        <FadeInSection>
          <div className="absolute top-50 right-20">
            <div className="flex items-center">
              <Icon icon="mingcute:wave-line" width={35} />
              <Icon icon="mdi:bird" width={50} />
            </div>
            <div className="flex">
              <Icon icon="mynaui:cloud-solid" color="white" width={200} />
              <Icon icon="mynaui:cloud-solid" color="white" width={100} />
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <h1 className="mt-4 text-5xl font-bold">English Encyclopedia</h1>
          <h1 className="mt-4 text-3xl font-bold">
            Ôn luyện kiến thức tiếng anh
          </h1>
        </FadeInSection>
      </div>
      <div className="padding-x-default flex min-h-screen items-center justify-center bg-gray-50">
        <AutoCarousel
          images={imgs}
          interval={2500}
          size="w-full aspect-[21/9]"
          rounded="rounded-3xl"
        />
      </div>
      <div className="padding-x-default flex">
        <div className="flex flex-1 flex-col items-end justify-end">
          <ChatBubbleCard
            title="Xin chào"
            subtitle="Đây là tin nhắn mẫu"
            align="right-bottom"
            children={
              <>
                <span>
                  Đây là nội dung tin nhắn Đây là nội dung tin nhắn Đây là nội
                  dung tin nhắnĐây là nội dung tin nhắnĐây là nội dung tin
                  nhắnĐây là nội dung tin nhắn
                </span>
              </>
            }
          />
          <ChatBubbleCard
            title="Xin chào"
            subtitle="Đây là tin nhắn mẫu"
            align="right-top"
            children={
              <>
                <span>
                  Đây là nội dung tin nhắn Đây là nội dung tin nhắn Đây là nội
                  dung tin nhắnĐây là nội dung tin nhắnĐây là nội dung tin
                  nhắnĐây là nội dung tin nhắn
                </span>
              </>
            }
          />
        </div>
        <div className="flex flex-1 flex-col">
          <ChatBubbleCard
            title="Xin chào"
            subtitle="Đây là tin nhắn mẫu"
            align="left-bottom"
          />
          <ChatBubbleCard
            title="Xin chào"
            subtitle="Đây là tin nhắn mẫu"
            align="left-top"
          />
        </div>
      </div>
      <FadeInSection>
        <section className="padding-x-default">
          <h2 className="text-center text-3xl font-medium">
            Bách Khoa Toàn Thư
          </h2>
          <h2 className="text-center text-4xl font-semibold">Anh Ngữ</h2>
        </section>
      </FadeInSection>
      <section className="padding-x-default">
        <h2 className="mt-8 mb-4 text-3xl font-medium">Từ Loại</h2>
        <CardList
          items={posList}
          basePath="/pos"
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        />
      </section>
      <section className="padding-x-default">
        <h2 className="mt-8 mb-4 text-3xl font-medium">Các Thì (Chủ Động)</h2>
        <CardList
          items={activeTenseList}
          basePath="/grammar"
          className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          subtitle="Thể Chủ Động"
        />
      </section>
      <FadeInSection>
        <section className="padding-x-default">
          <h2 className="mt-8 mb-4 text-3xl font-medium">Aptis Esol</h2>
          <CardList
            items={aptisEsolListeningList}
            basePath="/aptis-esol"
            subFolder="listening"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
          <CardList
            items={aptisEsolSpeakingList}
            basePath="/aptis-esol"
            subFolder="speaking"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
          <CardList
            items={aptisEsolReadingList}
            basePath="/aptis-esol"
            subFolder="reading"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
          <CardList
            items={aptisEsolWritingList}
            basePath="/aptis-esol"
            subFolder="writing"
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        </section>
      </FadeInSection>
      <FadeInSection>
        <section className="padding-x-default">
          <h2 className="mt-8 mb-4 text-3xl font-medium">Kết Quả Đánh Giá</h2>
        </section>
      </FadeInSection>
    </>
  );
};

export default HomePage;
