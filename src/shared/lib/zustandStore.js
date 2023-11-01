import { createStore } from "zustand/vanilla";

const myStore = createStore((set) => ({
  bears: [ 0 ],
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: [ 0 ] }),
  addBears: (item) => set((state) => ({ bears: [ ...state.bears, item ] })),
}))
// [ ...state.bears, item ]
export default myStore