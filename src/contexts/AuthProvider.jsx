import { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';

const initialState = {
  isLogged: false, // 로그인 상태
  user: null, // 로그인한 사용자 정보
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { isLogged: true, user: action.user };
    case 'LOGOUT':
      return { isLogged: false, user: null };
    case 'RESTORE':
      return { isLogged: action.isLogged, user: action.user };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    if (user && isLogged) {
      dispatch({ type: 'RESTORE', user, isLogged });
    }
  }, []);

  useEffect(() => {
    if (state.isLogged) {
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('isLogged', JSON.stringify(state.isLogged));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLogged');
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
