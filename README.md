# 🎓 EduPath - AI-Powered Student Navigator

> **Your Personal Guide to Higher Education in Indonesia.**  
> *Helping students find their path, calculate chances, and discover scholarships.*

![EduPath Banner](https://placehold.co/1200x400/007bff/ffffff?text=EduPath+Ultimate+MVP)

## 🚀 About The Project

**EduPath** is a comprehensive educational platform designed specifically for Indonesian high school students (SMA/SMK). It solves the complexity of navigating university admissions (SNBP/SNBT) by providing a centralized, data-driven hub.

**Key Problems Solved:**
*   **Confusion**: Students struggle to find scattered info about passing grades and costs.
*   **Uncertainty**: "Can I get into UI with these grades?"
*   **Inequality**: Lack of access to detailed data for students outside Java.

### ✨ Key Features (Ultimate MVP)
*   **🏫 Mega Data Ecosystem**: Detailed data for **67+ Universities** (Top 50 Indonesia + All Major Kaltim).
*   **🔮 Smart Grade Calculator**:
    *   **Auto-Save**: Never lose your progress.
    *   **Admission Probability**: Real-time AI prediction against passing grades.
    *   **SMK Support**: Dedicated logic for vocational students (PKL grades).
*   **🔍 Prodi Finder**: A "Google-like" search engine for Study Programs.
*   **💰 Transparency**: View **UKT Ranges** (Tuition) and **Career Prospects** for every major.
*   **🌟 Immersive Portal**: Modern "Glassmorphism" UI with instant access to timelines and financial aid info.

## 🛠️ Technology Stack

Built with the modern **T3 / Next.js** stack for speed and scalability:

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Data Layer**: Client-side JSON Architecture (Fast, No-DB required for MVP)
*   **Persistence**: `localStorage` (Privacy-first, Zero-Login required)

## 🏎️ Getting Started

Follow these steps to run the project locally.

### Prerequisites
*   Node.js 18+ installed

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/edupath.git
    cd edupath
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:3000` to see the app.

## 📂 Project Structure

```bash
edupath/
├── app/                  # Next.js App Router
│   ├── calculator/       # Smart Grade Calculator logic
│   ├── compare/          # University Comparison Tool
│   ├── explore/          # Prodi Finder & Search
│   └── page.tsx          # Portal Landing Page
├── components/           # React Components
│   ├── portal/           # Hero, Stats, QuickAccess (New!)
│   └── ui/               # Shadcn Reusable UI
├── data/                 # JSON Data Layer
│   ├── universities.json # massive 67+ Unis dataset
│   └── scholarships.json # Financial aid database
└── ...
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit changes.

## 📄 License

This project is open-source and available under the **MIT License**.

---
*Built with ❤️ for Indonesian Students.*
