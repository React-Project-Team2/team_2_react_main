import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Eye, ChatRight } from 'react-bootstrap-icons';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';  

const PostComponent = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [commentCounts, setCommentCounts] = useState({});
  const pagesPerGroup = 10;

  const navigate = useNavigate();

  const goToDetailPage = (post_id) => {
    navigate(`/board/${post_id}`);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const params = {
          _page: currentPage,
          _limit: pagesPerGroup
      };

      if (category !== '전체') {
        params.category = category;
      }

      const response = await axios.get(`http://localhost:3300/posts`, { params });
      setPosts(response.data);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / pagesPerGroup));
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

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
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

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post.id} className='border-0 mb-3'>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title onClick={() => goToDetailPage(post.id)} style={{cursor: "pointer"}}>
                  {post.title}
                </Card.Title>
                <Card.Text>
                  {truncateText(post.content.map(item => item.insert).join(' '), 123)}
                </Card.Text>
              </Col>
              <Col>
                <div className='d-flex justify-content-end mr-3 pt-3'>
                  <div>
                    <Eye className='w-3'/>
                    {/* <img src='https://cdn.pixabay.com/photo/2016/12/18/11/04/eye-1915455_1280.png' width='27px' alt='조회수' /> */}
                    {post.views}
                  </div>
                  <div>
                    <ChatRight className='me-2'/>
                    {/* <img src='https://cdn.icon-icons.com/icons2/37/PNG/32/comments_3979.png' width='20px' alt='댓글' /> */}
                    {commentCounts[post.id]}
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <div className="d-flex justify-content-center">
        <PaginationComponent 
          currentPage={currentPage} 
          totalPages={totalPages} 
          pagesPerGroup={pagesPerGroup}
          handlePageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default PostComponent;
