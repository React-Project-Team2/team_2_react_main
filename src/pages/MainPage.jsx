import React from 'react'
import '../styles/MainPage.css'
import ImageGallery from '../components/common/imageGallery/ImageGallery'

const MainPage = () => {
  return (
    <>
       <div className='w-auto d-flex justify-content-center align-items-center'>
          <ImageGallery path="about" />
       </div>
       
       <div className='w-auto custom-background'>

       </div>
    </>
  )
}

export default MainPage