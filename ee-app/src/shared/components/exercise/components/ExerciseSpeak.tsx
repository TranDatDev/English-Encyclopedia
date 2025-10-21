import React, { useEffect, useRef, useState } from "react";

interface ExerciseSpeakProps {
  text: string;
}

const Slider: React.FC<{
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}> = ({ label, min, max, step, value, onChange }) => (
  <div className="flex flex-col items-center">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-2 w-24 cursor-pointer appearance-none rounded-lg bg-gray-300"
    />
    <span className="mt-2 text-xs text-gray-500">
      {label === "Âm Lượng" ? `${(value * 100).toFixed(0)}%` : value.toFixed(1)}
    </span>
  </div>
);

const VoiceButton: React.FC<{
  label: string;
  voice: SpeechSynthesisVoice | null;
  onClick: (voice: SpeechSynthesisVoice | null) => void;
  disabled?: boolean;
  className?: string;
}> = ({ label, voice, onClick, disabled, className }) => (
  <button
    onClick={() => onClick(voice)}
    disabled={disabled || !voice}
    className={`${
      disabled ? "opacity-40" : ""
    } cursor-pointer rounded-lg px-2 py-1 text-white shadow ${className}`}
  >
    {label}
  </button>
);

export const ExerciseSpeak: React.FC<ExerciseSpeakProps> = ({ text }) => {
  const synth = window.speechSynthesis;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  // Lấy danh sách voice từ trình duyệt
  const loadVoices = () => {
    const allVoices = synth.getVoices();
    if (allVoices.length > 0) {
      setVoices(allVoices);
      setVoicesLoaded(true);
      console.table(
        allVoices.map((v) => ({
          name: v.name,
          lang: v.lang,
          local: v.localService,
        })),
      );
    } else {
      // Đợi trình duyệt load xong voices
      setTimeout(loadVoices, 200);
    }
  };

  useEffect(() => {
    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  // Tìm từng voice cụ thể
  const findVoice = (name: string, lang: string) =>
    voices.find((v) => v.name === name && v.lang === lang) ||
    voices.find((v) => v.lang === lang) ||
    null;

  const voiceUSMale = findVoice(
    "Microsoft Mark - English (United States)",
    "en-US",
  );
  const voiceUSFemale = findVoice(
    "Microsoft Zira - English (United States)",
    "en-US",
  );
  const voiceUKMale = findVoice("Google UK English Male", "en-GB");
  const voiceUKFemale = findVoice("Google UK English Female", "en-GB");

  const handleExerciseSpeak = (voice: SpeechSynthesisVoice | null) => {
    if (!text.trim() || !voice) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = volume;

    utterRef.current = utter;
    synth.speak(utter);
  };

  return (
    <div className="flex w-1/2 flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <h2 className="text-lg font-semibold">Phát âm</h2>
      <p className="text-center text-gray-700 italic">{text}</p>

      {!voicesLoaded ? (
        <p className="text-sm text-gray-500">🔄 Đang tải giọng đọc...</p>
      ) : (
        <>
          {/* Thanh chỉnh thông số */}
          <div className="flex items-center justify-center gap-4">
            {/* Pitch */}
            <Slider
              label="Cao Độ"
              min={0}
              max={2}
              step={0.1}
              value={pitch}
              onChange={setPitch}
            />

            {/* Volume */}
            <Slider
              label="Âm Lượng"
              min={0}
              max={2}
              step={0.1}
              value={volume}
              onChange={setVolume}
            />

            {/* Rate */}

            <Slider
              label="Tốc Độ"
              min={0.5}
              max={1.5}
              step={0.1}
              value={rate}
              onChange={setRate}
            />
          </div>

          {/* Nút chọn giọng đọc */}
          <div className="grid w-full grid-cols-2 gap-2">
            <VoiceButton
              label="Nam (Anh-Mỹ)"
              voice={voiceUSMale}
              onClick={handleExerciseSpeak}
              disabled={!voiceUSMale}
              className="bg-blue-500 hover:bg-blue-600"
            />

            <VoiceButton
              label="Nữ (Anh-Mỹ)"
              voice={voiceUSFemale}
              onClick={handleExerciseSpeak}
              disabled={!voiceUSFemale}
              className="bg-pink-500 hover:bg-pink-600"
            />

            <VoiceButton
              label="Nam (Anh-Anh)"
              voice={voiceUKMale}
              onClick={handleExerciseSpeak}
              disabled={!voiceUKMale}
              className="bg-green-500 hover:bg-green-600"
            />
            <VoiceButton
              label="Nữ (Anh-Anh)"
              voice={voiceUKFemale}
              onClick={handleExerciseSpeak}
              disabled={!voiceUKFemale}
              className="bg-purple-500 hover:bg-purple-600"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseSpeak;
