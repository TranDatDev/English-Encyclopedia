// src/features/vgsl/pages/VgslHomePage.tsx
import { Link } from "react-router";

export default function VgslHomePage() {
  // Tự động lấy tất cả file band-*.json
  const bandFiles = Object.keys(
    import.meta.glob("@/vgsl/band-*", { eager: true }),
  );

  // Sắp xếp theo số thứ tự tăng dần: band-1, band-2, ..., band-12
  const sortedBands = bandFiles
    .map((path) => path.split("/").pop()!.replace(".json", ""))
    .sort((a, b) => {
      const numA = parseInt(a.replace("band-", ""), 10);
      const numB = parseInt(b.replace("band-", ""), 10);
      return numA - numB;
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-center text-5xl font-bold">
        VGSL Vocabulary Bands
      </h1>
      <p className="mb-12 text-center text-lg text-gray-600">
        Chọn band để xem danh sách từ vựng
      </p>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {sortedBands.map((bandName) => {
          const number = bandName.replace("band-", "");
          return (
            <Link
              key={bandName}
              to={`/vgsl/${bandName}`}
              className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl md:text-3xl"
            >
              <span className="drop-shadow-md">{number}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 text-center text-gray-500">
        Tổng cộng: <strong>{sortedBands.length}</strong> band
      </div>
    </div>
  );
}
