import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookList from './BookList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookList />
  </StrictMode>,
)
