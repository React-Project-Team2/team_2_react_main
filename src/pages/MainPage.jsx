import React from 'react'
import '../styles/MainPage.css'
import ImageGallery from '../components/common/imageGallery/ImageGallery'
import ContainerNavbar from '../components/common/containNavbar/ContainerNav'
import Category from '../components/common/category/Category'
import { Container } from 'react-bootstrap'

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
          <p>sub name</p>
        </div>
        <div class="bg-white text-dark container p-0">
          <ContainerNavbar />
          <Container>
            <Category
              name = "Hukuoka" 
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='후쿠오카 가고 싶다ㅏㅏ'
              postCount= '5'
              />
            <Category
              name= "Nagasaki"
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
              postCount= '5'
              />
            <Category
              name= "Kumamoto"
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
              postCount= '5'
              />
            <Category
              name= "Saga"
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
              postCount= '5'
            />
            <Category
              name= "Oita"
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
              postCount= '5'
            />
          </Container>
        </div>
      </div>
    </>
  )
}

export default MainPage