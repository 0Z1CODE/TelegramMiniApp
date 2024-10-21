import {create} from "zustand";


const useUserSettings = create ((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({currentUser}),

}));

export default useUserSettings;