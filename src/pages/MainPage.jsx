import React, { useEffect, useState } from 'react'
import '../styles/MainPage.css'
import ImageGallery from '../components/common/imageGallery/ImageGallery'
import Category from '../components/common/category/Category'
import { Col, Container, Row } from 'react-bootstrap'
import NewPost from '../components/common/category/NewPost'

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3300/posts');
        const data = await response.json();

        // created_at을 기준으로 내림차순 정렬
        const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        // 최신 3개의 게시물만 선택
        const latestPosts = sortedPosts.slice(0, 3);
        
        // content 배열의 insert 속성을 합쳐서 출력
        const processedPosts = latestPosts.map(post => ({
          ...post,
          content: post.content.map(item => item.insert).join(' ')
        }));
        
        setPosts(processedPosts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    // fetchData 함수 호출
    fetchData();
  }, []); // useEffect의 두 번째 인자로 빈 배열을 전달하면 컴포넌트가 마운트될 때만 실행

  return (
    <>
      {/* 상단 이미기 갤러리 스페이스*/}
      <div className='w-auto d-flex justify-content-center align-items-center' style={{ height: '91vh' }}>
        <div class="container ">
          <ImageGallery path="about" />
        </div>
      </div>
      {/* 하단 커테이너 스페이스 */}
      <div className='w-auto custom-background '>
        <div class="pb-5 pt-5 container text-center">
          <h1>현지 학기제</h1>
          <p>sub name</p>
        </div>
      {/* 카테고리 컨테이너 */}
        <div className="bg-white text-dark container p-0 rounded-3">
          <Container>
            <Row className='p-4'>
              <h4>Category</h4>
            </Row>
            <Category
              name = "Hukuoka" 
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='후쿠오카 가고 싶다ㅏㅏ'
              postCount= '5'
              />
            <Category
              name= "Nagasaki"
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail=' test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text'
              postCount= '5'
              />
            <Category
              name= "Kumamoto"
              img = "https://cdn.pixabay.com/photo/2023/08/16/23/49/snail-8195174_1280.jpg" 
              detail='testtexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttexttesttext'
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
            <Row>
              <h6 className='px-5 p-4'>신규 게시물</h6>
            </Row>
            <Row className='pb-5'>
            {/* 최신 3개의 게시물만 렌더링 */}
            {posts.map(post => (
                <Col md={4} key={post.id}>
                  <NewPost
                    post_id={post.id}
                    name={post.nickname}
                    content={post.content}
                    created_at={post.created_at}
                    title={post.title}
                    view={post.views}
                    style={{ position: 'fixed', top: '0', right: '0' }}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <div className='pt-5'>
        </div>
      </div>
    </>
  )
}

export default MainPage