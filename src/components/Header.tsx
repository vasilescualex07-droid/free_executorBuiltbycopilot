import React from 'react';
import { Moon, Sun, Github } from 'react-icons/fa';

interface HeaderProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleDarkMode, isDarkMode }) => {
  return (
    <div className={`flex justify-between items-center px-6 py-4 border-b ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-700 shadow-lg' 
        : 'bg-white border-gray-200 shadow-md'
    }`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">RX</span>
        </div>
        <div>
          <h1 className="text-2xl font-black gradient-text">Roblox Executor</h1>
          <p className={`text-xs ${ isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>v2.0 • WebSocket Bridge Active</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/vasilescualex07-droid/free_executorBuiltbycopilot"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg transition hover:bg-opacity-80 ${
            isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Github size={20} />
        </a>
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-lg transition btn-glow ${
            isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Header;
