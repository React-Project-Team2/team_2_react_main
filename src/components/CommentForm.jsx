import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../styles/CommentForm.css'

const CommentForm = ({ postId, user, onCommentSubmit }) => {
    let userId = 'abcd';
    if (user !== null) userId = user.userId;

    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3300/comments', {
                postId,
                userId,
                text,
                // created_at, // 생성일자
            });
            setText('');
            onCommentSubmit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='mt-3 comment-form-group'>
            <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='comment-form-input'
            />
            <Button type="submit" className='ms-3'>
                댓글 작성
            </Button>
        </Form>
    );
};

export default CommentForm;