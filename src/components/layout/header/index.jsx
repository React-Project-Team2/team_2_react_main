import { useState, useEffect, useContext } from 'react'
import './index.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import AuthContext from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let currentPosition = window.scrollY;
      if (currentPosition > scrollPosition) {
        setIsAnimate(true);
      } else {
        setIsAnimate(false);
      }
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollPosition]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="light" sticky="top" style={{ height: '9vh' }}>
        <Container className='d-flex'>
            <Navbar.Brand href="#">서비스 명</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto d-flex justify-content-between align-items-center" style={{ width: "30%" }}>
                    <Nav.Link href="/">
                      <Button variant="outline-secondary">
                        Forum
                      </Button>
                    </Nav.Link>
                    <Nav.Link href="/about">
                      <Button variant="outline-secondary">
                        About
                      </Button>
                    </Nav.Link>
                    <Nav.Link href="/board">
                      <Button variant="outline-secondary">
                        게시판
                      </Button>
                    </Nav.Link>
                    {state.isLogged ? (
                      <Button variant="outline-secondary" onClick={handleLogout}>로그아웃</Button>
                    ) : (
                      <Nav.Link href="/signIn">
                        <Button variant="outline-secondary" >
                          로그인
                        </Button>
                      </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Header