import { useEffect, useState } from 'react';
import { useSocketContext } from './../context/SocketContext';
import  useUserSettings  from './../../zustand/useUserSettings';
import { useParams } from 'react-router-dom';

export const usePaumantHook = () => {
  const { socket } = useSocketContext();
  const { currentUser } = useUserSettings();
  const { _id } = useParams();
  const sysId = currentUser.sysId;
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const handlePaymentUpdated = (updatedPayment) => {
      if (updatedPayment.invoiceId === _id && updatedPayment.user_id === sysId) {
        setPayment(updatedPayment);
      }
    };

    socket.on('paymentUpdated', handlePaymentUpdated);

    return () => {
      socket.off('paymentUpdated', handlePaymentUpdated);
    };
  }, [socket, _id, sysId]);

  return { payment };
};
