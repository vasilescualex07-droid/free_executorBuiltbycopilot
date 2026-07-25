import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Play, Copy, Download } from 'react-icons/fa';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  isDarkMode: boolean;
}

const Editor: React.FC<EditorProps> = ({ code, onChange, onExecute, isDarkMode }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', 'script.lua');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 flex flex-col gap-2 min-w-0 fade-in">
      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={onExecute}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition font-semibold text-white btn-glow"
        >
          <Play size={16} /> Execute (F5)
        </button>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-semibold ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Copy size={16} /> Copy
        </button>
        <button
          onClick={handleDownload}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-semibold ${
            isDarkMode
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          <Download size={16} /> Download
        </button>
      </div>
      
      <div className={`flex-1 rounded-lg overflow-hidden border ${
        isDarkMode ? 'border-slate-700 shadow-lg' : 'border-gray-300'
      }`}>
        <MonacoEditor
          height="100%"
          defaultLanguage="lua"
          value={code}
          onChange={(value) => onChange(value || '')}
          theme={isDarkMode ? 'vs-dark' : 'vs'}
          options={{
            minimap: { enabled: true, side: 'right' },
            fontSize: 14,
            fontFamily: 'Cascadia Code, Fira Code, Monaco, monospace',
            tabSize: 2,
            wordWrap: 'on',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            formatOnPaste: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: { other: true, comments: false, strings: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
