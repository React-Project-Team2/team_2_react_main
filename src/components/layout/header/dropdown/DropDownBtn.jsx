import React from 'react'
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './DropDownBtn.css'

const DropDownBar = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      title="메뉴"
      align='end'
      variant='outline-secondary'
      className='dropdown'
      menuVariant='dark'
    >
      <Dropdown.Item eventKey="1" href='/'>Forum</Dropdown.Item>
      <Dropdown.Item eventKey="2" href='/about'>About</Dropdown.Item>
      <Dropdown.Item eventKey="3" href='/board'>게시판</Dropdown.Item>
      <Dropdown.Divider />
      {state.isLogged ? (
        <Dropdown.Item eventKey="4" onClick={handleLogout}>로그아웃</Dropdown.Item>
      ) : (
        <Dropdown.Item eventKey="4" href='/signIn'>로그인</Dropdown.Item>
      )}
    </DropdownButton>
  )
}

export default DropDownBar