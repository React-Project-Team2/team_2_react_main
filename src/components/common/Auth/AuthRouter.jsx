import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';

const AuthRouter = ({ children }) => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isLogged) {
      alert('로그인 후 이용해 주세요');
      navigate('/signIn');
    }
  }, [state, navigate]);

  return state.isLogged ? children : null;
}

export default AuthRouter;