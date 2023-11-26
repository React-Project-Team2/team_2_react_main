import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/CommentForm.css'

const CommentForm = ({ postId, onCommentSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3300/comments', {
                postId,
                text,
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