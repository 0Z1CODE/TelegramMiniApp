
import { create } from "zustand";

const usePayment = create((set) => ({
  paymentStore: null,
  setPaymantStore: (paymentStore) => set({ paymentStore }),
}));

export default usePayment;
