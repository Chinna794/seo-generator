import { create } from "zustand";

export type SeoFormState = {
  title: string;
  setTitle: (title: string) => void;
  description?: string;
  setDescription?: (description: string) => void;
  imageFile: string | number | readonly string[] | undefined;
  setImageFile: (image: string | number | readonly string[] | undefined) => void;
  url?: string;
  setUrl?: (url: string) => void;
};

export const useSeoFormStore = create<SeoFormState>((set) => ({
  title: "SEO Generator - Create SEO metadata for your web pages",
  setTitle: (title: string) => set({ title }),
  description:
    "With SEO Generator you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, X and more!",
  setDescription: (description: string) => set({ description }),
  imageFile: undefined,
  setImageFile: (imageFile: string | number | readonly string[] | undefined) => set({ imageFile }),
  url: "https://seo-generator.vercel.app",
  setUrl: (url: string) => set({ url }),
  getIsFormComplete: (): boolean => {
    const { title, description, imageFile, url } = useSeoFormStore.getState();

    const hasTitle = typeof title === "string" && title.trim().length > 0;
    const hasDescription = typeof description === "string" && description.trim().length > 0;
    const hasImage = imageFile instanceof File;
    const hasUrl = typeof url === "string" && /^https?:\/\/.+/.test(url.trim());

    return hasTitle && hasDescription && hasImage && hasUrl;
  },
}));
