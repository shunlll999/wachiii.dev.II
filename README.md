# wachiii — Personal Portfolio & Products Site

Modern personal brand site built with **Next.js 15 + TypeScript + Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## 🛠 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Homepage (assembles all sections)
│   └── globals.css       # Global styles + design tokens
└── components/
    ├── ui/
    │   └── CustomCursor.tsx
    └── sections/
        ├── Navbar.tsx
        ├── HeroSection.tsx       ← Typewriter + strong CTA
        ├── AboutSection.tsx      ← Bio + Experience timeline
        ├── PortfolioSection.tsx  ← Case studies with metrics
        ├── ProductsSection.tsx   ← Digital products for sale
        ├── TestimonialsSection.tsx
        ├── ContactSection.tsx    ← Lead gen form
        └── Footer.tsx
```

## ✏️ Customization Checklist

- [ ] **HeroSection.tsx** — Update roles array with your actual titles
- [ ] **AboutSection.tsx** — Update skills, timeline, bio text
- [ ] **PortfolioSection.tsx** — Replace with your real projects + metrics
- [ ] **ProductsSection.tsx** — Update product names, prices, descriptions
- [ ] **TestimonialsSection.tsx** — Add real client testimonials
- [ ] **ContactSection.tsx** — Connect form to email service (Resend recommended)
- [ ] **Footer.tsx** — Add real social media links
- [ ] **layout.tsx** — Update metadata (title, description, OG image)

## All below still in the plan

## 💳 Payments Integration

For selling digital products, integrate one of:
- **Gumroad** — Easiest, no code needed
- **Lemon Squeezy** — Great for subscriptions
- **Stripe** — Most flexible

## 📧 Contact Form Setup

1. Sign up at [resend.com](https://resend.com)
2. Install: `npm install resend`
3. Create `src/app/api/contact/route.ts`
4. Connect form `handleSubmit` to your API route

## 🚢 Deploy

```bash
# Deploy to Vercel (recommended)
npx vercel

# Or push to GitHub and connect to Vercel dashboard
```

## 📈 Revenue Roadmap

| Month | Target | Focus |
|-------|--------|-------|
| 1 | ฿33,000 | Launch 1st product + SEO setup |
| 2 | ฿50,000 | LinkedIn content + email list |
| 3 | ฿75,000 | Bundle products + upsell |
| 4 | ฿100,000 | Passive sales + inbound clients |
