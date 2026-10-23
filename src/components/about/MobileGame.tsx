"use client";
import { useEffect, useState } from "react";
import s from "@/styles/about.module.css";

const GAME_URL = "/projects/html5Game/2026/game/VOID_GP_Custom_Car_Sprites.html";

export default function MobileGame() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className={s.mobileGame}>
      <h2 className={s.h2}>Play: VOID GP (2026)</h2>
      <p className={s.gameNote}>A pixel space racer built for mobile — tap play and go full screen.</p>
      <button type="button" className={s.btnPrimary} onClick={() => setOpen(true)}>▶ PLAY</button>

      {open && (
        <div className={s.gameOverlay} role="dialog" aria-modal="true" aria-label="VOID GP">
          <iframe
            className={s.gameCanvas}
            src={GAME_URL}
            title="VOID GP – Pixel Space Racer"
            allow="accelerometer; gyroscope; autoplay; fullscreen"
          />
          <button type="button" className={s.gameClose} onClick={() => setOpen(false)} aria-label="Close game">✕</button>
        </div>
      )}
    </section>
  );
}
