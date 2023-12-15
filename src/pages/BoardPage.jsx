import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/BoardPage.css';
import PostComponent from '../components/PostComponent.jsx';
import { Container, Button, Dropdown } from 'react-bootstrap';

const BoardPage = () => {
  const navigate = useNavigate();
  const { category_name } = useParams();
  const [category, setCategory] = useState('전체');

  useEffect(() => {
    setCategory(category_name || '전체');
    window.scrollTo(0, 0);
  }, [category_name]);

  const handleButtonClicked = () => {
    navigate(`/board/${category}/create`);
  };

  const handleSelectCategory = (selectedKey) => {
    setCategory(selectedKey);
    navigate(`/board/${selectedKey}`);
  }

  return (
    <>
      <div className='container-fluid pb-5 board'>
        <div className="pb-5 pt-5 container text-center">
          <h1>현지 학기제</h1>
        </div>
        <Container className="bg-white p-0 rounded white-board">
          <div className='boardpage-img-box'>
            <img src="https://www.japanrailpassnow.co.uk/wp-content/uploads/2016/04/1000x400xFukuika-City-Guide.jpg.pagespeed.ic.n_LDvIx_LM.webp" className="boardpage-img rounded-top" alt='후쿠오카 이미지(야경)' />
          </div>
          <Container>
            <Container className='d-flex justify-content-between border-bottom border-dark border-2 flex-wrap mt-3 pt-1 pb-4'>
              <Dropdown className="board-dropdown my-1" onSelect={handleSelectCategory} >
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
              <Button className="my-1" variant="secondary" onClick={handleButtonClicked}>글쓰기</Button>
            </Container>
            <PostComponent category={category} />
          </Container>
        </Container>
      </div>
    </>
  )
}

export default BoardPage