import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

interface UseSyncedStoreInterface {
  name: string;
  setName: Function;
  resetName: Function;
}

const useFishStore = create(
  persist(
    (set, get) => ({
      name: 'string',
      setName: () => {},
      resetName: () => {},
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)