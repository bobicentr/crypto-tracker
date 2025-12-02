import { Star } from 'lucide-react'

function CryptoTable({ coins, favorites, toggleFav}) {



    return (
      // overflow-x-auto позволяет таблице скроллиться по горизонтали на совсем мелких экранах, если что-то не влезет
      <div className="overflow-x-auto shadow-md rounded-lg"> 
        
        <table className="w-full text-left border-collapse">
          {/* ШАПКА */}
          <thead className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="p-4 hidden md:table-cell">#</th>
              <th className="p-4">Coin</th>
              <th className="p-4">Price</th>
              <th className="p-4 hidden md:table-cell">24h Change</th>
              <th className="p-4 hidden md:table-cell">Market Cap</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
  
          {/* ТЕЛО */}
          <tbody className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
            {coins.map((coin) => (
              <tr 
                key={coin.id} 
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                
                {/* 1. Ранг */}
                <td className="p-4 font-bold text-gray-500 hidden md:table-cell ">{coin.market_cap_rank}</td>
  
                {/* 2. Название (Картинка + Имя + Символ) */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span className="font-bold">{coin.name}</span>
                    <span className="text-gray-500 uppercase text-sm hidden sm:inline">
                      {coin.symbol}
                    </span>
                  </div>
                </td>
  
                {/* 3. Цена (Используй toLocaleString()) */}
                <td className="p-4 font-medium">
                  ${coin.current_price.toLocaleString()}
                </td>
  
                {/* 4. Изменение 24ч (Тут нужна логика цвета!) */}
                {/* Не забудь скрыть этот td на мобилках, как и заголовок */}
                <td className={`p-4 hidden md:table-cell ${
                    coin.price_change_percentage_24h > 0 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
  
                {/* 5. Капитализация */}
                <td className="p-4 hidden md:table-cell">
                   ${coin.market_cap.toLocaleString()}
                </td>
                <td className="p-4 flex justify-center">
                  <button onClick={() => toggleFav(coin.id)}>

                  {favorites.includes(coin.id) ? (<Star className='w-6 h-6 text-yellow-400 fill-current'/>)
                  :
                    ( <Star className='w-6 h-6 text-yellow-400' />)
                  }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    );
  }
  
  export default CryptoTable;