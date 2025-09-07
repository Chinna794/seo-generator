// stores/seo-form.store.ts
import { create } from "zustand";
import { z } from "zod";
import {
  seoFormSchema,
  defaultSeoFormSchemaValue,
  type SeoFormInput,
  type SeoFormOutput,
} from "../app/_components/seo-form/form-schema";

// ---------------- Tipos derivados del schema ----------------
type ImagesItem = NonNullable<SeoFormInput["images"]>[number];
type HeadingsItem = NonNullable<SeoFormInput["content"]["headings"]>[number];
type HreflangItem = NonNullable<SeoFormInput["hreflangs"]>[number];
type BreadcrumbItem = NonNullable<SeoFormInput["breadcrumbs"]>[number];

type Touched = Partial<Record<keyof SeoFormInput, boolean>>;

type ZodIssue = z.ZodIssue;
type SafeResult = ReturnType<typeof seoFormSchema.safeParse>;

const clone = <T>(v: T): T =>
  typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v));

const shallowEqualObj = <T extends object>(a: T, b: T) => {
  if (Object.is(a, b)) return true;
  const ka = Object.keys(a) as (keyof T)[];
  const kb = Object.keys(b) as (keyof T)[];
  if (ka.length !== kb.length) return false;
  for (const k of ka) if (!Object.is(a[k], b[k])) return false;
  return true;
};

type SeoFormStore = {
  values: SeoFormInput;
  initial: SeoFormInput;
  errors: ZodIssue[];
  isValid: boolean;
  touched: Touched;

  isDirty: boolean;

  setField: <K extends keyof SeoFormInput>(key: K, value: SeoFormInput[K]) => void;
  setAll: (patch: Partial<SeoFormInput>) => void;

  setContent: (content: SeoFormInput["content"]) => void;
  setRobots: (robots: SeoFormInput["robots"]) => void;
  setOG: (og: SeoFormInput["og"]) => void;
  setTwitter: (tw: SeoFormInput["twitter"]) => void;
  setStructuredData: (sd: SeoFormInput["structuredData"]) => void;

  images: {
    push: (item: ImagesItem) => void;
    update: (index: number, item: ImagesItem) => void;
    remove: (index: number) => void;
    replaceAll: (items: ImagesItem[]) => void;
  };
  headings: {
    push: (item: HeadingsItem) => void;
    update: (index: number, item: HeadingsItem) => void;
    remove: (index: number) => void;
    replaceAll: (items: HeadingsItem[]) => void;
  };
  hreflangs: {
    ensure: () => void;
    push: (item: HreflangItem) => void;
    update: (index: number, item: HreflangItem) => void;
    remove: (index: number) => void;
    replaceAll: (items: HreflangItem[]) => void;
    clear: () => void;
  };
  breadcrumbs: {
    ensure: () => void;
    push: (item: BreadcrumbItem) => void;
    update: (index: number, item: BreadcrumbItem) => void;
    remove: (index: number) => void;
    replaceAll: (items: BreadcrumbItem[]) => void;
    clear: () => void;
  };

  validate: () => void;
  safeValidate: () => SafeResult;

  markTouched: (key: keyof SeoFormInput) => void;
  reset: () => void;
};

