import { useState, useEffect } from "react";

import Header from "./components/Header";
import CryptoTable from "./components/CryptoTable"; 
import { fetchCoins } from "./services/api";

function App() {


  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark'); 
      localStorage.setItem('theme', 'dark');          
    } else {
      document.documentElement.classList.remove('dark'); 
      localStorage.setItem('theme', 'light');            
    }
  }, [isDark]); 

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

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
      setIsLoading(true); 
      try {
        const data = await fetchCoins();
        setCoins(data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    getData();
  }, []);

  const [sortConfig, setSortConfig] = useState({ 
    key: 'market_cap', 
    direction: 'desc' 
  });

  const handleSort = (clickedKey) => {
    const { key: currentKey, direction: currentDirection } = sortConfig;
  
    if (currentKey === clickedKey) {
      setSortConfig({
        key: clickedKey,
        direction: currentDirection === 'asc' ? 'desc' : 'asc',
      });
    } 
    else {
      setSortConfig({
        key: clickedKey,
        direction: 'desc',
      });
    }
  };

  const enrichedCoins = filteredCoins.map(coin => {
    return {
      ...coin,
      isFavorite: favorites.includes(coin.id)
    };
  });

  const sortedCoins = [...enrichedCoins].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (key === 'isFavorite') {
      return direction === 'asc'
        ? Number(a.isFavorite) - Number(b.isFavorite)
        : Number(b.isFavorite) - Number(a.isFavorite);
    } 
    
    else {
      const aValue = a[key];
      const bValue = b[key];
      
      return direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
  });


  return (

    <div className="min-h-screen transition-colors duration-300 bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
    <Header isDark={isDark} toggleTheme={toggleTheme} search={search} setSearch={setSearch} />

    <main className="container mx-auto p-4">
      {/* --- ВОТ УСЛОВИЕ --- */}
      {isLoading ? (
        // Если идет загрузка, показываем это:
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500 animate-pulse">
            Loading data... 🚀
          </p>
        </div>
      ) : (
        // Если загрузка окончена, показываем это:
        <>
          <div className="mb-4">
            {/* Тут твои кнопки фильтра или другие элементы управления */}
          </div>
          <CryptoTable 
            coins={sortedCoins} 
            favorites={favorites}
            toggleFav={toggleFav}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
        </>
      )}
    </main>
  </div>
  );
}

export default App;