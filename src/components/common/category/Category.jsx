import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FileEarmark } from 'react-bootstrap-icons';

const Category = ({ img, name, detail, postCount, category }) => {
  return(
    <Link to={`/board/${category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Row className='p-3'>
        <Col style={{ maxWidth : '150px'}}>
          <Image src={img} className="rounded" width={150} height={90} alt="" />
        </Col>
        <Col style={{ maxWidth : '30px'}}/>
        <Col className="d-flex flex-column">
          <h5>{name}</h5>
          <p style={{ overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-line', lineHeight: '1.2'}} className='font-italic'>{detail}</p>
        </Col>
        <Col style={{ maxWidth : '30px'}}/>
        <Col className='mt-4' style={{ fontSize: '1.2em', maxWidth : '150px'}}>
          <FileEarmark/> {postCount}
        </Col>
      </Row>
    </Link>
  )
}

export default Category;