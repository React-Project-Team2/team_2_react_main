import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import '../styles/BoardInput.css'
import axios from 'axios';
import Quill from 'quill';


const BoardInput = () => {
  const navigate = useNavigate();

  useEffect(
    () => {

      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // 굵게, 기울이기, 밑줄, 가운데 줄
        ['blockquote'],                                   // 인용문

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],         // 내어쓰기 / 들여쓰기
        [{ 'direction': 'rtl' }],                         // 글 시작지점(좌, 우)

        [{ 'size': ['small', false, 'large', 'huge'] }],  // 글자크기
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // header, h태그

        [{ 'color': [] }, { 'background': [] }],          // 글자색, 글자배겨액
        [{ 'font': [] }],                                 // 폰트
        [{ 'align': [] }],                                // 정렬

        ['clean']                                         // 모든 서식 제거
      ];

      const quillOptions = {
        // debug: 'info',
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: '내용을 입력하세요',
        theme: 'snow'
      };

      new Quill('#editor', quillOptions);
    }
    , []
  );
  
  const checkForm = async () => {
    const category = document.querySelector('#category').value;
    const title = document.querySelector('#title').value;
    const nickName = document.querySelector('#nickName').value;
    const content = document.querySelector('#editor').firstChild.innerHTML;    

    let formData = {
      category: category,
      title: title,
      nickName: nickName,
      content : content
    }

    for (let key in formData) {
      if (formData[key] === '') return alert('입력창을 확인하세요');
    }

    try {
      const response = await axios.post('http://localhost:3300/posts', formData);

      if (response.status === 201) {
        alert('등록 완료');
        navigate('/board');
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <>
      <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />

      <div className='container-md board-insert-div' id='board-insert-div'>
        <Form className='input-form' >
          <Form.Group className='mb-3'>
            <Form.Label>카테고리</Form.Label>
            <Form.Select id='category' name='category' >
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
            <div className="text-editor ">
              <div id="toolbar"></div>
              <div id="editor" className="editor-textarea"></div>
            </div>
          </Form.Group>
        </Form>

        <div className='btn-div'>
          <Button variant="outline-warning">취소</Button>
          <Button variant="outline-secondary" onClick={checkForm}>등록하기</Button>
        </div>

      </div>
    </>
  );
}

export default BoardInput;