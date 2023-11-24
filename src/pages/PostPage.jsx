import { React, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Eye } from 'react-bootstrap-icons';
import ReactQuill from 'react-quill';
// import ImageResize from 'quill-image-resize';
// import 'react-quill/dist/quill.snow.css';
import ContainerNavbar from '../components/common/containNavbar/ContainerNav'
import '../styles/PostPage.css';
import axios from 'axios';

const PostPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const url = 'http://localhost:3300/posts';

  const { post_id } = useParams();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [views, setViews] = useState('');
  const [commentsCount, setCommentsCount] = useState('');
  const [postData, setPostData] = useState(null);

  const modules = useMemo(() => {
    return {
      toolbar: false
    }
  }, []);

  
  useEffect(() => {
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

    const updateViews = async (v) => {
      let updateData = { views: v }
      console.log(updateData);
      try {
        const response = await axios.patch(url + '/' + post_id, updateData);
        const list = response.data;
        console.log(list);
        setViews(list.views + 1);
        setPostData(list);  
      } catch (error) {
        console.log(error.message);
      }
    }

    const showResult = async () => {
      const result = await showPost(post_id);
      setCategory(result.category);
      setTitle(result.title);
      setNickname(result.nickname);
      setContent(result.content);
      setCreatedAt(result.created_at);

      // 조회수 수정
      updateViews(result.views + 1);

    }
    showResult();
    document.querySelector('.ql-container').style.border = 'none';
  }, [post_id]);


  return (
    <>
      <div className='w-auto bg'>
        {/* 카테고리 컨테이너 */}
        <div className="bg-white text-dark container p-0 rounded-3">
          <ContainerNavbar />
          <Container className='bg-light'>
            {/* 게시글 */}
            <Row>
              <Col xs={9}>
                <div className='d-flex flex-column'>
                  <Row className='d-flex mb-4'>
                    <Col xs={9} >
                      <div className='fs-3 fw-bolder'><span>{title}</span></div>
                      <div className='fs-6 fw-lighter text-body-secondary'><span>{category}</span></div>
                    </Col>
                    <Col xs={3} className='d-flex flex-column justify-content-end' >
                      <div><span className='fs-6 fw-lighter text-body-secondary' >{nickname}</span></div>
                      <div><span className='fs-6 fw-lighter text-body-secondary'>{createdAt}</span></div>
                    </Col>
                  </Row>
                  <ReactQuill
                    id='quill-editor'
                    modules={modules}
                    placeholder='내용을 입력하세요...'
                    value={content}
                    readOnly
                  />
                </div>
                <div className='container'>
                  댓글
                </div>
              </Col>
              {/* 사이드 */}
              <Col xs={3}>
                <div>
                  <div><Eye /><span>{ views }</span></div>
                </div>
              </Col>
            </Row>

            <div className='d-md-flex justify-content-end'>
              <Button variant="outline-warning" onClick={() => navigate('/board')} >돌아가기</Button>
              <Button className='ms-3' variant="outline-secondary" onClick={() => navigate('/board/update/' + post_id)} >수정하기</Button>
            </div>
          </Container>
        </div>
        <div className='pt-5'>
        </div>
      </div>
    </>
  );
}

export default PostPage;