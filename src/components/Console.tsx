import React, { useRef, useEffect } from 'react';
import { Trash2, Filter } from 'react-icons/fa';
import { useStore } from '../store';

interface ConsoleProps {
  isDarkMode: boolean;
}

const Console: React.FC<ConsoleProps> = ({ isDarkMode }) => {
  const { consoleOutput, clearConsole } = useStore();
  const consoleRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = React.useState('');
  const [autoScroll, setAutoScroll] = React.useState(true);

  useEffect(() => {
    if (autoScroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput, autoScroll]);

  const filteredOutput = consoleOutput.filter(line =>
    line.toLowerCase().includes(filter.toLowerCase())
  );

  const getLineColor = (line: string) => {
    if (line.includes('[ERROR]')) return 'text-red-400';
    if (line.includes('[SUCCESS]')) return 'text-green-400';
    if (line.includes('[INFO]')) return 'text-blue-400';
    if (line.includes('[WARNING]')) return 'text-yellow-400';
    return 'text-slate-300';
  };

  return (
    <div className={`w-full h-56 border-t glass rounded-t-xl ${
      isDarkMode ? 'border-slate-700' : 'border-gray-300'
    }`}>
      <div className="flex justify-between items-center p-3 border-b glass">
        <h2 className="font-bold text-lg">Console Output</h2>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded"
            />
            Auto-scroll
          </label>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
          }`}>
            <Filter size={14} />
            <input
              type="text"
              placeholder="Filter..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`bg-transparent outline-none text-sm w-32 ${
                isDarkMode ? 'text-slate-300 placeholder-slate-600' : 'text-gray-700 placeholder-gray-400'
              }`}
            />
          </div>
          <button
            onClick={() => clearConsole()}
            className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition text-sm font-semibold"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>
      <div
        ref={consoleRef}
        className="p-3 overflow-y-auto h-full font-mono text-sm space-y-1 bg-slate-950 bg-opacity-50"
      >
        {filteredOutput.length === 0 ? (
          <span className="text-slate-600 italic">Console ready. Connect Roblox client to see output...</span>
        ) : (
          filteredOutput.map((line, idx) => (
            <div key={idx} className={`${getLineColor(line)} fade-in`}>
              <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Console;
