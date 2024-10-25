import { create } from "zustand";

const authSignal = create((set) => ({
  signal: false, // initial state (unauthenticated)

  setSignal: (value) => set({ signal: value }),

  toggleSignal: () => set((state) => ({ signal: !state.signal })),
}));

export default authSignal;
