import { useState, useEffect } from 'react'
import './index.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

const Header = () => {
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

  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="light" className={isAnimate ? 'animate' : ''} sticky="top">
        <Container className='d-flex'>
            <Navbar.Brand href="#">서비스 명</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto d-flex justify-content-between align-items-center" style={{ width: "30%" }}>
                    <Nav.Link href="/">Forum</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/board">게시판</Nav.Link>
                    <Nav.Link href="#">
                      <PersonCircle size={25} />
                    </Nav.Link>
                    <Nav.Link href="#">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Header