// import { useState, useEffect, useContext } from 'react'
// import './index.css'
// import { Navbar, Nav, Container, Button } from 'react-bootstrap'
// import AuthContext from '../../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
    // <Navbar collapseOnSelect expand="lg" data-bs-theme="light" sticky="top" style={{ maxHeight: '9vh' }}>
    //     <Container className='d-flex'>
    //         <Navbar.Brand href="#">서비스 명</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse id="responsive-navbar-nav">
    //             <Nav className="ms-auto me-0 d-flex justify-content-between align-items-center" >
    //                 <Nav.Link href="/">
    //                   <Button variant="outline-secondary" style={{minWidth:'80px'}}>
    //                     Forum
    //                   </Button>
    //                 </Nav.Link>
    //                 <Nav.Link href="/about">
    //                   <Button variant="outline-secondary" style={{minWidth:'80px'}}>
    //                     About
    //                   </Button>
    //                 </Nav.Link>
    //                 <Nav.Link href="/board">
    //                   <Button variant="outline-secondary" style={{minWidth:'80px'}}>
    //                     게시판
    //                   </Button>
    //                 </Nav.Link>
    //                 {state.isLogged ? (
    //                   <Button variant="outline-secondary" onClick={handleLogout} style={{minWidth:'80px'}}>로그아웃</Button>
    //                 ) : (
    //                   <Nav.Link href="/signIn" >
    //                     <Button variant="outline-secondary" style={{minWidth:'80px'}}> 
    //                       로그인
    //                     </Button>
    //                   </Nav.Link>
    //                 )}
    //             </Nav>
    //         </Navbar.Collapse>
    //     </Container>
    // </Navbar>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header