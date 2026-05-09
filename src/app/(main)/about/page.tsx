import s from "@/styles/portfolio.module.css";
import Link from "next/link";

const Page = () => {
  return (
    <div className={`${s.page} gridBg`}>
       {/* Header */}
        <header className={`${s.listHeader} scanline`}>
          <div className={s.headerGlow} />
          <div className={s.cornerTL} /><div className={s.cornerTR} />
          <div className={s.inner}>
            <Link href="/" className={s.backLink}>← BACK_TO_HOME</Link>
            <div className={s.labelRow}>
              <span className={s.labelText}>// ABOUT ME</span>
              <div className={s.labelLine} />
            </div>
            <h1 className={s.listHeading}>
              <span className={s.listHeadingSnow}>ABOUT ME</span>
              <span className={s.labelText}>wachiii</span>
            </h1>
            <p className={s.listSubtitle}>
              Under construction... Please check back later for the full portfolio and client testimonials sections!
            </p>
          </div>
        </header>
    </div>
  );
};

export default Page;
