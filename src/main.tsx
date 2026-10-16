import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ProjectComments } from './components/ui/project-comments'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ProjectComments />
  </StrictMode>,
)
