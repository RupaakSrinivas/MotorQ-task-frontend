import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface preferences {
  theme: "light" | "dark";
}

interface userPref extends preferences {
  getPref: () => preferences;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (_props: any) => void;
}

export const prefStore = create<userPref>()(
  persist(
    (set, get) => ({
      theme: "light",
      getPref: () => {
        return {
          theme: get().theme,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      update: (props: any) => {
        set({ ...props });
      },
    }),
    {
      name: "userPreferences",
    }
  )
);
