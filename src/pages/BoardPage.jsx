import React from 'react'
import '../styles/BoardPage.css';
import ContainerNavbar from '../components/common/containNavbar/ContainerNav.jsx';
import PostComponent from '../components/PostComponent.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
  const navigate = useNavigate();

  const handleButtonClicked = () => {
    navigate('/board/create');
  };

  return (
    <>
      <div className='container-fluid board'>
        <div className='w-auto'>
          <div className="pb-5 pt-5 container text-center">
            <h1>현지 학기제</h1>
            <h3>sub name</h3>
          </div>
          <Container className="bg-white p-0 white-board">
            <ContainerNavbar />
            <div className='img-box'>
              <img src="https://www.japanrailpassnow.co.uk/wp-content/uploads/2016/04/1000x400xFukuika-City-Guide.jpg.pagespeed.ic.n_LDvIx_LM.webp" className="img-ht img-fluid rounded" alt='' />
            </div>
            <Container className='my-3 ms-4'>
              <Row>
                <Col xs={2} className='border-end text-center'>
                  <h4>지역</h4>
                </Col>
                <Col xs={7}>
                </Col>
                <Col xs={3}>
                  <Button variant="secondary" onClick={handleButtonClicked}>게시글 작성</Button>
                </Col>
              </Row>
            </Container>
            <PostComponent />
          </Container>
        </div>
      </div>
    </>
  )
}

export default BoardPage