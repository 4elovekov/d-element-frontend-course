import { create } from "zustand";

export const useStore = create((set) => ({
  idProduct: [],
  addProduct: (item) =>
    set((state) => ({ idProduct: [ ...state.idProduct, item ] })),
}));
