import React, { useState } from 'react'
import '../styles/BoardPage.css';
import PostComponent from '../components/PostComponent.jsx';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');

  const handleButtonClicked = () => {
    navigate(`/board/${category}/create`);
  };

  const handleSelectCategory = (selectedKey) => {
    setCategory(selectedKey);
  }

  return (
    <>
      <div className='container-fluid pb-5 board'>
        <div className="pb-5 pt-5 container text-center">
          <h1>현지 학기제</h1>
          <h3>sub name</h3>
        </div>
        <Container className="bg-white p-0 rounded white-board">
          <div className='boardpage-img-box'>
            <img src="https://www.japanrailpassnow.co.uk/wp-content/uploads/2016/04/1000x400xFukuika-City-Guide.jpg.pagespeed.ic.n_LDvIx_LM.webp" className="boardpage-img rounded-top" alt='후쿠오카 이미지(야경)' />
          </div>
          <Container>
            <Container className='my-3'>
              <Row>
                <Col sm={2} md={2} className='py-1'>
                  <Dropdown onSelect={handleSelectCategory}>
                    <Dropdown.Toggle variant="success">
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
                <Col sm={7} md={8}>
                </Col>
                <Col sm={3} md={2} className='py-1'>
                  <Button variant="secondary" onClick={handleButtonClicked}>글쓰기</Button>
                </Col>
              </Row>
            </Container>
            <PostComponent category={category} />
          </Container>
        </Container>
      </div>
    </>
  )
}

export default BoardPage