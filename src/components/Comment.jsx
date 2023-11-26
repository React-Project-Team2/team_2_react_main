import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import '../styles/Comment.css'

const Comment = ({ comment, postId, onCommentChange }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.text);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3300/comments/${comment.id}`);
            onCommentChange();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3300/comments/${comment.id}`, { postId: postId, text: editedComment });
            setIsEdit(false);
            onCommentChange();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className='rounded-0'>
            <Card.Body>
                {isEdit ? (
                    <Form.Group className='edit-container'>
                        <Form.Control as='textarea' value={editedComment} onChange={e => setEditedComment(e.target.value)} />
                        <Button variant='success' onClick={handleSave}>저장</Button>
                    </Form.Group>
                ) : (
                    <div className='comment-container'>
                        <Card.Text>{comment.text}</Card.Text>
                        <div className='button-group'>
                            <Button variant='warning' onClick={handleEdit}>수정</Button>
                            <Button variant='danger' onClick={handleDelete}>삭제</Button>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Comment;