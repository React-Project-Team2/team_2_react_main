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

  const goToDetailPage = (post_id) => {
    navigate(`/board/${post_id}`);
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

  return (
    <Container>
      {posts.map((post) => (
        <div key={post.id} className='border-0 mb-3'>
          <div onClick={() => goToDetailPage(post.id)} >
            <Row>
              <Col sm={6} md={8} className='post'>
                <div className='post-title h5'>
                  {post.title}
                </div>
                <div className='post-content'>
                  {post.content.map(item => item.insert).join('\n').replace(/^\s+|\s+$/g, '')}
                </div>
              </Col>
              <Col sm={3} md={2} className='d-flex align-items-center'>
                <div className='post-create-at'>
                  {post.created_at}
                </div>
              </Col>
              <Col sm={3} md={2}>
                <div className='d-flex flex-column justify-content-center mr-3 pt-3'>
                  <div>
                    <Eye className='w-3 me-2' />
                    {post.views}
                  </div>
                  <div>
                    <ChatRight className='me-2' />
                    {commentCounts[post.id]}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pagesPerGroup={5}
          handlePageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default PostComponent;
