---

# 🚀 Christin Thomas – Software Engineer Portfolio

A modern, fully responsive portfolio website built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Shadcn UI**.
It integrates with **Supabase** for dynamic content management — allowing easy updates to projects, skills, and messages through the database.

---

## 🧩 Features

- ⚡ **Fast & lightweight** (powered by Vite + React)
- 🎨 **Modern UI** using Tailwind CSS and Shadcn UI components
- 🧠 **TypeScript support** for robust, type-safe code
- 🗄️ **Supabase backend** for data storage and API management
- 📱 **Fully responsive** across all devices
- 💬 **Contact form** connected to Supabase for real-time submissions
- 🧰 **Easy content management** (update projects, skills, etc. without redeploying)

---

## 🛠️ Tech Stack

| Category           | Technologies                                                     |
| ------------------ | ---------------------------------------------------------------- |
| Frontend           | React, TypeScript, Vite                                          |
| Styling            | Tailwind CSS, Shadcn UI                                          |
| Backend / Database | Supabase                                                         |
| Deployment         | Any modern static host (e.g., Vercel, Netlify, Cloudflare Pages) |

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_REPOSITORY_URL>

# Step 2: Navigate into the project directory
cd <YOUR_PROJECT_DIRECTORY>

# Step 3: Install dependencies
npm install

# Step 4: Create a .env file in the root directory and add your Supabase keys
```

### Example `.env` file

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

```bash
# Step 5: Start the development server
npm run dev
```

Your app will be available at **[http://localhost:8080](http://localhost:8080)**

---

## 🧱 Project Structure

```
├── public/               # Static assets (favicon, images, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main pages of the portfolio
│   ├── integrations/     # Supabase client setup
│   ├── styles/           # Global and Tailwind styles
│   └── main.tsx          # App entry point
├── .env                  # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Deployment

You can deploy this project on any static hosting service.
Recommended options:

- **Vercel**
- **Netlify**
- **Cloudflare Pages**

Make sure to set the environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) in your hosting dashboard before deployment.

---

## 🧠 Environment Variables (Required)

| Variable                        | Description                         |
| ------------------------------- | ----------------------------------- |
| `VITE_SUPABASE_URL`             | Your Supabase project URL           |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon (public) API key |

---

## 📧 Contact

**Author:** Christin Thomas
**Email:** [christin38thomas@gmail.com](mailto:christin38thomas@gmail.com)
**Location:** Pathanamthitta, Kerala, India

---