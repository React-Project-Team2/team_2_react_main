import { React, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';
import '../styles/BoardInput.css'

Quill.register('modules/ImageResize', ImageResize);

const BoardInput = ({ page }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const quillRef = useRef();
  const [content, setContent] = useState('');

  // quill 툴바
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
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
          ['link', 'image'],
          ['clean'] 
        ], 
      },
      // handlers: { image: imageHandler },
      ImageResize: {
        parchment: Quill.import('parchment')
      },
    }
  }, []);

  // 입력확인 및 저장 (나눌 필요성이 있다)
  const checkForm = async () => {
    const category = document.querySelector('#category').value;
    const title = document.querySelector('#title').value;
    const quillContent = quillRef.current.getEditor().editor.delta.ops;

    let formData = {
      user_id : user.id,
      nickname: user.nickname,
      category: category,
      title: title,
      content: quillContent,
    }

    // console.log(content);
    console.log(quillContent);
    console.log(formData);

    for (let key in formData) {
      if (formData[key] === '' || (key === 'content' && formData[key][0]['insert'] === '\n')) return alert('입력창을 확인하세요');
    }

    // 추후에 이미지를 AWS S3에 저장할 수 있도록 만들기
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
      <div className='container-md board-insert-div' id='board-insert-div'>
        <Form className='input-form' >
          <Form.Group className='mb-3'>
            <Form.Label>카테고리</Form.Label>
            <Form.Select id='category' name='category' >
              <option value="">선택하세요</option>
              <option value="후쿠오카">후쿠오카</option>
              <option value="나가사키">나가사키</option>
              <option value="구마모토">구마모토</option>
              <option value="오이타">오이타</option>
              <option value="사가">사가</option>
            </Form.Select>
          </Form.Group>
        
          <Form.Group className="mb-3" >
            <Form.Label htmlFor='title'>제목</Form.Label>
            <Form.Control type='text' name="title" id='title' placeholder="제목을 입력하세요" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>내용</Form.Label>
            <div>
              <ReactQuill
                id='quill-editor'
                modules={modules}
                placeholder='내용을 입력하세요...'
                theme='snow'
                ref={quillRef}
                value={content}
                onChange={setContent}
              />
            </div>
          </Form.Group>
        </Form>

        <div className='btn-div'>
          <Button variant="outline-warning">취소</Button>
          <Button variant="outline-secondary" onClick={checkForm} >등록하기</Button>
        </div>

      </div>
    </>
  );
}

export default BoardInput;