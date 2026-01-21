import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

interface ExerciseSimpleSpeakProps {
  text: string;
  volume?: number;
  rate?: number;
  preference?: "bre-m" | "bre-f" | "ame-m" | "ame-f";
}

export const ExerciseSimpleSpeak: React.FC<ExerciseSimpleSpeakProps> = ({
  text,
  volume,
  rate,
  preference,
}) => {
  const synth = window.speechSynthesis;
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [ready, setReady] = useState(false);

  // Load danh sách voice
  useEffect(() => {
    const loadVoices = () => {
      const all = synth.getVoices();

      if (!all.length) return setTimeout(loadVoices, 200);

      let target: SpeechSynthesisVoice | undefined;

      switch (preference) {
        case "bre-f":
          target =
            all.find((v) => v.name === "Google UK English Female") ||
            all.find(
              (v) =>
                v.lang === "en-GB" && v.name.toLowerCase().includes("female"),
            );
          break;

        case "bre-m":
          target =
            all.find((v) => v.name === "Google UK English Male") ||
            all.find(
              (v) =>
                v.lang === "en-GB" && v.name.toLowerCase().includes("male"),
            );
          break;

        case "ame-f":
          target =
            all.find(
              (v) => v.name === "Microsoft Zira - English (United States)",
            ) ||
            all.find(
              (v) =>
                v.lang === "en-US" && v.name.toLowerCase().includes("zira"),
            );
          break;

        case "ame-m":
          target =
            all.find(
              (v) => v.name === "Microsoft Mark - English (United States)",
            ) ||
            all.find(
              (v) =>
                v.lang === "en-US" && v.name.toLowerCase().includes("mark"),
            );
          break;

        default:
          target =
            all.find((v) => v.name.includes("Google UK English")) ||
            all.find((v) => v.lang.startsWith("en")) ||
            all[0];
      }

      // fallback cuối cùng nếu không tìm thấy
      if (!target) target = all[0];

      setVoice(target);
      setReady(true);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, [preference]);

  const handleSpeak = () => {
    if (!ready || !voice || !text.trim()) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.rate = rate || 1;
    utter.pitch = 1;
    utter.volume = volume || 1;
    synth.speak(utter);
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={!ready}
      className="cursor-pointer rounded-full p-2 transition disabled:opacity-50"
      title="Phát âm"
    >
      <Icon icon="mdi:volume-high" className="h-5 w-5 text-blue-500" />
    </button>
  );
};

export default ExerciseSimpleSpeak;
