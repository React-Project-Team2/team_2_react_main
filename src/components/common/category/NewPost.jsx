import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Eye } from 'react-bootstrap-icons';

const NewPost = (props) => {
    return (
        <Col className='mx-5 pb-2'>
            <Link to={`/board/${props.post_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h5><b>{props.title}</b></h5>
                <p style={{ overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-line', lineHeight: '1.2' }}>{props.content}</p>
                <p><b>{props.name}</b>  {props.created_at}</p>
                <i class="bi bi-chat-right"><Eye/>  {props.view}</i>
                
            </Link>
        </Col>
    )
}

export default NewPost;