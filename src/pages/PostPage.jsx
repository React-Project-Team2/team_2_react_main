import { React, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Eye } from 'react-bootstrap-icons';
import ReactQuill from 'react-quill';
import axios from 'axios';
// import ImageResize from 'quill-image-resize';
// import 'react-quill/dist/quill.snow.css';
import ContainerNavbar from '../components/common/containNavbar/ContainerNav'
import '../styles/PostPage.css';
import CommentList from '../components/CommentList';
import ConfirmModal from '../components/common/modals/ConfirmModal';

const PostPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const url = 'http://localhost:3300/posts';

  const { post_id } = useParams();
  // const [views, setViews] = useState('');
  const [commentsCount, setCommentsCount] = useState('');
  const [postData, setPostData] = useState({});
  const [showModal, setShowModal] = useState(false);


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
        setPostData(data);

        // 조회 이력
        const viewedPost = localStorage.getItem('viewedPosts');
        // 조회 이력이 없으면 빈 배열 생성
        let viewedPostsArray = viewedPost ? JSON.parse(viewedPost) : [];
        // post_id가 없으면
        if (!viewedPostsArray.includes(post_id)) {
          // 조회수 수정
          await updateViews(data.views);
          // post_id 배열에 넣기
          viewedPostsArray.push(post_id);
          // localStorage에 viewedPosts로 생성
          localStorage.setItem('viewedPosts', JSON.stringify(viewedPostsArray));
        } 

      } catch (error) {
        console.log(error.message);
      }
    }

    const updateViews = async (v) => {
      let updateData = { views: v + 1 }
      try {
        const response = await axios.patch(url + '/' + post_id, updateData);
        const list = response.data;
        setPostData(list);  
      } catch (error) {
        console.log(error.message);
      }
    }

    showPost(post_id);

    document.querySelector('.ql-container').style.border = 'none';
  }, [post_id]);

  const flagResult = (flag) => {
    if (flag) {
      // 사용자가 확인 버튼을 클릭했을 때 게시글 삭제 등의 동작 수행
    } else {
      // 사용자가 취소 버튼을 클릭했을 때 모달 닫기
      setShowModal(false);
    }
  }

  const deletePost = (id) => {
    setShowModal(true);

  }

  console.log(postData);

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
                      <div className='fs-3 fw-bolder'><span>{postData.title}</span></div>
                      <div className='fs-6 fw-lighter text-body-secondary'><span>{postData.category}</span></div>
                    </Col>
                    <Col xs={3} className='d-flex flex-column justify-content-end' >
                      <div><span className='fs-6 fw-lighter text-body-secondary' >{postData.nickname}</span></div>
                      <div><span className='fs-6 fw-lighter text-body-secondary'>{postData.created_at}</span></div>
                    </Col>
                  </Row>
                  <ReactQuill
                    id='quill-editor'
                    modules={modules}
                    placeholder='내용을 입력하세요...'
                    value={postData.content}
                    readOnly
                  />
                </div>
                  <div className='container'>
                    <CommentList postId={post_id} />
                  </div>
              </Col>
              {/* 사이드 */}
              <Col xs={3}>
                <div>
                  <div><Eye /><span>{ postData.views }</span></div>
                </div>
                <div className='d-md-flex flex-column'>
                  <Button className='mb-2' variant="outline-warning" onClick={() => navigate('/board')} >돌아가기</Button>
                  {
                    user.id === postData.user_id ? <>
                      <Button className='mb-2' variant="outline-secondary" onClick={() => navigate('/board/update/' + post_id)} >수정하기</Button>
                      <Button variant="outline-danger" onClick={() => { deletePost(post_id) } }  >삭제하기</Button>
                    </> : ''
                  }
                  {
                    showModal && <ConfirmModal onFlag={flagResult} text="정말 삭제하시겠습니까?" />
                  }
                </div>
              </Col>
            </Row>

          </Container>
        </div>
        <div className='pt-5'>
        </div>
      </div>
    </>
  );
}

export default PostPage;