import create from "zustand";

export const useUser = create((set) => ({
  user: null,
  loading: false,
  setUser: (data) => set({user: data}),
  setLoading: (bool) => set({loading: bool}),
}))