import { create } from 'zustand'

interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

interface Wallet {
  address: string | null;
  balance: number;
  isConnected: boolean;
  network: string;
}

interface AppState {
  user: User | null;
  wallet: Wallet;
  connectWallet: () => void;
  disconnectWallet: () => void;
  login: (userData: User) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  wallet: {
    address: null,
    balance: 0,
    isConnected: false,
    network: 'Ethereum',
  },
  
  connectWallet: () => {
    // Mock wallet connection
    set({
      wallet: {
        address: '0x71C...976F',
        balance: 1.45,
        isConnected: true,
        network: 'Ethereum Mainnet',
      }
    })
  },
  
  disconnectWallet: () => {
    set({
      wallet: {
        address: null,
        balance: 0,
        isConnected: false,
        network: 'Ethereum',
      }
    })
  },
  
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}))
