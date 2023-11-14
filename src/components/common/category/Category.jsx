import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Image, Row } from 'react-bootstrap';

const Category = ({ img, name, detail, postCount }) => {
  return(
      <Row className='mt-4 mb-4'>
        <Col style={{ maxWidth : '150px'}}>
          <Image src={img} className="rounded" width={150} height={90} alt="" />
        </Col>
        <Col style={{ display: 'flex', flexDirection: 'column'}}>
          <h5>{name}</h5>
          <p>{detail}</p>
        </Col>
        <Col />
        <Col>
          <Image src='https://icons.veryicon.com/png/o/miscellaneous/template-four/new-post.png' className="img-fluid" width={25} height={25} alt="" />
          <p>{postCount}</p>
        </Col>
      </Row>
  )
}

export default Category;