import { React, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap'
import ReactQuill from 'react-quill';
// import ImageResize from 'quill-image-resize';
// import 'react-quill/dist/quill.snow.css';
import ContainerNavbar from '../components/common/containNavbar/ContainerNav'
import '../styles/PostPage.css';

const PostPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const url = 'http://localhost:3300/posts';

  const { post_id } = useParams();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
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

    const showResult = async () => {
      const result = await showPost(post_id);
      setPostData(result);
      setCategory(result.category);
      setTitle(result.title);
      setNickname(result.nickname);
      setContent(result.content);

      console.log(result);
    }
    showResult();
  }, [post_id]);

  return (
    <>
      <div className='w-auto bg'>
        {/* 카테고리 컨테이너 */}
        <div className="bg-white text-dark container p-0 rounded-3">
          <ContainerNavbar />
          <Container>
            <Row>
              <Col xs={9}>
                  <div className='d-flex flex-column p-3'>
                    <div><span>{nickname}</span></div>
                    <div><span>{title}</span></div>
                    <div><span >{category}</span></div>
                    <ReactQuill
                      id='quill-editor'
                      modules={modules}
                      placeholder='내용을 입력하세요...'
                      value={content}
                    />
                  </div>
                  <div className='container'>
                    댓글
                  </div>
              </Col>
              <Col xs={3}>
                  side
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