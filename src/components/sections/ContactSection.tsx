"use client";
import { useEffect, useRef, useState } from "react";
import s from "@/styles/sections.module.css";
import { validateContactForm } from "@/utils";
import type { ContactFormState } from "@/types";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<ContactFormState>({ name:"", email:"", budget:"", message:"", submitted:false, error:null });
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)), { threshold: 0.1 });
    ref.current?.querySelectorAll(".sectionReveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateContactForm(form);
    if (err) { setForm(f => ({ ...f, error: err })); return; }
    setForm(f => ({ ...f, submitted: true, error: null }));
  };

  return (
    <section className={s.section} ref={ref} id="contact">
      <div className={s.inner}>
        <div className={`${s.sectionLabel} sectionReveal`}>
          <span className={s.sectionLabelText}>// 05_CONTACT</span>
          <div className={s.sectionLabelLine} />
        </div>
        <div className={s.contactGrid}>
          <div className="sectionReveal">
            <h2 className={s.heading}>
              <span className={s.headingSnow}>INITIATE</span>
              <span className={s.headingNeon}>CONNECTION.</span>
            </h2>
            <p className={s.contactDesc}>Mobile app, web platform, or just want to pick my brain — I&apos;m open to interesting missions.</p>
            <div className={s.contactInfo}>
              {[
                { key:"[EMAIL]",    val:"rafael5715@gmail.com", href:"mailto:rafael5715@gmail.com" },
                { key:"[LINKEDIN]", val:"wachara-nilsonti",     href:"https://www.linkedin.com/in/wachara-nilsonti-b6529779/" },
                { key:"[RESPONSE]", val:"< 24_HOURS",          href:null },
              ].map(row => (
                <div key={row.key} className={s.contactRow}>
                  <span className={s.contactKey}>{row.key}</span>
                  {row.href
                    ? <a href={row.href} target="_blank" rel="noopener noreferrer" className={s.contactLink}>{row.val}</a>
                    : <span className={s.contactVal} style={{ color:"var(--neon)" }}>{row.val}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="sectionReveal">
            {form.submitted ? (
              <div className={s.successBox}>
                <div className={s.successIcon}>✓</div>
                <div className={s.successTitle}>TRANSMITTED</div>
                <p className={s.successText}>Message received. Response incoming within 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={s.formWrap}>
                <div className={s.formTopLine} />
                <div className={s.formFields}>
                  {[{id:"name",label:"OPERATOR_NAME",type:"text",ph:"Jane Smith"},{id:"email",label:"COMM_CHANNEL",type:"email",ph:"jane@company.com"}].map(f => (
                    <div key={f.id}>
                      <label className={s.fieldLabel}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph} className={s.fieldInput}
                        value={form[f.id as keyof ContactFormState] as string}
                        onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))} required />
                    </div>
                  ))}
                  <div>
                    <label className={s.fieldLabel}>BUDGET_RANGE</label>
                    <select className={s.fieldSelect} value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value as any }))}>
                      <option value="">SELECT...</option>
                      <option value="under-50k">Under ฿50,000</option>
                      <option value="50k-150k">฿50,000 – ฿150,000</option>
                      <option value="150k-plus">฿150,000+</option>
                      <option value="ongoing">Ongoing retainer</option>
                    </select>
                  </div>
                  <div>
                    <label className={s.fieldLabel}>MISSION_BRIEF</label>
                    <textarea rows={4} placeholder="Describe the mission..." className={s.fieldTextarea}
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                  </div>
                  {form.error && <p style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--magenta)" }}>{form.error}</p>}
                  <button type="submit" className={s.submitBtn}>TRANSMIT_MESSAGE →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
