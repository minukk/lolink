import { IChat } from '../types/chat';
import { create } from 'zustand';

interface IState {
  state: IChat ;
  setState: (newState: any) => void
}

interface IChatModalState {
  isChatModal: boolean;
  setIsChatModal: (newState: boolean) => void;
}

export const chatState = create<IState>((set) => ({
  state: {
    chat: '',
    fromUserId: '',
    toUserId: '',
    time: new Date()
  },
  setState: (newState) => set({ state: newState })
}));

export const isChat = create<IChatModalState>((set) => ({
  isChatModal: false,
  setIsChatModal: (newState) => set({ isChatModal: newState })
}));