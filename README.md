# 💹 Crypto Price Tracker - React & Redux Toolkit

A responsive web application that simulates real-time cryptocurrency price tracking, built with **React**, **Redux Toolkit**, and **Tailwind CSS**.

---

## 🚀 Demo

[![Application Screenshot](/crypto-tracker/public/crypto-tracker-ss.jpeg)]

👉 [Watch Demo Video](<YOUR_DEMO_LINK_HERE>)

---

## ✨ Features

- 📈 Real-time Simulation: Data updates every ~1.5 seconds using `setInterval`.
- 📊 Rich Data Display: Includes rank, name, price, market cap, volume, supply, and percentage changes (1h, 24h, 7d).
- 🧠 State Management: Centralized using Redux Toolkit for clean, predictable state logic.
- 📱 Responsive Design: Table is scrollable and adapts to different screen sizes.
- 🔺 Visual Cues: Color-coded percent changes and SVG chart icons for 7-day trends.
- ⚡ Built with Vite: Fast and modern dev environment.
- 🎨 Tailwind CSS: Utility-first CSS with built-in dark mode support (basic).

---

## 🛠 Technology Stack

- Frontend: React 18+, JSX
- State Management: Redux Toolkit, React-Redux
- Styling: Tailwind CSS v3
- Build Tool: Vite
- Language: JavaScript (ES6+)

---

## 📁 Project Structure

```text
/public/
└── charts/                # Static SVG chart assets
    ├── generic-down-trend.svg
    ├── generic-flat-trend.svg
    └── generic-up-trend.svg

/src/
├── app/                   # Redux store configuration
│   └── store.js
├── components/            # Reusable UI components
│   ├── CryptoTable.jsx
│   └── CryptoTableRow.jsx
├── data/                  # Initial static data
│   └── sampleData.js
├── features/              # Redux slices (state logic)
│   └── crypto/
│       └── cryptoSlice.js
├── App.jsx                # Main application component, simulation logic
├── index.css              # Tailwind CSS directives and base styles
└── main.jsx               # Application entry point, Redux Provider setup

README.md                  # Project documentation
package.json               # Project dependencies and scripts
vite.config.js             # Vite configuration
tailwind.config.js         # Tailwind customization
postcss.config.js          # PostCSS setup
```

---

## ⚙️ Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or yarn

### 📥 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/aditiarya37/crypto-tracker
cd crypto-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open in your browser:

Visit: http://localhost:5173

---

## 📌 Notes

- This is a **frontend-only simulation** — it does not use a live API.
- To simulate real-time data, we use `setInterval()` to randomly adjust values.
- All data is local and randomized for demo purposes.
