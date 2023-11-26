import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import { ListGroup, Pagination } from 'react-bootstrap';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/comments`);
      const postComments = response.data.filter(comment => comment.postId === postId);
      setComments(postComments);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <ListGroup >
        <ListGroup.Item className='p-2 text-muted'>
          {comments.length > 0 ? `댓글 수: ${comments.length}` : '댓글이 없습니다.'}
        </ListGroup.Item>
        {comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage).map((comment) => (
          <ListGroup.Item key={comment.id} className='p-0 list-item'>
            <Comment comment={comment} postId={postId} onCommentChange={fetchComments} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination className="justify-content-center mt-2">{items}</Pagination>
      <CommentForm postId={postId} onCommentSubmit={fetchComments} />
    </>
  );
}

export default CommentList;
