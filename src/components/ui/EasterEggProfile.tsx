"use client";
import { ChangeEvent, use, useState } from "react";
import Image from "next/image";
import s from "@/styles/sections.module.css";
import { HIDDEN_PROFILE } from "@/constants";
import { User } from "firebase/auth";
import { login } from "@/services/firebase";
import { useRouter } from "next/navigation";

type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();

export function triggerEasterEgg() {
  listeners.forEach(fn => fn(true));
}

export default function EasterEggProfile() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  if (typeof window !== "undefined") listeners.add(setOpen);

  async function handleLogin(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement & { email: HTMLInputElement; password: HTMLInputElement };
    const email = target.email.value;
    const password = target.password.value;

    const user: User = await login(email, password);
    if (user.uid) {
      setOpen(false);
      router.push("/dashboard");
    }
  }


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
            <button className={s.hiddenFeatureDot} onClick={() => setShowForm(!showForm)} />
          </div>
          <form className={s.cardForm} onSubmit={handleLogin}>
            <div className={`${s.formWrapper} ${showForm ? s.show : ''}`}>
              <span className={s.formTitle}>// wAciii LOGIN</span>
              <div className={s.inputGroup}>
                <label htmlFor="email" className={s.cardInputLabel}>// EMAIL</label>
                <input id="email" type="text" placeholder="Enter Email" className={s.cardInput} />
              </div>
              <div className={s.inputGroup}>
                <label htmlFor="password" className={s.cardInputLabel}>// PASSWORD</label>
                <input id="password" type="password" placeholder="Enter password" className={s.cardInput} />
              </div>
              <button type="submit" className={s.cardSubmit}>SUBMIT</button>
            </div>
          </form>
          <div className={s.cardBottomBar} />
        </div>
      </div>
    </>
  );
}
