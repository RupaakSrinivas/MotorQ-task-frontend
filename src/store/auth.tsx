import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  id: number;
  name: string;
  phone: string;
  role: "manager" | "driver" | null;
}

interface AuthStore extends User {
  getUser: () => User;
  updateUser: (_props: User) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (_props: any) => void;
  login: (_props: User) => void;
  logout: () => void;
}

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      email: "",
      id: 0,
      name: "",
      phone: "",
      role: null,
      getUser: () => {
        return {
          email: get().email,
          id: get().id,
          name: get().name,
          phone: get().phone,
          role: get().role,
        };
      },
      update: (props: User) => {
        set({ ...props });
      },
      updateUser: (props: User) => {
        set({ ...props });
      },
      login: (props: User) => {
        set({ ...props });
      },
      logout: () => {
        set({
          email: "",
          id: 0,
          name: "",
          phone: "",
          role: null,
        });
        localStorage.clear();
      },
    }),
    {
      name: "authStore",
    }
  )
);
