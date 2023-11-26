import React from 'react';
import { Card } from 'react-bootstrap';

const Comment = ({ comment }) => {
    return (
        <Card className='rounded-0'>
            <Card.Body>
                <Card.Text>
                    {comment.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comment;
