import create from 'zustand';

interface Script {
  id: string;
  name: string;
  code: string;
  lastEdited: number;
}

interface Client {
  id: string;
  connected: boolean;
  lastPing: number;
}

interface ExecutorStore {
  scripts: Script[];
  addScript: (script: Script) => void;
  updateScript: (id: string, code: string) => void;
  removeScript: (id: string) => void;
  setScripts: (scripts: Script[]) => void;

  clients: Client[];
  activeClientId: string | null;
  addClient: (client: Client) => void;
  removeClient: (id: string) => void;
  setActiveClient: (id: string) => void;
  setClients: (clients: Client[]) => void;

  isDarkMode: boolean;
  toggleDarkMode: () => void;
  consoleOutput: string[];
  addConsoleOutput: (output: string) => void;
  clearConsole: () => void;
}

export const useStore = create<ExecutorStore>((set) => ({
  scripts: [],
  addScript: (script) => set((state) => ({ scripts: [...state.scripts, script] })),
  updateScript: (id, code) => set((state) => ({
    scripts: state.scripts.map((s) =>
      s.id === id ? { ...s, code, lastEdited: Date.now() } : s
    ),
  })),
  removeScript: (id) => set((state) => ({
    scripts: state.scripts.filter((s) => s.id !== id),
  })),
  setScripts: (scripts) => set({ scripts }),

  clients: [],
  activeClientId: null,
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  removeClient: (id) => set((state) => ({
    clients: state.clients.filter((c) => c.id !== id),
  })),
  setActiveClient: (id) => set({ activeClientId: id }),
  setClients: (clients) => set({ clients }),

  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  consoleOutput: [],
  addConsoleOutput: (output) => set((state) => ({
    consoleOutput: [...state.consoleOutput, output].slice(-1000),
  })),
  clearConsole: () => set({ consoleOutput: [] }),
}));
