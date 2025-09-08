import { create } from "zustand";

export type SettingsStore = {
  titleMaxLength: number;
  setTitleMaxLength: (length: number) => void;
  descriptionMaxLength: number;
  setDescriptionMaxLength: (length: number) => void;
  isFileImage: boolean;
  setIsFileImage?: (isFileImage: boolean) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  titleMaxLength: 60,
  setTitleMaxLength: (titleMaxLength: number) => set({ titleMaxLength }),
  descriptionMaxLength: 160,
  setDescriptionMaxLength: (descriptionMaxLength: number) => set({ descriptionMaxLength }),
  isFileImage: true,
  setIsFileImage: (isFileImage: boolean) => set({ isFileImage }),
}));
