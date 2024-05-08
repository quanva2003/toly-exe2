import { create } from "zustand";

const useSidebar = create((set) => ({
  selectedSidebar: null,
  setSelectedSidebar: (selectedSidebar) => set({ selectedSidebar }),
}));

export default useSidebar;
