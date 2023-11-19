import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const PostComponent = () => {
  return (
    <Container className='border-bottom'>
      <Card className='border-0'>
        <Card.Body>
          <Row>
            <Col><Card.Title>제목</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet.
              </Card.Text>
            </Col>
            <Col>
              <div className="d-flex justify-content-end mr-3 pt-3"> 
                <div >
                  <img src="조회수 이미지 경로" alt="조회수 : " />
                  5
                </div>
                <div>
                  <img src="댓글 이미지 경로" alt="댓글 : " />
                  4
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostComponent;
