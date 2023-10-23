import { create } from 'zustand';

interface IState {
  state: IUser | null;
  setState: (newState: IUser | null) => void
}

interface ISignAlert {
  state: boolean;
  setState: (newState: boolean) => void
}

export const userState = create<IState>((set) => ({
  state: null,
  setState: (newState) => set({ state: newState })
}));

export const signAlertState = create<ISignAlert>((set) => ({
  state: false,
  setState: (newState) => set({ state: newState })
}));
