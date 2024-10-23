import React, { useEffect, useState } from 'react'
import usePaymant from '../../api/usePaymant'
import { useParams } from 'react-router-dom'


const ConfirmPayment = () => {

// console.log(process.env.MONGO_USER_PASS);


  // const { checkPaymant } = usePaymant()
  // const [invoiceData, setInvoiceData] = useState(null)
  // useEffect(() => {
  //   const invoiceId = localStorage.getItem('invoiceId')
  //   checkPaymant(invoiceId).then((data) => setInvoiceData(data))
  //   .then(() => localStorage.removeItem('invoiceId'))
  //   .catch((error) => console.log(error))
  // }, [])


  return (
    <div>ConfirmPayment</div>
  )

}

export default ConfirmPayment