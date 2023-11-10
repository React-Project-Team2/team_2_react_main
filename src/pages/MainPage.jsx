import React from 'react'
import '../styles/MainPage.css'
import ImageGallery from '../components/common/imageGallery/ImageGallery'
import ContainerNavbar from '../components/common/containNav/ContainerNav'

const MainPage = () => {
  return (
    <>
      <div className='w-auto d-flex justify-content-center align-items-center'>
        <div class="container ">
          <ImageGallery path="about" />
        </div>
      </div>

      <div className='w-auto custom-background '>
        <div class="pb-5 pt-5 container text-center">
          <h1>현지 학기제</h1>
          <h3>sub name</h3>
        </div>
        <div class="bg-white text-dark container p-0">
          <ContainerNavbar />
          컨테이너
        </div>
      </div>
    </>
  )
}

export default MainPage