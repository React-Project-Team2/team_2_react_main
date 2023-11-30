import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import { ListGroup, Pagination } from 'react-bootstrap';

const CommentList = ({ postId, onData, user }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const today = new Date();

  let month = today.getMonth() + 1;
  let day = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hours = hours < 10 ? '0' + hours : hours;   
  minutes = minutes < 10 ? '0' + minutes : minutes; 
  seconds = seconds < 10 ? '0' + seconds : seconds;

  let date = today.getFullYear() + '-' + month + "-" + day;
  let time = hours + ':' + minutes + ':' + seconds;
  let created_at = date + ' ' + time;

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/comments?postId=${postId}&_sort=created_at&_order=desc`);
      setComments(response.data);

      // 현재 페이지에 댓글이 없으면 이전 페이지로 이동
      if (response.data.length <= (currentPage - 1) * commentsPerPage) {
        setCurrentPage((prev) => prev - 1 || 1);
      }
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

  console.log(user)

  return (
    <>
      <CommentForm postId={postId} user={user} created_at={created_at} onCommentSubmit={fetchComments} />
      <ListGroup className='mt-3'>
        <ListGroup.Item className='p-2 text-muted'>
          {comments.length > 0 ? `댓글: ${comments.length}` : '댓글이 없습니다.'}
        </ListGroup.Item>
        {comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage).map((comment) => (
          <ListGroup.Item key={comment.id} className='p-0 list-item'>
            <Comment comment={comment} postId={postId} user={user} created_at={created_at} onCommentChange={fetchComments} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination className="justify-content-center mt-2">{items}</Pagination>
    </>
  );
}

export default CommentList;
