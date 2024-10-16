import {create} from "zustand";


const useAppSettings = create ((set) => ({
  pageTitle: "Головнв сторінка",
  setPageTitle: (pageTitle) => set({pageTitle}),

}));

export default useAppSettings;