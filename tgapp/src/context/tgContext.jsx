import React, { createContext, useContext, useEffect, useState } from "react";
import useTelegramData from "../api/useTelegramData";
// Create a context
const TgContext = createContext();


// Custom hook to use the TgContext
export const useTgContext = () => {
  return useContext(TgContext);
};

// Create a provider component
export const TgProvider = ({ children }) => {
  const [telegramApp, setTelegramApp] = useState(window.Telegram.WebApp);
  const { checkData } = useTelegramData();



  useEffect(() => {
    if (telegramApp) {
      telegramApp.ready()
    }
    const uData = telegramApp.initData;
      checkData(uData).then((data) => console.log(data)).catch((error) => console.log(error));
  }, []);

  return <TgContext.Provider value={{telegramApp}}>{children}</TgContext.Provider>;
};
