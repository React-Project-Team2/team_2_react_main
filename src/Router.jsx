import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'

const Router = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
    </Routes>
  )
}

export default Router