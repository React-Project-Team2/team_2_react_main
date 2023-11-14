import { React, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import '../styles/BoardInput.css'

const BoardInput = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);

  const quillRef = useRef();
  const [content, setContent] = useState('');

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
    }
  }, []);

  console.log(content);
  
  // const checkForm = async () => {
  //   const category = document.querySelector('#category').value;
  //   const title = document.querySelector('#title').value;
  //   const nickName = document.querySelector('#nickName').value;
  //   // const contentHTML = document.querySelector('#editor').firstChild.innerHTML;   
  //   const content = quill.getContents();   
  //   // const images = document.querySelector('#images').files;

  //   let formData = {
  //     category: category,
  //     title: title,
  //     nickName: nickName,
  //     content : content
  //   }


  //   // console.log(contentHTML);
  //   console.log(content);
  //   console.log(formData);

  //   for (let key in formData) {
  //     if (formData[key] === '' || (key === 'content' && formData[key].ops[0]['insert'] === '\n')) return alert('입력창을 확인하세요');
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:3300/posts', formData);

  //     if (response.status === 201) {
  //       alert('등록 완료');
  //       navigate('/board');
  //     }
      
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }  

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
          <Button variant="outline-secondary" >등록하기</Button>
        </div>

      </div>
    </>
  );
}

export default BoardInput;