import React, { useEffect,useState } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Outlet, useNavigate, useLocation} from "react-router-dom";
// import { useTgContext } from './../context/tgContext';


const MainLayout = () => {
  // const { telegramApp } = useTgContext()
  const location = useLocation();
  const navigate = useNavigate();
 const [history, setHistory] = useState([]);

// useEffect(() => {
//   setHistory([...history, location.pathname]);
//   console.log(history);
 
  
  
//   telegramApp.BackButton.show()
//   telegramApp.BackButton.onClick(() => {
//     if (history.length > 1) {
//       navigate(history[history.length - 1]);
//       history.pop();
//     } else {
//       navigate('/');
//     }
//   })

//   if (location.pathname === '/') {
//     telegramApp.BackButton.hide()
//     setHistory([]);
//   }
    

// }, [location]);

// console.log(history);


  
  return (
   <>
  <div className='flex-col h-screen flex items-center justify-center'>
  <Header/>
   <div className='flex-col h-full w-full px-3 overflow-auto'>
    <Outlet/>
   </div>
    <Footer/>
  </div>
   </>
  )
}

export default MainLayout