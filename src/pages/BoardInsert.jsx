import React from 'react';
import { Form } from 'react-bootstrap'

const BoardInsert = () => {
  return (
    <>
      <div className='container-md board-insert-div' id='board-insert-div'>
        <Form >

          <Form.Group className='mb-3'>
            <Form.Label>카테고리</Form.Label>
            <Form.Select  >
              <option value="">선택하세요</option>
              <option value="후쿠오카">후쿠오카</option>
              <option value="나가사키">나가사키</option>
              <option value="구마모토">구마모토</option>
              <option value="유후인">유후인</option>
              <option value="사가">사가</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label htmlFor='nickName'>닉네임</Form.Label>
            <Form.Control type="text" name='nickName' id='nickName' value="닉네임" readOnly  />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label htmlFor='title'>제목</Form.Label>
            <Form.Control type='text' name="title" id='title' placeholder="제목을 입력하세요" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

        </Form>
      </div>

    </>
  );
}

export default BoardInsert;