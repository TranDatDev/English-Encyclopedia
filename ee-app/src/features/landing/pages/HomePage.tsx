import eeLogo from "@shared/assets/EE_logo.svg";

import AutoCarousel from "@/shared/components/AutoCarousel";
import FadeInSection from "@/shared/components/FadeInSection";
import ShinyText from "@/shared/components/ShinyText";

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
  return (
    <>
      <div className="padding-x-default relative flex h-[100vh] justify-between overflow-visible py-30">
        <img
          src={eeLogo}
          alt="Logo"
          className="absolute left-1/2 h-auto w-8 -translate-x-1/2 object-contain opacity-85 dark:invert-100"
        />
        <FadeInSection className="flex-1">
          <h1 className="text-contrast-700 mt-4 text-center text-8xl font-semibold">
            <span className="text-6xl font-normal">English</span> <br />
            Encyclopedia
          </h1>
          <div className="text-blackwhite-950"></div>
          <div className="text-black-700 dark:text-white-700 mt-16 flex justify-between gap-8 px-64">
            <div className="bg-contrast-800 flex aspect-square flex-1 flex-col justify-between rounded-lg border-4 p-8">
              <p className="text-3xl font-semibold">Ngữ Pháp</p>
              <p className="text-right text-6xl font-semibold">
                <ShinyText
                  text="20+"
                  disabled={false}
                  speed={2}
                  className="text-[hsla(0,0%,20%,1)] dark:text-[hsla(0,0%,100%,0.7)]"
                />
              </p>
            </div>
            <div className="bg-contrast-800 flex aspect-square flex-1 flex-col justify-between rounded-lg border-4 p-8">
              <p className="text-3xl font-semibold">Bài Tập</p>
              <p className="text-contrast-700 text-right text-6xl font-semibold">
                <ShinyText
                  text="200+"
                  disabled={false}
                  speed={2}
                  className="text-[hsla(0,0%,20%,1)] dark:text-[hsla(0,0%,100%,0.7)]"
                />
              </p>
            </div>
            <div className="bg-contrast-800 flex aspect-square flex-1 flex-col justify-between rounded-lg border-4 p-8">
              <p className="text-3xl font-semibold">Từ Vựng</p>
              <p className="text-contrast-700 text-right text-6xl font-semibold">
                <ShinyText
                  text="2000+"
                  disabled={false}
                  speed={2}
                  className="text-[hsla(0,0%,20%,1)] dark:text-[hsla(0,0%,100%,0.7)]"
                />
              </p>
            </div>
          </div>
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
    </>
  );
};

export default HomePage;
