import React, { useEffect, useState } from 'react'
import { useTgContext } from './context/tgContext'
import MainLayout from './layouts/MainLayout'
import Category from './components/Category/Category';
import AppRoutes from './routes/routes';
const App = () => {
  const { telegramApp } = useTgContext()
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
  
    // telegramApp.MainButton.show()
    // telegramApp.MainButton.text = "LOL"
    // telegramApp.MainButton.onClick(() =>  )
    const uData = telegramApp.initDataUnsafe;
    setUserData(uData)

  }, [])

  




  return (
    <>
      {/* <div>
        {userData && (
          <pre>
            {Object.entries(userData?.user).map(([key, value]) => (
              <div key={key}>
                {key}: {JSON.stringify(value)}
              </div>
            ))}
          </pre>
        )}
      </div> */}

      <AppRoutes/>
    </>
  )
}

export default App

