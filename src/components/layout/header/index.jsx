import React from 'react'
import './index.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="light">
        <Container className='d-flex'>
            <Navbar.Brand href="#">서비스 명</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto d-flex justify-content-between align-items-center" style={{ width: "30%" }}>
                    <Nav.Link href="/">Forum</Nav.Link>
                    <Nav.Link href="/board">게시판</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
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