import { Link, useNavigate, useParams } from "react-router";

import { useVgslBands } from "@/shared/hooks/useVgslBands";

export default function BandPage() {
  const { bandId } = useParams<{ bandId: string }>();
  const navigate = useNavigate();
  const { start, end, words, currentBand, totalBand, error, loading } =
    useVgslBands(bandId);

  const lvaMap: Record<number, { label: string; color: string }> = {
    1: { label: "A1", color: "bg-[hsl(150,50%,50%)]" },
    2: { label: "A2", color: "bg-[hsl(120,50%,50%)]" },
    3: { label: "B1", color: "bg-[hsl(90,50%,50%)]" },
    4: { label: "B2", color: "bg-[hsl(60,50%,50%)]" },
    5: { label: "C1", color: "bg-[hsl(30,50%,50%)]" },
    6: { label: "C2", color: "bg-[hsl(0,50%,50%)]" },
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-semibold text-gray-700">
          Đang tải band {bandId}...
        </h2>
      </div>
    );
  }

  if (error || !bandId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-semibold text-red-600">
          Không tìm thấy band: <span className="font-bold">{bandId}</span>
        </h2>
        <Link to="/vgsl" className="mt-6 text-blue-600 hover:underline">
          ← Quay lại trang chủ VGSL
        </Link>
      </div>
    );
  }

  const handlePrev = () => {
    if (currentBand && currentBand > 1) {
      navigate(`/vgsl/band-${currentBand - 1}`);
    }
  };

  const handleNext = () => {
    if (currentBand && totalBand && currentBand < totalBand) {
      navigate(`/vgsl/band-${currentBand + 1}`);
    }
  };

  return (
    <div className="margin-x-default mx-auto py-6">
      <div className="my-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
          Band{" "}
          <span className="text-blue-600">{bandId.replace("band-", "")}</span>
          <br />
          <span>
            ({start} - {end})
          </span>
        </h1>
        <p className="mt-2 text-lg text-gray-500">{words.length} từ vựng</p>
      </div>
      <div className="my-4 flex justify-between">
        <div className="text-center">
          <Link
            to="/vgsl"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            ← Quay lại danh sách band
          </Link>
        </div>
        {/* Pagination band */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={!currentBand || currentBand <= 1}
            className="rounded-xl bg-gray-300 px-6 py-2 font-medium text-gray-700 disabled:opacity-50"
          >
            trước
          </button>
          <span className="text-gray-700">
            {currentBand} / {totalBand}
          </span>
          <button
            onClick={handleNext}
            disabled={!currentBand || !totalBand || currentBand >= totalBand}
            className="rounded-xl bg-gray-300 px-6 py-2 font-medium text-gray-700 disabled:opacity-50"
          >
            sau
          </button>
        </div>
      </div>

      <div className="mdp:grid-cols-4 lgp:grid-cols-5 grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {words.map((word, idx) => (
          <div
            key={word.w ?? idx}
            className="border-white-200 dark:border-black-200 bg-contrast-1000 relative rounded-2xl border p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {word.lva && (
              <div className="absolute top-16 -right-4">
                <div
                  className={`relative inline-block ${
                    lvaMap[word.lva]?.color ?? "bg-gray-100"
                  } px-5 py-1.5 text-sm font-bold text-white shadow-lg`}
                >
                  {lvaMap[word.lva]?.label ?? word.lva}
                  <span
                    className={`absolute right-0 bottom-0 h-4 w-4 translate-y-full ${
                      lvaMap[word.lva]?.color ?? "bg-gray-100"
                    } brightness-70 [clip-path:polygon(0_0,0_100%,100%_0)]`}
                  />
                </div>
              </div>
            )}

            <Link
              to={`/dictionary/${encodeURIComponent(word.w ?? "")}`}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-black-900 dark:text-white-900 text-2xl font-semibold">
                  {word.w ?? Object.keys(word)[0]}
                </h3>
                <span className="text-black-400 dark:text-white-400 text-sm font-medium">
                  {word.rk ?? idx + 1}
                </span>
              </div>

              {word.ipa && word.ipa.length > 0 && (
                <div className="text-black-500 dark:text-white-500 font-medium">
                  {word.ipa.map((p) => `/${p}/`).join(" ")}
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-sm">
                {word.pf && (
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-800">
                    {word.pf}
                  </span>
                )}
                {word.sf && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800">
                    {word.sf}
                  </span>
                )}
                {word.w && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                    {word.w?.length} từ
                  </span>
                )}
              </div>

              {word.df && (
                <p className="text-black-600 dark:text-white-600 mt-2 text-base leading-relaxed">
                  {word.df}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
