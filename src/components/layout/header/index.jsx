import { useContext } from 'react'
import './index.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import AuthContext from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DropDownBtn from './dropdown/DropDownBtn';

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect sticky="top">
        <Container className='d-flex'>
            <Navbar.Brand href="#">서비스 명</Navbar.Brand>
                <Nav className="ms-auto d-flex justify-content-between align-items-center">
                    <Nav.Link href="/">
                      <Button variant="outline-secondary" className='nav-btn'>
                        Forum
                      </Button>
                    </Nav.Link>
                    <Nav.Link href="/about">
                      <Button variant="outline-secondary" className='nav-btn'>
                        About
                      </Button>
                    </Nav.Link>
                    <Nav.Link href="/board">
                      <Button variant="outline-secondary" className='nav-btn'>
                        게시판
                      </Button>
                    </Nav.Link>
                    {state.isLogged ? (
                      <Nav.Link>
                        <Button variant="outline-secondary" className='nav-btn' onClick={handleLogout}>로그아웃</Button>
                      </Nav.Link>
                    ) : (
                      <Nav.Link href="/signIn">
                        <Button variant="outline-secondary" className='nav-btn'>
                          로그인
                        </Button>
                      </Nav.Link>
                    )}
                </Nav>
                <DropDownBtn />
        </Container>
    </Navbar>
  );
};

export default Header