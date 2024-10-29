import React, { useEffect, useState } from 'react';
import usePaymant from '../../api/usePaymant';
import { useParams } from 'react-router-dom';
import { useSocketContext } from "./../../context/SocketContext"


const ConfirmPayment = () => {
  const { socket } = useSocketContext()
  const { _id } = useParams();


  
  useEffect(() => {
    const handlePaymentUpdated = (updatedPayment) => {
      if (updatedPayment.invoiceId === _id) {
        // Handle the updated payment information
        console.log('Payment updated:', updatedPayment);
      }
    };

    socket.on('paymentUpdated', handlePaymentUpdated);

    return () => {
      socket.off('paymentUpdated', handlePaymentUpdated);
    };
  }, [socket, _id]);






  return (
    <div>
      <h1>Confirm Payment</h1>
      {/* {payment ? (
        <div>
          <p>Status: {payment.status}</p>
          <p>Total Price: {payment.total_price}</p>
          <p>Invoice ID: {payment.invoiceId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default ConfirmPayment;