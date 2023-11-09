import React from 'react'
import { Button, Container, Card, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  return (
    <Container fluid className='p-0'>
      <div className="p-5 bg-image register-image"></div>

      <div className='d-flex justify-content-center'>
        <Card className='mx-5 mb-5 p-5 shadow-5 w-50 register-container'>
          <Card.Body className='p-5 text-center'>

            <h2 className="fw-bold mb-5">지금 회원가입 하세요!</h2>

            <Row>
              <Col sm='6'>
                <InputGroup className='mb-4'>
                  <FormControl placeholder='아이디' />
                </InputGroup>
              </Col>

              <Col sm='6'>
                <InputGroup className='mb-4'>
                  <FormControl placeholder='닉네임' />
                </InputGroup>
              </Col>
            </Row>

            <InputGroup className='mb-4'>
              <FormControl placeholder='이메일' type='email'/>
            </InputGroup>

            <InputGroup className='mb-4'>
              <FormControl placeholder='비밀번호' type='password'/>
            </InputGroup>

            <InputGroup className='mb-4'>
              <FormControl placeholder='비밀번호 재입력' type='rePassword'/>
            </InputGroup>

            <div className='d-flex justify-content-center mb-4'>
              <Form.Check type="checkbox" label="정보 수집에 동의합니다." />
            </div>

            <Button className='w-100 mb-4' variant='primary'>회원가입</Button>

          </Card.Body>
        </Card>
      </div>
      

    </Container>
  )
}

export default SignUpPage