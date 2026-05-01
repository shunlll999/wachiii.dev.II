import Image from "next/image";
import s from "@/styles/sections.module.css";
import { SOCIAL_LINKS, ASSETS } from "@/constants";
import { triggerEasterEgg } from "@/components/ui/EasterEggProfile";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <button className={s.footerLogoBtn} onClick={triggerEasterEgg} aria-label="Secret">
          <Image src={ASSETS.logo} alt="wachiii" width={100} height={32} className={s.footerLogo} unoptimized />
        </button>
        <div className={s.footerLinks}>
          {SOCIAL_LINKS.map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={s.footerLink}>{link.label}</a>
          ))}
        </div>
        <div className={s.footerRight}>
          <p className={s.footerCopyright}>© {new Date().getFullYear()} WACHARA_NILSONTI</p>
        </div>
      </div>
    </footer>
  );
}
