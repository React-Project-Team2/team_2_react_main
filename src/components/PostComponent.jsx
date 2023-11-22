import React, { useEffect, useState, useCallback } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BoardPagination from './BoardPagination.jsx';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3100/posts`, {
        params: {
          _page: currentPage,
          _limit: 10
        }
      });
      setPosts(response.data);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post.id} className='border-0 mb-3'>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{truncateText(post.content, 123)}</Card.Text>
              </Col>
              <Col>
                <div className='d-flex justify-content-end mr-3 pt-3'>
                  <div>
                    <img src='조회수 이미지 경로' alt='조회수' />
                    {/* {post.views} */}
                  </div>
                  <div>
                    <img src='댓글 이미지 경로' alt='댓글' />
                    {/* {post.comments.length} */}
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <div className="d-flex justify-content-center">
        <BoardPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </Container>
  );
};

export default PostComponent;
