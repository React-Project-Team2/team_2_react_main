import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Eye, ChatRight } from 'react-bootstrap-icons';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import '../styles/PostComponent.css'

const PostComponent = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [commentCounts, setCommentCounts] = useState({});
  const postsPerPage = 10;

  const navigate = useNavigate();

  const goToDetailPage = (category, post_id) => {
    navigate(`/board/${category}/${post_id}`);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const params = {
        _page: currentPage,
        _limit: postsPerPage,
        _sort: 'created_at',
        _order: 'desc',
      };

      if (category !== '전체') {
        params.category = category;
      }

      const response = await axios.get(`http://localhost:3300/posts`, { params });
      setPosts(response.data);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / postsPerPage));
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchCommentCounts = async () => {
      const counts = {};

      for (const post of posts) {
        try {
          const response = await axios.get(
            `http://localhost:3300/posts/${post.id}/comments`
          );
          counts[post.id] = response.data.length;
        } catch (error) {
          console.error(error);
        }
      }

      setCommentCounts(counts);
    };

    fetchCommentCounts();
  }, [posts]);

  if (totalPages > 0) {
    return (
      <Container className='border-top border-dark border-2 post-main-box'>
        {posts.map((post, index) => (
          <div key={post.id} className={index !== 0 ? 'border-top border-2 mb-3' : 'mb-3'}>
            <div onClick={() => goToDetailPage(category, post.id)} >
              <Row>
                <Col sm={5} md={7} lg={8} className='post'>
                  <p className='post-title mt-1 mb-1 fs-5 fw-bold'>
                    {post.title}
                  </p>
                  <p className='post-content mb-1'>
                    {post.content.map(item => item.insert.hasOwnProperty('image') ? "이미지" : item.insert).join('\n').replace(/^\s+|\s+$/g, '')}
                  </p>
                </Col>
                <Col sm={3} md={2} className='d-flex align-items-center'>
                  <p className='post-create-at m-0'>
                    {post.created_at}
                  </p>
                </Col>
                <Col sm={4} md={3} lg={2} className='d-flex align-items-center'>
                  <Col className="d-flex justify-content-center">
                    <Eye className='board-post-views me-2' />
                    {post.views}
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <ChatRight className='board-comment-counts me-2' />
                    {commentCounts[post.id]}
                  </Col>

                </Col>
              </Row>
            </div>
          </div>
        ))}
        {totalPages > 1 ?
          <div className="d-flex justify-content-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              pagesPerGroup={5}
              handlePageChange={handlePageChange}
            />
          </div> : ''}
      </Container>
    );
  } else {
    return (
      <Container className='post-main-box'>
        <p className='text-center fs-4 mt-5'>
          해당 카테고리의 글이 없습니다.
        </p>
      </Container>
    )
  }


};

export default PostComponent;
