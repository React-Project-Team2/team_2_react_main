import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import BoardPage from './pages/BoardPage'

const Router = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  )
}

export default Router