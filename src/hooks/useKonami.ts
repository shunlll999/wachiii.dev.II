"use client";

import { useState, useEffect, useCallback } from "react";
import { isKonamiComplete } from "@/utils";

/**
 * useKonami
 * Listens for the Konami code (↑↑↓↓←→←→BA).
 * Returns `unlocked` boolean and a `reset` function.
 */
export function useKonami(): { unlocked: boolean; reset: () => void } {
  const [sequence, setSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  const reset = useCallback(() => {
    setUnlocked(false);
    setSequence([]);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const next = [...prev, e.key].slice(-10); // keep last 10 keys
        if (isKonamiComplete(next)) {
          setUnlocked(true);
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return { unlocked, reset };
}
