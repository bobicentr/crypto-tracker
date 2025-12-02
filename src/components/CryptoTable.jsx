import { Star, ArrowUp, ArrowDown } from 'lucide-react'

function CryptoTable({ coins, favorites, toggleFav, handleSort, sortConfig}) {



    return (
      <div className="overflow-x-auto shadow-md rounded-lg"> 
        
        <table className="w-full text-left border-collapse">
              


          <thead className="bg-gray-100 dark:bg-slate-800 text-sm text-gray-600 dark:text-gray-400 uppercase">
            <tr>
              <th className="p-4 hidden md:table-cell">#</th>
              <th className="p-4">Coin</th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => handleSort('current_price')}
              >
                <div className="flex items-center gap-2">
                  <span>Price</span>
                  {sortConfig.key === 'current_price' && (
                    sortConfig.direction === 'asc' 
                      ? <ArrowUp className="w-4 h-4" /> 
                      : <ArrowDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th className="p-4 hidden md:table-cell">24h Change</th>
              <th 
                className="p-4 hidden md:table-cell cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => handleSort('market_cap')}
              >
                <div className="flex items-center gap-2">
                  <span>Market Cap</span>
                  {sortConfig.key === 'market_cap' && (
                    sortConfig.direction === 'asc' 
                      ? <ArrowUp className="w-4 h-4" /> 
                      : <ArrowDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => handleSort('isFavorite')}
              >
                <div className="flex items-center gap-2">
                  <span>Action</span>
                  {sortConfig.key === 'isFavorite' && (
                    sortConfig.direction === 'asc' 
                      ? <ArrowUp className="w-4 h-4" /> 
                      : <ArrowDown className="w-4 h-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
            {coins.map((coin) => (
              <tr 
                key={coin.id} 
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >

                <td className="p-4 font-bold text-gray-500 hidden md:table-cell ">{coin.market_cap_rank}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span className="font-bold">{coin.name}</span>
                    <span className="text-gray-500 uppercase text-sm hidden sm:inline">
                      {coin.symbol}
                    </span>
                  </div>
                </td>
  
                <td className="p-4 font-medium">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className={`p-4 hidden md:table-cell ${
                    coin.price_change_percentage_24h > 0 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
  
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