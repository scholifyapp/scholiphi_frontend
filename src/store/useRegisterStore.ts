import { create } from 'zustand';

type RegisterData = {
  email: string;
  otp: string;
  password: string;
  name: string;
  phone: string;
};

type RegisterStore = {
  data: RegisterData;
  updateData: (data: Partial<RegisterData>) => void;
  reset: () => void;
};

const initialState = {
  email: '',
  otp: '',
  password: '',
  name: '',
  phone: '',
  method: null,
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  data: { ...initialState },
  updateData: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),
  reset: () =>
    set({
      data: { ...initialState },
    }),
}));
