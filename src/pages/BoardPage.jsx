import React from 'react'
import '../styles/BoardPage.css';
import ContainerNavbar from '../components/common/containNavbar/ContainerNav.jsx';

const BoardPage = () => {
  return (
    <>
      <div className='container-fluid board'>
        <div className='w-auto'>
          <div className="pb-5 pt-5 container text-center">
            <h1>현지 학기제</h1>
            <h3>sub name</h3>
          </div>
          <div className="bg-white container p-0">
            <ContainerNavbar />
          </div>
        </div>
      </div>
    </>
  )
}

export default BoardPage