import pako from "pako";
import React, { useCallback, useState } from "react";

const BinaryTestComponent: React.FC = () => {
  const [result, setResult] = useState<string[]>([]);
  const [stats, setStats] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Per-line Zlib (test_1000_perline.bin)
  const decode_zlib_perline = useCallback((buffer: ArrayBuffer): string[] => {
    const view = new DataView(buffer);
    const lines: string[] = [];
    let offset = 0;

    while (offset < buffer.byteLength) {
      const compressedLen = view.getUint16(offset, true);
      offset += 2;
      const compressedBytes = new Uint8Array(buffer, offset, compressedLen);
      const decompressed = pako.inflate(compressedBytes, { to: "string" });
      lines.push(decompressed);
      offset += compressedLen;
    }
    return lines;
  }, []);

  // 2. NEW: Single Compress (test_1000_single.bin) 🏆
  const decode_zlib_single = useCallback((buffer: ArrayBuffer): string[] => {
    const view = new DataView(buffer);

    // Header: 4 bytes line count + 4 bytes compressed length
    const lineCount = view.getUint32(0, true);
    const compressedLen = view.getUint32(4, true);

    const compressedBytes = new Uint8Array(buffer, 8, compressedLen);
    const allText = pako.inflate(compressedBytes, { to: "string" });

    // Split by \n
    return allText.split("\n").slice(0, lineCount);
  }, []);

  // 3. JSON benchmark
  const decode_json = useCallback((buffer: ArrayBuffer): string[] => {
    const text = new TextDecoder().decode(buffer);
    return JSON.parse(text);
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);
      setResult([]);
      setStats("");

      const reader = new FileReader();
      reader.onload = (e) => {
        const startTime = performance.now();

        try {
          const buffer = e.target?.result as ArrayBuffer;
          let lines: string[];
          let format = "";

          // Auto-detect format by filename
          if (file.name.includes("_perline.bin")) {
            lines = decode_zlib_perline(buffer);
            format = "🧪 Binary Per-line";
          } else if (file.name.includes("_single.bin")) {
            lines = decode_zlib_single(buffer);
            format = "🚀 Binary Single";
          } else if (file.name.endsWith(".json")) {
            lines = decode_json(buffer);
            format = "📄 JSON";
          } else {
            throw new Error("Use test_*.bin or *.json file");
          }

          const endTime = performance.now();
          const duration = (endTime - startTime).toFixed(2);

          setResult(lines.slice(0, 10));
          setStats(
            `✅ ${format}: ${lines.length} lines in ${duration}ms | File: ${(file.size / 1024).toFixed(1)} KB`,
          );
        } catch (error) {
          setStats(`❌ Error: ${(error as Error).message}`);
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setStats("❌ File read error");
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
    },
    [decode_zlib_perline, decode_zlib_single, decode_json],
  );

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-6 font-mono">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          🧪 Binary vs JSON Benchmark
        </h1>
        <p className="text-lg text-slate-600">
          Test 3 formats: Per-line BIN • Single BIN • JSON
        </p>
      </div>

      {/* Instructions */}
      <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h3 className="mb-3 flex items-center font-semibold text-blue-900">
          📋 Supported Files
        </h3>
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800">
              test_*.perline.bin
            </span>
            <p className="mt-2 text-slate-700">Per-line compression</p>
          </div>
          <div className="rounded-lg border bg-green-50 bg-white p-4">
            <span className="rounded bg-green-100 px-2 py-1 font-mono font-semibold text-green-800">
              test_*.single.bin
            </span>
            <p className="mt-2 text-slate-700">Single compress 🏆 FASTEST</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <span className="rounded bg-gray-100 px-2 py-1 font-mono text-gray-800">
              test_*.json
            </span>
            <p className="mt-2 text-slate-700">Standard JSON</p>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-8">
        <label
          htmlFor="file-upload"
          className={`mx-auto block w-full max-w-md cursor-pointer rounded-xl p-4 text-center text-lg font-semibold transition-all duration-200 ${
            loading
              ? "cursor-not-allowed bg-gray-400"
              : "transform bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:-translate-y-1 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
          } text-white`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading...
            </span>
          ) : (
            "📁 Choose .bin or .json file"
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".bin,.json"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </div>

      {/* Results */}
      {stats && (
        <div
          className={`mb-8 transform rounded-xl border-l-8 p-6 shadow-md transition-all duration-300 ${
            stats.includes("✅")
              ? "border-emerald-500 bg-emerald-50 text-emerald-800"
              : "border-red-500 bg-red-50 text-red-800"
          }`}
        >
          <div className="mb-2 text-xl font-bold">{stats}</div>
        </div>
      )}

      {/* Preview */}
      {result.length > 0 && (
        <div className="space-y-6">
          <h3 className="border-b border-slate-200 pb-2 text-xl font-bold text-slate-800">
            📋 First 10 Lines Preview
          </h3>

          <div className="max-h-80 overflow-auto rounded-2xl border border-slate-200 bg-slate-900/5 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              {result.map((line, i) => (
                <div
                  key={i}
                  className="flex items-center rounded-lg bg-white/50 p-3 transition-all hover:bg-white"
                >
                  <span className="w-12 font-mono text-sm text-slate-500">
                    [Line {i + 1}]
                  </span>
                  <span className="flex-1 font-mono break-all">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Preview */}
          <details className="group">
            <summary className="cursor-pointer rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 p-4 font-semibold transition-all hover:bg-slate-200">
              👁️ Show Full Preview ({result.length} lines)
              <span className="ml-2 text-xs text-slate-500 transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <pre className="mt-4 max-h-96 overflow-auto rounded-xl border border-slate-700/50 bg-slate-900 p-6 font-mono text-sm text-emerald-400">
              {result.map((line, i) => `Line ${i + 1}: ${line}`).join("\n")}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default BinaryTestComponent;
