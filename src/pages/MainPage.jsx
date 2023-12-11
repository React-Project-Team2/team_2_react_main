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
          content: post.content.filter(item => !item.insert.image).map(item => item.insert).join(' ')
        }));
        
        setPosts(processedPosts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    // fetchData 함수 호출
    fetchData();
  }, []); // useEffect의 두 번째 인자로 빈 배열을 전달하면 컴포넌트가 마운트될 때만 실행

  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3300/posts');
        const data = await response.json();

        // 카테고리별로 게시물 수를 카운트
        const countsByCategory = data.reduce((acc, post) => {
          const category = post.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategoryCounts(countsByCategory);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      {/* 상단 이미기 갤러리 스페이스*/}
      <div className='w-auto d-flex justify-content-center align-items-center' style={{ height: '93vh' }}>
        <div className="container ">
          <ImageGallery path="about" />
        </div>
      </div>
      {/* 하단 커테이너 스페이스 */}
      <div className='w-auto custom-background '>
        <div className="pb-5 pt-5 container text-center">
          <h1>현지 학기제</h1>
        </div>
      {/* 카테고리 컨테이너 */}
        <div className="bg-white text-dark container p-0 rounded-3">
          <Container>
            <Row className='p-4'>
              <h4>Category</h4>
            </Row>
            <Category
              name = "후쿠오카 현" 
              img = "https://www.agoda.com/wp-content/uploads/2019/08/Fukuoka-Castle-cherry-blossoms-best-time-to-visit-Kyushu.jpg" 
              detail='수상 스포츠를 즐길 수 있는 해안선, 하이킹 코스로 멋진 산세가 우거진 내륙, 세계적인 수준의 해산물과 라멘의 고향으로 떠나는 일상 탈출 여행'
              postCount= {categoryCounts['후쿠오카'] || 0}
              category= '후쿠오카'
              />
            <Category
              name= "나가사키 현"
              img = "https://www.budgetrentacar.co.jp/images/foreign/shop/place/inasayama-park.jpg" 
              detail='완만한 언덕과 숲이 우거진 섬을 배경 삼아 고대 문화가 꽃피었고 국제 무역의 역사가 살아 숨 쉬는 곳'
              postCount= {categoryCounts['나가사키'] || 0}
              category= '나가사키'
              />
            <Category
              name= "구마모토 현"
              img = "https://res-4.cloudinary.com/jnto/image/upload/w_670,h_450,c_fill,f_auto,fl_lossy,q_auto/v1514403676/kumamoto/Kumamoto1541_8" 
              detail='구마모토 재건을 돕는 온천 리조트와 웅장한 성채, 이름난 현지 음식 쿠마모토현의 웅대한 자연은 외국인 관광객분들께 언제나 사랑받고 있는 매력포인트입니다.'
              postCount= {categoryCounts['구마모토'] || 0}
              category= '구마모토'
              />
            <Category
              name= "사가 현"
              img = "https://res-2.cloudinary.com/jnto/image/upload/w_670,h_450,c_fill,f_auto,fl_lossy,q_auto/v1514401134/saga/Saga1189_2" 
              detail='한때 중대한 교역의 중심지이자 전통식 도자기 산지였던, 작은 섬이 점점이 흩어져 있고 한반도를 마주 보고 있는 해안가의 사가현'
              postCount= {categoryCounts['사가'] || 0}
              category= '사가'
              />
            <Category
              name= "오이타 현"
              img = "https://res-3.cloudinary.com/jnto/image/upload/w_670,h_450,c_fill,f_auto,fl_lossy,q_auto/v1514407013/oita/Oita1991_1" 
              detail='풍부한 예술, 종교적 유산과 야바케이 협곡 및 벳푸 온천과 같은 천혜의 자연 경관이 공존하는 오이타는 사람의 손길이 많이 닿지 않아 본격 탐험 여행지로도 손색이 없는 곳'
              postCount= {categoryCounts['오이타'] || 0}
              category= '오이타'
              />
            <Row className='px-5 p-4 category-title'>
              신규 게시물
            </Row>
            <Row className='pb-5'>
            {/* 최신 3개의 게시물만 렌더링 */}
            {posts.map(post => (
                <Col md={3} key={post.id} className='mx-5 pb-2'>
                  <NewPost
                    post_id={post.id}
                    name={post.nickname}
                    content={post.content}
                    created_at={post.created_at}
                    title={post.title}
                    category={post.category}
                    views={post.views}
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