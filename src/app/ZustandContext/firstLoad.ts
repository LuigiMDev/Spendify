import { create } from "zustand";

type FristLoadContext = {
  firstLoad: boolean;
  setFirstLoad: (value: boolean) => void;
};

export const useFirstLoad = create<FristLoadContext>((set) => ({
  firstLoad: true,
  setFirstLoad: (value) => set({ firstLoad: value }),
}));
