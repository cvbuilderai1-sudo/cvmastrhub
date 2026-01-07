# 🚀 SmartCV Hub

**AI-Powered CV Builder with ATS Optimization**

A modern, multilingual CV builder with AI-powered analysis, ATS scoring, and professional templates.

## ✨ Features

- 🎨 **Modern CV Builder** - Intuitive interface with live preview
- 🤖 **AI Analysis** - Powered by Groq for intelligent suggestions
- 📊 **ATS Scoring** - Real-time compatibility checking
- 🌍 **Multi-language** - English, French, Arabic support
- 📸 **Smart Photo Editor** - AI-powered cropping and enhancement
- 📄 **PDF Export** - Professional, ATS-friendly output
- 💾 **Database Ready** - Prisma + PostgreSQL integration

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Glassmorphism
- **Database:** PostgreSQL + Prisma
- **AI:** Groq SDK
- **i18n:** next-intl
- **State:** Zustand
- **Animations:** Framer Motion

## 🚀 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Setup database
npm run db:push
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Environment Variables

Create `.env.local`:

```env
# Database (Vercel Postgres)
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."

# AI
GROQ_API_KEY="..."

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome!

---

**Built with ❤️ using Next.js 15**
