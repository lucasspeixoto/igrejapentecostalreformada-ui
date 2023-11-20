import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor = 'dark' | 'light';

type ThemeStore = {
  themeColor: ThemeColor;
  setTheme: (themeColor: ThemeColor) => void;
};

const useTheme = create(
  persist<ThemeStore>(
    set => ({
      themeColor: 'dark',
      setTheme: (themeColor: ThemeColor) => {
        set({ themeColor });
      },
    }),
    {
      name: 'theme-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useTheme;
