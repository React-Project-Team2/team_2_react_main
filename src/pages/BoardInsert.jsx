import React from 'react';
import Form from 'react-bootstrap'

const BoardInsert = () => {
  return (
    <div className='container-md' id='board-insert-div'>
      <Form >

        <Form.Select aria-label="Default select example">
          <option value="no">카테고리</option>
          <option value="후쿠오카">후쿠오카</option>
          <option value="나가사키">나가사키</option>
          <option value="구마모토">구마모토</option>
          <option value="유후인">유후인</option>
          <option value="사가">사가</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="nickName" defaultValue="닉네임" readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="title" placeholder="제목을 입력하세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

      </Form>
    </div>
  );
}

export default BoardInsert;