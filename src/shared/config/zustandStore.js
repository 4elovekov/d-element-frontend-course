import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

const myStore = createStore(persist((set) => ({
  ids: [ 0 ],
  addId: (item) => set((state) => ({ ids: [ ...state.ids, item ] })),
  removeId: (index) => set((state) => ({ ids: [ ...state.ids.slice(0, index), ...state.ids.slice(index + 1) ] })),
}), {
  name: "idProduct",
  getStorage: () => localStorage,
  keys: [ "ids" ]
}));
export default myStore;