# 📈 Crypto Tracker - React & Tailwind CSS

A responsive web application for tracking real-time cryptocurrency prices, built with modern frontend technologies. Users can search for specific coins, sort the data by price or market cap, and manage a personal watchlist of their favorite assets.

## ✨ Features

- **Real-Time Data**: Fetches the top 50 cryptocurrencies from the **CoinGecko API**.
- **Dark Mode**: A sleek, user-friendly dark theme that persists across sessions using `localStorage`.
- **Live Search**: Instantly filter coins by name or symbol as you type.
- **Advanced Sorting**: Clickable table headers to sort data by market cap, price, or favorite status.
- **Personal Watchlist**: Mark any coin as a favorite. Your selections are saved in `localStorage`.
- **Loading & Empty States**: Smooth user experience with loading indicators and "not found" messages.
- **Responsive Design**: A mobile-first layout that looks great on all screen sizes, built entirely with **Tailwind CSS**.

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios
- **API**: [CoinGecko API](https://www.coingecko.com/en/api)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/crypto-tracker.git
    cd crypto-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or another port if specified) to view it in your browser.

## 🏗️ Key Learnings & Implementation Details

- **State Management**: All application state (coins, theme, search query, sorting config) is managed with React Hooks (`useState`, `useEffect`).
- **Derived State**: Filtering and sorting are performed "on the fly" during each render cycle, ensuring the UI is always in sync with the state without unnecessary side effects.
- **Immutability**: State updates for arrays (like the favorites list) are handled immutably using `filter` and spread syntax (`...`) to prevent bugs.
- **Component-Based Architecture**: The application is broken down into logical components (`Header`, `CryptoTable`) with clear data flow via props.
- **LocalStorage**: Used to persist the user's theme preference and favorite coins, providing a seamless experience between visits.

---

_This project was created as a learning exercise to master React Hooks, Tailwind CSS, and interaction with external APIs._
