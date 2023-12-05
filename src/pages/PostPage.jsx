import { React, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Eye, ChatRight } from 'react-bootstrap-icons';
import ReactQuill from 'react-quill';
import axios from 'axios';

import '../styles/PostPage.css';
import CommentList from '../components/CommentList';
import ConfirmModal from '../components/common/modals/ConfirmModal';
import { configureAWS, deleteImages, extractionValue } from '../components/common/aws/awsServices';

const PostPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const url = 'http://localhost:3300/';

  const { post_id } = useParams();
  const { category_name } = useParams();
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  console.log(category_name);

  useEffect(() => {
    configureAWS();
  }, []);

  const modules = useMemo(() => {
    return {
      toolbar: false
    }
  }, []);

  useEffect(() => {
    // DB에서 post 불러오기 : Read
    const showPost = async (id) => {
      try {
        const response = await fetch(url + 'posts/' + id);
        const data = await response.json();
        setPostData(data);

        // 조회 이력
        const viewedPost = localStorage.getItem('viewedPosts');
        // // 조회 이력이 없으면 빈 배열 생성
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

    // 조회수 증가
    const updateViews = async (v) => {
      let updateData = { views: v + 1 }
      try {
        const response = await axios.patch(url + 'posts/' + post_id, updateData);
        const list = response.data;
        setPostData(list);
      } catch (error) {
        console.log(error.message);
      }
    }

    showPost(post_id);

    document.querySelector('.ql-container').style.border = 'none';
  }, [post_id]);

  // ConfirmModal 결과
  const flagResult = (flag) => {
    if (flag) {
      // 사용자가 확인 버튼을 클릭했을 때 게시글 삭제 동작 수행
      deletePost(post_id);

      const viewedPost = localStorage.getItem('viewedPosts');
      let viewedPostsArray = JSON.parse(viewedPost);
      let updateViewedPostsArray = viewedPostsArray.filter((element) => element !== post_id);
      localStorage.setItem('viewedPosts', JSON.stringify(updateViewedPostsArray));

      navigate('/board/' + category_name);
    } else {
      // 사용자가 취소 버튼을 클릭했을 때 모달 닫기
      setShowModal(false);
    }
  }

  // 게시글 삭제
  const deletePost = async (id) => {
    setShowModal(false);
    try {
      deleteComments(comments);
      deleteImages(extractionValue(postData.content, user.userId), new Set(), 'delete', 'images');
      const response = await axios.delete(url + 'posts/' + id);
      console.log(response);
      if (response.status === 200) {
        alert('삭제 완료');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // CommentList에서 Comments 받기
  const getCommentList = (data) => {
    if (data) {
      setComments(data);
    }
  }

  // 댓글 삭제
  const deleteComments = async (data) => {
    try {
      for (let comment of data) {
        await axios.delete(url + 'comments/' + comment.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className='w-auto bg'>
        <Container className='bg-light text-dark container  rounded-3'>
          <div className='d-flex w-100' style={{ padding: '24px 15px' }}>
            <div className='fs-2 fw-bolder'><span >{postData.title}</span></div>
          </div>
          <Row>
            <Col xs={9}>
              <div className='d-flex flex-column mb-5'>
                <Row className='d-flex mb-4' style={{ paddingLeft: '15px' }}>
                  <Col>
                    <div className='fs-6 fw-lighter text-body-secondary'><span>{postData.category}</span></div>
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
                <CommentList postId={post_id} onData={getCommentList} user={user} />
              </div>
            </Col>
            {/* 사이드 */}
            <Col xs={3} className='px-4'>
              <div className='d-flex flex-column justify-content-end mb-2' >
                <div><span className='fs-6 fw-lighter text-body-secondary' >{postData.nickname}</span></div>
                <div><span className='fs-6 fw-lighter text-body-secondary'>{postData.created_at}</span></div>
              </div>
              <div className='mb-4'>
                <div className='mb-3'><Eye className='me-2' /><span>{postData.views} views</span></div>
                <div className='mb-3'><ChatRight className='me-2' /><span>{comments.length} comments</span></div>
              </div>
              <div className='d-md-flex flex-column'>
                <Button className='mb-2' variant="outline-warning" onClick={() => navigate('/board')} >돌아가기</Button>
                {
                  (user !== null && user.id === postData.user_id) ? <>
                    <Button className='mb-2' variant="outline-secondary" onClick={() => navigate('/board/' + category_name + '/update/' + post_id)} >수정하기</Button>
                    <Button variant="outline-danger" onClick={() => setShowModal(true)}  >삭제하기</Button>
                  </> : ''
                }
                {
                  showModal && <ConfirmModal onFlag={flagResult} title='경고창' show={true} text="정말 삭제하시겠습니까?" />
                }
              </div>
            </Col>
          </Row>
        </Container>
        <div className='pt-5'>
        </div>
      </div>
    </>
  );
}

export default PostPage;