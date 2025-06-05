import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route as Router } from 'react-router-dom'
import HomePage  from './pages/HomePage.tsx';
import UserProfilePage from './pages/UserProfilePage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
    <Routes>
      <Router path="/" element={<HomePage/>} />
      <Router path="/user/:username" element={<UserProfilePage/>} />
      <Router path="/favorites" element={< FavoritesPage/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
