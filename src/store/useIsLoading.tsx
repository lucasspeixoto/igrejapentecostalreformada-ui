import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoadingStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const useIsLoading = create(
  persist<LoadingStore>(
    set => ({
      isLoading: false,
      setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: 'isLoading-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useIsLoading;
