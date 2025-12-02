import { useState, useEffect } from "react";
// Импортируй свои компоненты
import Header from "./components/Header";
import CryptoTable from "./components/CryptoTable"; // (когда создашь)
import { fetchCoins } from "./services/api";

function App() {
  // ----------------------------------------------------
  // 1. ЛОГИКА ТЕМЫ + LOCALSTORAGE
  // ----------------------------------------------------
  
  // Инициализация: Проверяем localStorage ДО того, как React отрисует экран.
  // Если там записано 'dark', сразу ставим true.
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Эффект: Срабатывает при каждом клике на кнопку смены темы
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark'); // Вешаем класс на <html>
      localStorage.setItem('theme', 'dark');          // Сохраняем в память
    } else {
      document.documentElement.classList.remove('dark'); // Снимаем класс
      localStorage.setItem('theme', 'light');            // Сохраняем в память
    }
  }, [isDark]); // Зависимость: запускать код, когда меняется isDark

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // ----------------------------------------------------
  // 2. ЛОГИКА ДАННЫХ
  // ----------------------------------------------------
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState('')

  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites')) || [])  

  const toggleFav = (coinId) => {
    if (favorites.includes(coinId)) {
      const tempFavs = favorites.filter((coin) => coin !== coinId)
      setFavorites(tempFavs)
    } else {
      const tempFavs = [...favorites, coinId]
      setFavorites(tempFavs)
    }
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase()) 
  );

  

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCoins();
      setCoins(data);
    };
    getData();
  }, []);


  // ----------------------------------------------------
  // 3. РЕНДЕР
  // ----------------------------------------------------
  return (
    // Важно: классы фона должны быть здесь, на главном контейнере
    <div className="min-h-screen transition-colors duration-300 bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
      
      {/* Передаем пропсы в Хедер */}
      <Header isDark={isDark} toggleTheme={toggleTheme} search={search} setSearch={setSearch}/>

      <main className="container mx-auto px-4 mt-8">
        <CryptoTable coins={filteredCoins} favorites={favorites} toggleFav={toggleFav}/>
      </main>

    </div>
  );
}

export default App;