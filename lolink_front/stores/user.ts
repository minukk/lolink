import { create } from 'zustand';

interface IState {
  state: IUser | null;
  setState: (newState: IUser | null) => void
}

export const userState = create<IState>((set) => ({
  state: null,
  setState: (newState) => set({ state: newState })
}));
