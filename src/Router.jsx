import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import BoardPage from './pages/BoardPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import BoardInsert from './pages/BoardInsert'

const Router = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/board/insert" element={<BoardInsert />} />
    </Routes>
  )
}

export default Router