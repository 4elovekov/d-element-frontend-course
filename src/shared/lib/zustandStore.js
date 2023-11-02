import { createStore } from "zustand/vanilla";

const myStore = createStore((set) => ({
  ids: [ 0 ],
  addId: (item) => set((state) => ({ ids: [ ...state.ids, item ] })),
  removeId: (index) => set((state) => ({ ids: [ ...state.ids.slice(0, index), ...state.ids.slice(index + 1) ] })),
}))
export default myStore