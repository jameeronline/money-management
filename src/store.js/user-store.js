import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: "Jamal Mohamed Ameer",
  setUserName: (name) => set({ user: name }),
  deleteUserName: () => set({ user: "" }),
}));
