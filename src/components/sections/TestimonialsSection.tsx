"use client";
import { useEffect, useRef } from "react";
import s from "@/styles/sections.module.css";

const testimonials = [
  { name:"Sarah K.", role:"CTO, Fintech Startup",       text:"Wachiii delivered our MVP in 6 weeks. Code quality was exceptional — clean architecture, well-tested, easy to extend.", avatar:"SK", color:"var(--neon)" },
  { name:"Mark T.",  role:"Product Manager, E-commerce", text:"Rebuilt our Flutter app beyond expectations. Performance improved dramatically and conversion doubled.",                avatar:"MT", color:"var(--cyan)" },
  { name:"Priya S.", role:"Founder, SaaS Platform",      text:"Always clear, proactive about issues, delivered on time every sprint. Communication as good as the code.",              avatar:"PS", color:"var(--acid)" },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)), { threshold: 0.1 });
    ref.current?.querySelectorAll(".sectionReveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={s.sectionAlt} ref={ref}>
      <div className={s.inner}>
        <div className={`${s.sectionLabel} sectionReveal`}>
          <span className={s.sectionLabelText}>// 04_TESTIMONIALS</span>
          <div className={s.sectionLabelLine} />
        </div>
        <h2 className={`${s.heading} sectionReveal`}>
          <span className={s.headingSnow}>CLIENT</span>
          <span className={s.headingAcid}>FEEDBACK.EXE</span>
        </h2>
        <div className={s.testimonialGrid}>
          {testimonials.map(t => (
            <div key={t.name} className={`${s.testimonialCard} sectionReveal`}>
              <div className={s.testimonialTopLine} style={{ background:`linear-gradient(90deg, ${t.color}60, transparent)` }} />
              <div className={s.testimonialQuoteMark} style={{ color:t.color }}>&ldquo;</div>
              <p className={s.testimonialText}>{t.text}</p>
              <div className={s.testimonialFooter}>
                <div className={s.testimonialAvatar} style={{ background:`${t.color}15`, borderColor:`${t.color}30` }}>
                  <span className={s.testimonialAvatarText} style={{ color:t.color }}>{t.avatar}</span>
                </div>
                <div>
                  <div className={s.testimonialName}>{t.name}</div>
                  <div className={s.testimonialRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className={`${s.testimonialNote} sectionReveal`}>* Replace with actual client testimonials</p>
      </div>
    </section>
  );
}
