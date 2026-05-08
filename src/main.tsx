import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './ui/css/index.css'
import HomePage from './routes/pages/home/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
