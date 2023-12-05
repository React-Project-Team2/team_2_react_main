import { Button, Container, Card, Row, Col, Form } from 'react-bootstrap';
import '../styles/SignUpPage.css';
import useInput from '../hooks/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const validateUserId = (userId) => /^[A-Za-z0-9]{6,12}$/.test(userId);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const passwordConfirm = useInput("", (value) => password.value === value);

  const userId = useInput("", validateUserId);
  const password = useInput("", validatePassword);
  const email = useInput("", validateEmail);
  const nickname = useInput("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      userId: userId.value,
      password: password.value,
      email: email.value,
      nickname: nickname.value,
    };
  
    try {
      const usersResponse = await axios.get('http://localhost:3300/user');
      const users = usersResponse.data;

      if (users.find((user) => user.userId === formData.userId)) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
      const response = await axios.post('http://localhost:3300/user', formData);
      
      if (response.status === 201) {
        alert(`${formData.userId}님, 회원가입 축하합니다. 다시 로그인해주세요.`);
        navigate('/signIn');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container fluid className='p-0'>
      <div className="p-5 bg-image register-image" />
      <div className='d-flex justify-content-center'>
        <Card className='mx-5 mb-5 p-5 shadow-5 register-container'>
          <Card.Body className='p-5 text-center'>
            <h2 className="fw-bold mb-5">지금 회원가입 하세요!</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm='6'>
                  <Form.Group className='mb-4'>
                    <Form.Control 
                      placeholder='아이디' 
                      {...userId}
                      isInvalid={userId.error}
                    />
                  <Form.Control.Feedback type="invalid">아이디는 6~12자리의 영문자와 숫자로 구성해야 합니다.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm='6'>
                  <Form.Group className='mb-4'>
                    <Form.Control placeholder='닉네임' {...nickname} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className='mb-4'>
                <Form.Control
                  placeholder='이메일'
                  type='email'
                  {...email}
                  isInvalid={email.error}
                />
                <Form.Control.Feedback type="invalid">올바른 이메일 형식을 입력해주세요.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-4'>
                <Form.Control 
                  placeholder='비밀번호' 
                  type='password'
                  {...password}
                  isInvalid={password.error}
                />
                <Form.Control.Feedback type="invalid">비밀번호는 8~16자리, 영문, 숫자로 구성해야 합니다.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-4'>
                <Form.Control 
                  placeholder='비밀번호 재입력'
                  type='Password'
                  {...passwordConfirm}
                  isInvalid={passwordConfirm.error}
                />
                <Form.Control.Feedback type="invalid">비밀번호가 일치하지 않습니다.</Form.Control.Feedback>
              </Form.Group>

              <Button className='w-100 mb-4' variant='primary' type='submit'>회원가입</Button>
            </Form>

          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default SignUpPage