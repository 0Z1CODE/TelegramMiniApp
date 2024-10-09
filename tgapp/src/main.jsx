import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TgProvider } from './context/tgContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
<TgProvider>
  <App/>
</TgProvider>
  </StrictMode>,
)
