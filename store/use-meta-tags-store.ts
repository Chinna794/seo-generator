import { create } from "zustand";

export type MetaTagsStore = {
  code: string;
  setCode: (code: string) => void;
};

export const useMetaTagsStore = create<MetaTagsStore>((set) => ({
  code: "",
  setCode: (code) => set({ code }),
}));
