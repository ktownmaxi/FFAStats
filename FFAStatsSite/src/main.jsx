import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import App from './routes/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/FFAStats'>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
