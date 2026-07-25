import React from 'react';
import { Wifi, WifiOff } from 'react-icons/fa';

interface Client {
  id: string;
  connected: boolean;
  lastPing: number;
}

interface ClientManagerProps {
  clients: Client[];
  isDarkMode: boolean;
}

const ClientManager: React.FC<ClientManagerProps> = ({ clients, isDarkMode }) => {
  const connectedCount = clients.filter(c => c.connected).length;

  return (
    <div className={`rounded-lg border flex flex-col gap-3 p-4 glass ${
      isDarkMode ? 'border-slate-700' : 'border-gray-300'
    }`}>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full pulse-dot ${
          connectedCount > 0 ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <h2 className="font-bold text-lg">Clients</h2>
        <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${
          isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
        }`}>
          {connectedCount}/{clients.length}
        </span>
      </div>

      <div className="space-y-2">
        {clients.length === 0 ? (
          <div className={`text-center py-6 ${
            isDarkMode ? 'text-slate-500' : 'text-gray-500'
          }`}>
            <WifiOff size={24} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm italic">Waiting for Roblox connection...</p>
            <p className="text-xs mt-2">Inject the loader script into your executor</p>
          </div>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className={`p-3 rounded-lg border transition fade-in ${
                client.connected
                  ? isDarkMode
                    ? 'bg-slate-800 border-green-700 bg-green-950 bg-opacity-20'
                    : 'bg-green-50 border-green-300'
                  : isDarkMode
                  ? 'bg-slate-800 border-slate-700 opacity-50'
                  : 'bg-gray-100 border-gray-300 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {client.connected ? (
                    <Wifi size={14} className="text-green-500" />
                  ) : (
                    <WifiOff size={14} className="text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">Client {client.id.slice(0, 8)}</p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-slate-500' : 'text-gray-600'
                    }`}>
                      {client.connected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-semibold ${
                  client.connected
                    ? 'bg-green-600 text-white'
                    : isDarkMode
                    ? 'bg-slate-700'
                    : 'bg-gray-300'
                }`}>
                  {client.connected ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={`p-3 rounded-lg text-xs ${
        isDarkMode
          ? 'bg-slate-800 text-slate-400 border border-slate-700'
          : 'bg-gray-100 text-gray-600 border border-gray-300'
      }`}>
        <p className="font-semibold mb-1">🔗 Connection Instructions:</p>
        <p>Run this in your Roblox executor to connect:</p>
        <code className={`block mt-1 p-1 rounded ${
          isDarkMode ? 'bg-slate-900' : 'bg-gray-200'
        }`}>
          loadstring(game:HttpGet("http://localhost:16384/connector.luau"))()
        </code>
      </div>
    </div>
  );
};

export default ClientManager;
