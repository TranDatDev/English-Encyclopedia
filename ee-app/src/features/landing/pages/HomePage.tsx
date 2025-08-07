import Card from "@/shared/components/Card";
import { Icon } from "@iconify/react";
import FadeInSection from "@/shared/components/FadeInSection";
import { posList } from "@/features/pos/routes/route";
import { activeTenseList } from "@/features/grammar/pages/GrammarPage";
import CardList from "@/shared/components/CardList";
const HomePage = () => {
  return (
    <>
      <div className="relative padding-default min-h-[50vh] bg-gradient-to-b from-[#68BBE3] to-[#faf8f6] overflow-hidden">
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(255,165,0,0.7)_0%,_transparent_70%)] pointer-events-none"></div>
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
      <FadeInSection>
        <section className=" padding-default">
          <h2 className="text-3xl font-medium text-center">
            Bách Khoa Toàn Thư
          </h2>
          <h2 className="text-4xl font-semibold text-center">Anh Ngữ</h2>
          <div className="flex gap-4 mt-8">
            {/* Bên trái: THPTQG */}
            <Card className="flex-1 bg-gradient-to-b from-[#68BBE3] to-[#faf8f6] flex flex-col justify-center p-6">
              <h1 className="text-3xl font-extrabold text-[#004b8e]">THPTQG</h1>
              <p className="text-lg text-[#004b8e] font-medium mt-2">
                Kỳ thi quan trọng định hướng tương lai
              </p>
            </Card>

            {/* Bên phải: IELTS + TOEIC */}
            <div className="flex-1 flex flex-col gap-4">
              {/* IELTS */}
              <Card className="relative flex-1 bg-gradient-to-b from-[#c7002b] to-[#faf8f6] overflow-hidden flex items-end justify-end px-4 py-6">
                <span className="absolute text-[5rem] font-extrabold text-[#faf8f6] opacity-20 top-3 left-3 pointer-events-none select-none">
                  IELTS
                </span>
                <h1 className="text-2xl font-bold z-10">IELTS</h1>
              </Card>

              {/* TOEIC */}
              <Card className="relative flex-1 bg-gradient-to-b from-[#004b8e] to-[#faf8f6] overflow-hidden flex items-end justify-end px-4 py-6">
                <span className="absolute text-[5rem] font-extrabold text-white opacity-10 top-3 left-3 pointer-events-none select-none">
                  TOEIC
                </span>
                <h1 className="text-2xl font-bold z-10">TOEIC</h1>
              </Card>
            </div>
          </div>
        </section>
      </FadeInSection>
      <section className="padding-default">
        <h2 className="text-3xl font-medium mb-4 mt-8">Từ Loại</h2>
        <CardList
          items={posList}
          basePath="/pos"
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        />
      </section>
      <section className="padding-default">
        <h2 className="text-3xl font-medium mb-4 mt-8">Các Thì (Chủ Động)</h2>
        <CardList
          items={activeTenseList}
          basePath="/grammar"
          className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          subtitle="Thể Chủ Động"
        />
      </section>
    </>
  );
};

export default HomePage;
