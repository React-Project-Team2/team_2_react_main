import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

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
        <Form onSubmit={handleSubmit} className='mt-3'>
            <Form.Group as={Row}>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Col>
                <Col sm={2} className="text-right">
                    <Button type="submit">
                        댓글 작성
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default CommentForm;