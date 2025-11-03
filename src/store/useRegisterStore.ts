import { create } from 'zustand';

type RegisterData = {
  email: string;
  otp: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'teacher' | 'student' | 'school' | 'admin';
};

type RegisterStore = {
  data: RegisterData;
  updateData: (data: Partial<RegisterData>) => void;
  reset: () => void;
};

const initialState: RegisterData = {
  email: '',
  otp: '',
  password: '',
  firstName: '',
  lastName: '',
  role: 'student',
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
