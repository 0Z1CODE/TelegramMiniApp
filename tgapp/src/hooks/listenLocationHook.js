/** @format */

import { useEffect, useState } from 'react';
import { useSocketContext } from './../context/SocketContext';
import useUserSettings from './../../zustand/useUserSettings';
import { useParams } from 'react-router-dom';

export const useLocationHook = () => {
  const { socket } = useSocketContext();
  const { currentUser } = useUserSettings();
  const { _id } = useParams();
  const sysId = currentUser.sysId;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const handleLocation = (updateLocation) => {
        setLocation(updateLocation);
    };

    socket.on('location', handleLocation);

    return () => {
      socket.off('location', handleLocation);
    };
  }, [socket, _id, sysId]);

  return { location };
};
