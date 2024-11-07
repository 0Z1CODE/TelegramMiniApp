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
   

    checkData(uData).then((data) => {
      if (data) {
        const userData = data.data?.userData;
        setCurrentUser(userData);
      } 
    })
      .catch((error) => console.log(error));

  }, []);

  return <TgContext.Provider value={{ telegramApp }}>{children}</TgContext.Provider>;
};
