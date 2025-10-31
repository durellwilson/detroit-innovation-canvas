# 🎨 Detroit Innovation Canvas

Real-time collaborative innovation platform with persistent storage.

## ✨ Features

- **Persistent Storage** - Ideas saved forever with Vercel KV (Redis)
- **Real-time Updates** - See changes instantly
- **AI Enhancement** - GPT-4 expands ideas
- **Community Voting** - Upvote the best ideas
- **6 Categories** - Tech, Community, Health, Education, Environment, Arts
- **Beautiful UI** - Framer Motion animations

## 🗄️ Backend

- **Vercel KV (Redis)** - Ultra-fast key-value storage
- **Edge Runtime** - Global low-latency
- **Optimistic Updates** - Instant UI feedback

## 🚀 Setup

1. Install dependencies: `npm install`
2. Create Vercel KV database
3. Link project: `vercel link`
4. Deploy: `vercel --prod`

## 📊 API Endpoints

- `GET /api/ideas` - Fetch all ideas
- `POST /api/ideas` - Add new idea
- `PATCH /api/ideas` - Vote on idea
- `POST /api/enhance` - AI enhance idea

---

**Ideas persist forever!** 💾
