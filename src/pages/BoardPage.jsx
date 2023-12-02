import React, { useState } from 'react'
import '../styles/BoardPage.css';
import ContainerNavbar from '../components/common/containNavbar/ContainerNav.jsx';
import PostComponent from '../components/PostComponent.jsx';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');

  const handleButtonClicked = () => {
    navigate('/board/create');
  };

  const handleSelectCategory = (selectedKey) => {
    setCategory(selectedKey);
  }

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
                  <Dropdown onSelect={handleSelectCategory}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {category}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="전체">전체</Dropdown.Item>
                      <Dropdown.Item eventKey="후쿠오카">후쿠오카</Dropdown.Item>
                      <Dropdown.Item eventKey="나가사키">나가사키</Dropdown.Item>
                      <Dropdown.Item eventKey="구마모토">구마모토</Dropdown.Item>
                      <Dropdown.Item eventKey="오이타">오이타</Dropdown.Item>
                      <Dropdown.Item eventKey="사가">사가</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={7}>
                </Col>
                <Col xs={3}>
                  <Button variant="secondary" onClick={handleButtonClicked}>게시글 작성</Button>
                </Col>
              </Row>
            </Container>
            <PostComponent category={category} />
          </Container>
        </div>
      </div>
    </>
  )
}

export default BoardPage