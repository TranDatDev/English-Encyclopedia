import { useState } from "react";

/**
 * Kiểu giọng nói cho tính năng phát âm
 * - "bre-m": Giọng Anh-Anh nam
 * - "bre-f": Giọng Anh-Anh nữ
 * - "ame-m": Giọng Anh-Mỹ nam
 * - "ame-f": Giọng Anh-Mỹ nữ
 */

type VoicePreference = "bre-m" | "bre-f" | "ame-m" | "ame-f";

/**
 * Hook tùy chỉnh để quản lý tính năng phát âm
 * @returns Các trạng thái và hàm xử lý liên quan đến tính năng phát âm
 */

export const usePronounce = () => {
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [preference, setPreference] = useState<VoicePreference>("bre-m");

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(e.target.value));
  };

  const handleChangePreference = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreference(e.target.value as VoicePreference);
  };

  return {
    volume,
    rate,
    preference,
    handleChangeVolume,
    handleChangeRate,
    handleChangePreference,
  };
};
