import React from 'react'
import { Container, Form, Button, Card  } from 'react-bootstrap';
import '../styles/SignInPage.css'


const SignInPage = () => {
  return (
    <Container fluid className='p-0'>

      <div className="p-5 bg-image d-flex justify-content-center align-items-center position-relative login-image">
        <Card className='mx-5 mb-5 p-5 shadow-5 w-25 position-absolute login-container'>
            <Form.Group className='mb-4'>
              <Form.Label>아이디</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <div>
            <span>아이디가 없다면? </span><a href="/signUp">회원가입</a>
            </div>

            <Button className="mb-4" variant="primary">로그인</Button>
        </Card>
      
      </div>
      
    </Container>
  )
}

export default SignInPage


    