export const useSeoFormStore = create<SeoFormStore>((set, get) => {
  const initial = clone(defaultSeoFormSchemaValue);

  const validateNow = (values: SeoFormInput) => {
    const res = seoFormSchema.safeParse(values);
    return {
      isValid: res.success,
      errors: res.success ? [] : res.error.issues,
    };
  };

  const seed = validateNow(initial);

  return {
    values: initial,
    initial,
    errors: seed.errors,
    isValid: seed.isValid,
    touched: {},

    get isDirty() {
      const s = get();
      return JSON.stringify(s.values) !== JSON.stringify(s.initial) || !shallowEqualObj(s.values, s.initial);
    },

    setField: (key, value) =>
      set((s) => {
        const next = clone(s.values);
        next[key] = value;
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    setAll: (patch) =>
      set((s) => {
        const next: SeoFormInput = { ...clone(s.values), ...patch };
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    setContent: (content) =>
      set((s) => {
        const next = clone(s.values);
        next.content = content;
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    setRobots: (robots) =>
      set((s) => {
        const next = clone(s.values);
        next.robots = robots;
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    setOG: (og) =>
      set((s) => {
        const next = clone(s.values);
        next.og = og;
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    setTwitter: (tw) =>
      set((s) => {
        const next = clone(s.values);
        next.twitter = tw;
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    setStructuredData: (sd) =>
      set((s) => {
        const next = clone(s.values);
        next.structuredData = sd;
        const v = validateNow(next);
        return { values: next, ...v };
      }),

    // ---- Arrays: images ----
    images: {
      push: (item) =>
        set((s) => {
          const next = clone(s.values);
          next.images = [...(next.images ?? []), item];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      update: (index, item) =>
        set((s) => {
          const next = clone(s.values);
          next.images = (next.images ?? []).map((it, i) => (i === index ? item : it));
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      remove: (index) =>
        set((s) => {
          const next = clone(s.values);
          next.images = (next.images ?? []).filter((_, i) => i !== index);
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      replaceAll: (items) =>
        set((s) => {
          const next = clone(s.values);
          next.images = items;
          const v = validateNow(next);
          return { values: next, ...v };
        }),
    },

    // ---- Arrays: content.headings ----
    headings: {
      push: (item) =>
        set((s) => {
          const next = clone(s.values);
          next.content = { ...next.content, headings: [...(next.content.headings ?? []), item] };
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      update: (index, item) =>
        set((s) => {
          const next = clone(s.values);
          next.content = {
            ...next.content,
            headings: (next.content.headings ?? []).map((it, i) => (i === index ? item : it)),
          };
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      remove: (index) =>
        set((s) => {
          const next = clone(s.values);
          next.content = {
            ...next.content,
            headings: (next.content.headings ?? []).filter((_, i) => i !== index),
          };
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      replaceAll: (items) =>
        set((s) => {
          const next = clone(s.values);
          next.content = { ...next.content, headings: items };
          const v = validateNow(next);
          return { values: next, ...v };
        }),
    },

    hreflangs: {
      ensure: () =>
        set((s) => {
          if (s.values.hreflangs) return s;
          const next = clone(s.values);
          next.hreflangs = [];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      push: (item) =>
        set((s) => {
          const next = clone(s.values);
          next.hreflangs = [...(next.hreflangs ?? []), item];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      update: (index, item) =>
        set((s) => {
          const next = clone(s.values);
          const list = [...(next.hreflangs ?? [])];
          list[index] = item;
          next.hreflangs = list;
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      remove: (index) =>
        set((s) => {
          const next = clone(s.values);
          const list = (next.hreflangs ?? []).filter((_: unknown, i: number) => i !== index);
          next.hreflangs = list.length ? list : [];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      replaceAll: (items) =>
        set((s) => {
          const next = clone(s.values);
          next.hreflangs = items;
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      clear: () =>
        set((s) => {
          const next = clone(s.values);
          next.hreflangs = [];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
    },

    breadcrumbs: {
      ensure: () =>
        set((s) => {
          if (s.values.breadcrumbs) return s;
          const next = clone(s.values);
          next.breadcrumbs = [];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      push: (item) =>
        set((s) => {
          const next = clone(s.values);
          next.breadcrumbs = [...(next.breadcrumbs ?? []), item];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      update: (index, item) =>
        set((s) => {
          const next = clone(s.values);
          const list = [...(next.breadcrumbs ?? [])];
          list[index] = item;
          next.breadcrumbs = list;
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      remove: (index) =>
        set((s) => {
          const next = clone(s.values);
          const list = (next.breadcrumbs ?? []).filter((_: unknown, i: number) => i !== index);
          next.breadcrumbs = list.length ? list : [];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      replaceAll: (items) =>
        set((s) => {
          const next = clone(s.values);
          next.breadcrumbs = items;
          const v = validateNow(next);
          return { values: next, ...v };
        }),
      clear: () =>
        set((s) => {
          const next = clone(s.values);
          next.breadcrumbs = [];
          const v = validateNow(next);
          return { values: next, ...v };
        }),
    },

    validate: () => {
      const parsed = seoFormSchema.parse(get().values) as SeoFormOutput;
      set({ errors: [], isValid: true, values: parsed as SeoFormInput });
    },

    safeValidate: () => {
      const res = seoFormSchema.safeParse(get().values);
      set({ errors: res.success ? [] : res.error.issues, isValid: res.success });
      return res;
    },

    // ---- Touch & Reset ----
    markTouched: (key) => set((s) => ({ touched: { ...s.touched, [key]: true } })),

    reset: () =>
      set(() => {
        const base = clone(defaultSeoFormSchemaValue);
        const v = seoFormSchema.safeParse(base);
        return {
          values: base,
          initial: base,
          touched: {},
          errors: v.success ? [] : v.error.issues,
          isValid: v.success,
        };
      }),
  };
});
