import { useContext } from 'react';
import { Container, Form, Button, Card  } from 'react-bootstrap';
import '../styles/SignInPage.css'
import useInput from '../hooks/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const SignInPage = () => {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const validateUserId = (userId) => /^[A-Za-z0-9]{6,12}$/.test(userId);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);

  const userId = useInput("", validateUserId);
  const password = useInput("", validatePassword);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userId: userId.value,
      password: password.value,
    };

    try {
      const usersResponse = await axios.get('http://localhost:3300/user');
      const users = usersResponse.data;
  
      const user = users.find((user) => user.userId === formData.userId && user.password === formData.password);
  
      if (user) {
        dispatch({ type: 'LOGIN', user });
        alert(`${user.nickname}님, 환영합니다.`);
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
  };


  return (
    <Container fluid className='p-0'>

      <div className="p-5 bg-image d-flex justify-content-center align-items-center position-relative login-image">
        <Card className='mx-5 mb-5 p-5 shadow-5 w-25 position-absolute login-container'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-4'>
              <Form.Label>아이디</Form.Label>
              <Form.Control 
                type="text" 
                {...userId}
                isInvalid={userId.error}
              />
              <Form.Control.Feedback type="invalid">아이디는 6~12자리의 영문자와 숫자로 구성해야 합니다.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control 
                type="password" 
                {...password}
                isInvalid={password.error}
              />
              <Form.Control.Feedback type="invalid">비밀번호는 8~16자리, 영문, 숫자 각각 1개 이상 포함해야 합니다.</Form.Control.Feedback>
            </Form.Group>

            <div>
              <span>아이디가 없다면? </span><a href="/signUp">회원가입</a>
            </div>

            <Button className="w-100 mb-4" variant="primary" type='submit'>로그인</Button>
          </Form>
        </Card>
      </div>
      
    </Container>
  )
}

export default SignInPage


    