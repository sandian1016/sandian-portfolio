import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ProjectComments } from './components/ui/project-comments'
import './index.css'

// Set to true to restore project annotations without removing saved comments.
const SHOW_PROJECT_COMMENTS = false

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {SHOW_PROJECT_COMMENTS && <ProjectComments />}
  </StrictMode>,
)
