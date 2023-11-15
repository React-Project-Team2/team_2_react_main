import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Category = ({ img, name, detail, postCount }) => {
  return(
    <Link to="/board" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Row className='p-3'>
        <Col style={{ maxWidth : '150px'}}>
          <Image src={img} className="rounded" width={150} height={90} alt="" />
        </Col>
        <Col style={{ maxWidth : '30px'}}/>
        <Col className="d-flex flex-column">
          <h5>{name}</h5>
          <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'break-all', lineHeight: '1.2' }}>{detail}</p>
        </Col>
        <Col style={{ maxWidth : '30px'}}/>
        <Col className='mt-4' style={{ fontWeight: 'bold', fontSize: '1.3em', maxWidth : '150px'}}>
          <Image src='https://icons.veryicon.com/png/o/miscellaneous/template-four/new-post.png' className="img-fluid me-2" width={25} height={25} alt="" />
          {postCount}
        </Col>
      </Row>
    </Link>
  )
}

export default Category;