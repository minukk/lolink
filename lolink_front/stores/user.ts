import { create } from 'zustand';

interface IState {
  state: any;
  setState: (newState: any) => void
}

export const userState = create<IState>((set) => ({
  state: null,
  setState: (newState) => set({ state: newState })
}));
