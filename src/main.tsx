import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/src/components/styles.css'
import Landing from '@/src/components/routes/Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
