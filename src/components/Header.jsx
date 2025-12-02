import { Sun, Moon } from 'lucide-react';

// 1. Принимаем пропсы в фигурных скобках
function Header({ isDark, toggleTheme, search, setSearch}) {
    return ( // 2. Скобка обязательно на этой же строке!
        <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Crypto Tracker</h1>
            
            <input type="text"  className='p-2 border-2 w-full md:max-w-md border-gray-400 rounded-full bg-gray-100 dark:bg-slate-700' name="" id="" placeholder='Search...'
            value={search} onChange={(e) => setSearch(e.target.value)}
            />

            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
                {isDark ? (
                    <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                    <Moon className="w-6 h-6 text-slate-700" />
                )}
            </button>
        </header>
    );
}

export default Header;