import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/components/styles.css'
import Landing from '@/components/routes/Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
