import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/comments?postId=${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <>
      <ListGroup >
        <ListGroup.Item className='p-2 text-muted'>
          {comments.length > 0 ? `댓글 수: ${comments.length}` : '댓글이 없습니다.'}
        </ListGroup.Item>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id} className='p-0 list-item'>
            <Comment comment={comment} postId={postId} onCommentChange={fetchComments} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <CommentForm postId={postId} onCommentSubmit={fetchComments} />
    </>
  );
}

export default CommentList;