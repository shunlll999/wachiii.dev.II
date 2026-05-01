"use client";
import { useState } from "react";
import Image from "next/image";
import s from "@/styles/sections.module.css";
import { HIDDEN_PROFILE } from "@/constants";

type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();

export function triggerEasterEgg() {
  listeners.forEach(fn => fn(true));
}

export default function EasterEggProfile() {
  const [open, setOpen] = useState(false);
  if (typeof window !== "undefined") listeners.add(setOpen);
  if (!open) return null;

  return (
    <>
      <div className={s.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className={s.cardWrap} role="dialog" aria-label="Hidden profile">
        <div className={s.card}>
          <div className={s.cardTopBar} />
          <div className={s.cardHeader}>
            <span className={s.cardHeaderLabel}>// CLASSIFIED_RECORD</span>
            <button className={s.closeBtn} onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          <div className={s.cardBody}>
            <div className={s.profileRow}>
              <div className={s.avatarBorder}>
                <div className={s.avatarWrap}>
                  <Image src={HIDDEN_PROFILE.avatarUrl} alt={HIDDEN_PROFILE.realName} width={80} height={80} className={s.avatarImg} unoptimized />
                </div>
                <span className={s.onlineDot} />
              </div>
              <div>
                <div className={s.codename}>CODENAME :: {HIDDEN_PROFILE.codename}</div>
                <h2 className={s.realName}>{HIDDEN_PROFILE.realName}</h2>
                <p className={s.titleText}>{HIDDEN_PROFILE.title}</p>
              </div>
            </div>
            <div className={s.infoBox}>
              {[
                { key:"[LOCATION]", val: HIDDEN_PROFILE.location },
                { key:"[PHONE]",    val: HIDDEN_PROFILE.phone },
                { key:"[EMAIL]",    val: HIDDEN_PROFILE.email, href:`mailto:${HIDDEN_PROFILE.email}` },
              ].map(row => (
                <div key={row.key} className={s.infoRow}>
                  <span className={s.infoKey}>{row.key}</span>
                  {row.href
                    ? <a href={row.href} className={s.infoLink}>{row.val}</a>
                    : <span className={s.infoVal}>{row.val}</span>
                  }
                </div>
              ))}
            </div>
            <p className={s.cardNote}>CLICK_LOGO :: TO_REVEAL</p>
          </div>
          <div className={s.cardBottomBar} />
        </div>
      </div>
    </>
  );
}
