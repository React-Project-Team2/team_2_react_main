import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRouter = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용해 주세요');
      navigate('/signIn');
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default AuthRouter;