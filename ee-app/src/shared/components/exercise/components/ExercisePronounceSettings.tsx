import React from "react";

interface ExercisePronounceSettingsProps {
  volume: number;
  rate: number;
  preference: string;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPreferenceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ExercisePronounceSettings = ({
  volume,
  rate,
  preference,
  onVolumeChange,
  onRateChange,
  onPreferenceChange,
}: ExercisePronounceSettingsProps) => {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Cài đặt phát âm
      </h2>

      {/* Âm lượng */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Âm lượng: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.05"
          value={volume}
          onChange={onVolumeChange}
          className="w-full"
        />
      </div>

      {/* Tốc độ */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tốc độ: {rate.toFixed(2)}x
        </label>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.05"
          value={rate}
          onChange={onRateChange}
          className="w-full"
        />
      </div>

      {/* Giọng đọc */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Ưu tiên giọng:
        </label>
        <select
          value={preference}
          onChange={onPreferenceChange}
          className="w-full rounded border border-gray-300 p-2"
        >
          <option value="bre-m">Anh-Anh Nam (British Male)</option>
          <option value="bre-f">Anh-Anh Nữ (British Female)</option>
          <option value="ame-m">Anh-Mỹ Nam (American Male)</option>
          <option value="ame-f">Anh-Mỹ Nữ (American Female)</option>
        </select>
      </div>
    </section>
  );
};

export default ExercisePronounceSettings;
