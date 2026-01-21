import { useEffect, useState } from "react";

import type { VgslBand } from "@/shared/utils/loaders/load-json-vocab";
import { getVgslBand } from "@/shared/utils/loaders/load-json-vocab";

export function useVgslBands(bandName?: string) {
  const [band, setBand] = useState<VgslBand | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bandName) {
      setBand(null);
      setError(false);
      setLoading(false);
      return;
    }

    let alive = true;
    setLoading(true);

    getVgslBand(bandName)
      .then((res) => {
        if (!alive) return;
        if (!res) {
          setBand(null);
          setError(true);
        } else {
          setBand(res);
          setError(false);
        }
      })
      .catch(() => {
        if (!alive) return;
        setBand(null);
        setError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [bandName]);

  return {
    start: band?.start,
    end: band?.end,
    words: band?.data ?? [],
    currentBand: band?.currentBand,
    totalBand: band?.totalBand,
    error,
    loading,
  };
}
