import React, { useState } from 'react';
import { Save, Trash2, Plus, FileCode } from 'react-icons/fa';

interface Script {
  id: string;
  name: string;
  code: string;
  lastEdited?: number;
}

interface ScriptManagerProps {
  scripts: Script[];
  onLoadScript: (code: string) => void;
  onDeleteScript: (id: string) => void;
  onSaveScript: (name: string) => void;
  isDarkMode: boolean;
}

const ScriptManager: React.FC<ScriptManagerProps> = ({
  scripts,
  onLoadScript,
  onDeleteScript,
  onSaveScript,
  isDarkMode,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [scriptName, setScriptName] = useState('');

  const handleSave = () => {
    if (scriptName.trim()) {
      onSaveScript(scriptName);
      setScriptName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className={`rounded-lg border flex flex-col gap-3 p-4 glass h-full ${
      isDarkMode ? 'border-slate-700' : 'border-gray-300'
    }`}>
      <div className="flex items-center gap-2">
        <FileCode size={20} />
        <h2 className="font-bold text-lg">Scripts</h2>
        <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${
          isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
        }`}>
          {scripts.length}
        </span>
      </div>
      
      <button
        onClick={() => setShowSaveDialog(true)}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-lg transition w-full font-semibold text-white btn-glow"
      >
        <Plus size={16} /> Save Current
      </button>

      {showSaveDialog && (
        <div className={`p-3 rounded-lg border fade-in ${
          isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-300'
        }`}>
          <input
            type="text"
            placeholder="Script name..."
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className={`w-full px-3 py-2 rounded mb-2 text-sm outline-none transition ${
              isDarkMode
                ? 'bg-slate-700 text-white placeholder-slate-500 focus:border-blue-500'
                : 'bg-gray-100 text-black placeholder-gray-400 focus:border-blue-500 border border-gray-300'
            }`}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded transition text-sm font-semibold"
            >
              <Save size={14} className="inline mr-1" /> Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className={`flex-1 px-2 py-1 rounded transition text-sm font-semibold ${
                isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {scripts.length === 0 ? (
          <div className={`text-center py-8 ${
            isDarkMode ? 'text-slate-500' : 'text-gray-500'
          }`}>
            <p className="text-sm italic">No scripts saved</p>
          </div>
        ) : (
          scripts.map((script) => (
            <div
              key={script.id}
              className={`p-3 rounded-lg border cursor-pointer transition fade-in ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
                  : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div
                  onClick={() => onLoadScript(script.code)}
                  className="flex-1 min-w-0"
                >
                  <p className="font-semibold text-sm truncate text-blue-400">{script.name}</p>
                  <p className={`text-xs truncate ${
                    isDarkMode ? 'text-slate-500' : 'text-gray-500'
                  }`}>
                    {script.code.substring(0, 40).replace(/\n/g, ' ')}...
                  </p>
                </div>
                <button
                  onClick={() => onDeleteScript(script.id)}
                  className="p-1.5 bg-red-600 hover:bg-red-700 rounded transition flex-shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScriptManager;
