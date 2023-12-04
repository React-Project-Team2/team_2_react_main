import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Eye } from 'react-bootstrap-icons';
import { Col, Container, Row } from 'react-bootstrap';
import '../../../styles/NewPost.css'


const NewPost = (props) => {
    return (
        <Container className='post-box'>
        <Link to={`/board/${props.post_id}`} className='link-style'>
            <Row className='title mb-2' >{props.title}</Row>
            <Row className='content'>{props.content}</Row>
            <Row>작성자 : {props.name}</Row>
            <Row>작성일 : {props.created_at}</Row>
            <Row>
                <Col className='mx-0'>{props.category}</Col>
                <Col/>
                <Col>
                    <div><Eye className='me-2' /><span>{props.views} views</span></div>
                </Col>
            </Row>
        </Link>
        </Container>
    )
}

export default NewPost;