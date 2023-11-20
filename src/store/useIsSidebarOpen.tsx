import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SidebarOpenStore = {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
};

const useIsSidebarOpen = create(
  persist<SidebarOpenStore>(
    set => ({
      sidebarOpen: false,
      setSidebarOpen: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'sidebarOpen-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useIsSidebarOpen;
