import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import BoardPage from './pages/BoardPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import BoardInput from './pages/BoardInput'
import PostPage from './pages/PostPage'

const Router = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/board/:post_id" element={<PostPage />} />
      <Route path="/board/create" element={<BoardInput page='create' />} />
      <Route path="/board/update/:post_id" element={<BoardInput page='update' />} />
    </Routes>
  )
}

export default Router