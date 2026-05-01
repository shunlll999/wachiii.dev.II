"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "@/styles/Navbar.module.css";
import { NAV_ITEMS, ASSETS } from "@/constants";
import { triggerEasterEgg } from "@/components/ui/EasterEggProfile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`${s.navbar} ${scrolled ? s.scrolled : ""}`}>
      <div className={s.inner}>
        <div className={s.logoWrap}>
          <Link href="/">
            <Image src={ASSETS.logo} alt="wachiii" width={120} height={40} className={s.logo} unoptimized />
          </Link>
          <button className={s.eggDot} onClick={triggerEasterEgg} aria-label="Secret" />
        </div>

        <div className={s.desktopNav}>
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} className={s.navLink}>{item.label}</a>
          ))}
          <a href="#contact" className={s.hireBtn}>HIRE ME</a>
        </div>

        <button className={s.mobileToggle} onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`${s.bar} ${open ? s.open1 : ""}`} />
          <span className={`${s.bar} ${open ? s.open2 : ""}`} />
          <span className={`${s.bar} ${open ? s.open3 : ""}`} />
        </button>
      </div>

      {open && (
        <div className={s.mobileMenu}>
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} className={s.mobileLink} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
