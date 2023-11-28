import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewPost = () => {
    return (
        <Col className='mx-5'>
            <Link to="/post/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h6><b>user_name</b></h6>
                <h8>create_at</h8>
                <h6><b>title</b></h6>
                <p style={{ overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-line', lineHeight: '1.2' }}>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
                <Image src='https://cdn.iconscout.com/icon/free/png-512/free-comment-2652894-2202811.png?f=webp&w=256' className="img-fluid me-2" width={15} height={15} alt="" />
                comment_count
            </Link>
        </Col>
    )
}


export default NewPost;