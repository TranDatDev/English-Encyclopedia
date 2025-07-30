// src/features/pos/pages/PosPage.tsx
import { Link } from "react-router";
import { posList } from "@/features/pos/routes/route";
import Card from "@/shared/components/Card";

export default function PosPage() {
  return (
    <div className="margin-default mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Danh sách từ loại</h1>
      <ul className="space-y-4 list-disc list-inside">
        {posList.map(({ slug, label }) => (
          <Card key={slug} className="p-4 flex items-center" variant="outlined">
            <Link to={`/pos/${slug}`} className="text-blue-600 hover:underline">
              <p className="font-semibold text-xl">{label}</p>
            </Link>
          </Card>
        ))}
      </ul>
    </div>
  );
}
