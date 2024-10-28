import { createContext, useState, useEffect, useContext, memo } from "react";
import useUserSettings from "./../../zustand/useUserSettings";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}
//if have an any lags with users online - fix it with useEffect -- delete memo 
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentUser } = useUserSettings();

  const server_url = process.env.SERVER_URL;

  useEffect(() => {
    if (currentUser) {
      const socket = io(server_url, {
        query: {
          telegram_id: currentUser.id,
        }
      });
      setSocket(socket);
      // io.emit() is used to listen the events . can be used both in frontend and backend
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users)
      })
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [currentUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
