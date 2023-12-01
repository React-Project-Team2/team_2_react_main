import { React, useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';
import '../styles/BoardInput.css'

// 이미지 크기조절
Quill.register('modules/ImageResize', ImageResize);

const BoardInput = ({ page }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const url = 'http://localhost:3300/posts';

  const quillRef = useRef();
  const { post_id } = useParams();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [postData, setPostData] = useState({});

  const today = new Date();

  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 2자리보다 짧으면 0을 붙인다
  const day = today.getDate().toString().padStart(2, '0');
  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');

  const date = `${today.getFullYear()}-${month}-${day}`;
  const time = `${hours}:${minutes}:${seconds}`;

  const checkUser = () => {
    if (user === null) {
      alert('로그인 후 이용가능 합니다.')
      navigate('/signIn');
    }
  }

  checkUser();

  //  추후에 이미지를 AWS S3에 저장할 수 있도록 만들기
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

  // DB에서 post 불러오기 : Read
  const showPost = async (id) => {
    try {
      const response = await fetch(url + '/' + id);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (page === 'update') {
      const fetchData = async () => {
        const result = await showPost(post_id);

        setCategory(result.category);
        setTitle(result.title);
        setContent(result.content);

        setPostData(result)
      };
      fetchData();

      // 사용자 정보 확인
    }
  }, [page, post_id]);

  // DB에 저장 : Create
  const createPost = async (formData) => {

    try {
      const response = await axios.post(url, formData);

      if (response.status === 201) {
        alert('등록 완료');
        navigate('/board');
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  // DB post 수정 : Update
  const updatePost = async (formData) => {
    try {
      const response = await axios.patch(url + '/' + post_id, formData);
      if (response.status === 200) {
        alert('수정 완료');
        navigate('/board');
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  // 입력확인
  const checkForm = () => {
    const quillContent = quillRef.current.getEditor().editor.delta.ops;
    // const quillContent = quillRef.current.value;

    let formData = {
      category: category,
      title: title,
      content: quillContent,
    }

    for (let key in formData) {
      if (formData[key] === '' || (key === 'content' && formData[key][0]['insert'] === '\n')) return alert('입력창을 확인하세요');
    }

    for (let key in formData) {
      if (formData[key] === '') return alert('입력창을 확인하세요');
    }

    if (page === 'create') {
      let addData = {
        user_id: user.id,
        nickname: user.nickname,
        views: 0,
        created_at: date + ' ' + time,
      }
      formData = { ...formData, ...addData };
      createPost(formData);

    } else if (page === 'update') {
      updatePost(formData);
    }
  }

  const cancelEv = () => {
    if (page === 'create') {
      navigate('/board');
    } else if (page === 'update') {
      navigate('/board/' + post_id);
    }
  }

  return (
    <>
      <div className='container-md py-3' id='board-insert-div'>
        <Form className='input-form' >
          <Form.Group className='mb-3'>
            <Form.Label>카테고리</Form.Label>
            <Form.Select className='w-25' id='category' name='category' value={category} onChange={event => setCategory(event.target.value)} >
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
            <Form.Control type='text' name="title" id='title' placeholder="제목을 입력하세요" value={title} onChange={event => setTitle(event.target.value)} />
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

        <div className='d-md-flex justify-content-end'>
          <Button variant="outline-warning" onClick={cancelEv}>취소</Button>
          <Button className='ms-3' variant="outline-secondary" onClick={checkForm} >저장하기</Button>
        </div>

      </div>
    </>
  );
}

export default BoardInput;