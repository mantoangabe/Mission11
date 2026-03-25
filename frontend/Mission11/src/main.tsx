import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookList from './components/BookList'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookList />
  </StrictMode>,
)
