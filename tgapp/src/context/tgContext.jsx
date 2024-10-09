import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const TgContext = createContext();

// Custom hook to use the TgContext
export const useTgContext = () => {
  return useContext(TgContext);
};

// Create a provider component
export const TgProvider = ({ children }) => {
  const [telegramApp, setTelegramApp] = useState(window.Telegram.WebApp);

  useEffect(() => {
    if (telegramApp) {
      telegramApp.ready()
    }
  }, []);

  return <TgContext.Provider value={{telegramApp}}>{children}</TgContext.Provider>;
};
