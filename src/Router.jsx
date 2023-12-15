import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import AboutPageUpdate from './pages/AboutPageUpdate'
import BoardPage from './pages/BoardPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import BoardInput from './pages/BoardInput'
import PostPage from './pages/PostPage'
import ProfilePage from './pages/ProfilePage'
import AuthRouter from './components/common/Auth/AuthRouter';
import TeamAboutPage from './pages/TeamAboutPage'
import TeamAboutPageUpdate from './pages/TeamAboutPageUpdate'


const Router = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/board/:category_name" element={<BoardPage />} />
      <Route path="/board/:category_name/:post_id" element={<PostPage />} />
      <Route path="/board/:category_name/create" element={
        <AuthRouter>
          <BoardInput page='create' />
        </AuthRouter>
      } />
      <Route path="/board/:category_name/update/:post_id" element={
        <AuthRouter>
          <BoardInput page='update' />
        </AuthRouter>
      } />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/update" element={<AboutPageUpdate />} />
      <Route path="/team" element={<TeamAboutPage />} />
      <Route path="/team/update" element={<TeamAboutPageUpdate />} />
    </Routes>
  )
}

export default Router