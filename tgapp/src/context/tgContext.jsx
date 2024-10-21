import React, { createContext, useContext, useEffect, useState } from "react";
import useTelegramData from "../api/useTelegramData";
import useUserSettings from "../../zustand/useUserSettings";
import { set } from "mongoose";
// Create a context
const TgContext = createContext();
const ENV = process.env.NODE_ENV;

// Custom hook to use the TgContext
export const useTgContext = () => {
  return useContext(TgContext);
};

// Create a provider component
export const TgProvider = ({ children }) => {
  const [telegramApp, setTelegramApp] = useState(window.Telegram.WebApp);
  const { currentUser, setCurrentUser } = useUserSettings();
  const { checkData } = useTelegramData();



  useEffect(() => {
    if (telegramApp) {
      telegramApp.ready()
    }
    const uData = telegramApp.initData;
    const localData = {
      id: 363025560,
      first_name: 'Max',
      last_name: 'Soro',
      username: 'maxSoro',
      language_code: 'uk',
      is_premium: true,
      allows_write_to_pm: true
    }

    checkData(uData).then((data) => {
      if (data) {
        const userData = data.data?.userData;
        setCurrentUser(userData);
      } else {
        setCurrentUser(localData);
      }
    })
    .catch((error) => console.log(error));
      console.log(111);
      
  }, []);

  return <TgContext.Provider value={{telegramApp}}>{children}</TgContext.Provider>;
};
