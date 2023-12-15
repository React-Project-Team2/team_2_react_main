import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/About.css';
import { configureAWS, getImageUrl, deleteImages } from '../components/common/aws/awsServices';

const AboutPageUpdate = () => {
  const navigate = useNavigate();
  const [introduction, setIntroduction] = useState('');
  const [advantages, setAdvantages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const apiUrl = 'http://localhost:3300/about/3';

  useEffect(() => {
    configureAWS();
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);

        if (!response.data || response.data.introduction === undefined) {
          console.error('Invalid response data:', response.data);
          return;
        }

        const data = response.data;

        setIntroduction(data.introduction);
        setAdvantages([...data.advantages]);
        setImages([...data.images]);

        let imgList = data.images.map((item) => {
          const uidPart = item.match(/_uid_([^_]+)_/);
          return uidPart ? 'about/admin_uid_' + uidPart[1] + '.jpg' : null;
        }).filter(Boolean); // falsy값 제거    

        console.log(imgList);
        setImageList([...imgList]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // 소개 내용 변경
  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  // 장점 변경 
  const handleAdvantageChange = (index, event) => {
    const newAdvantages = [...advantages];
    newAdvantages[index] = event.target.value;
    setAdvantages(newAdvantages);
  };

  // 저장 버튼
  // 폼 제출
  const handleSubmit = async (event) => {
    event.preventDefault();
  

    // 업로드되지 않은 이미지 필터링
    const uploadedImages = images.filter((image) => image);
    deleteImages(uploadedImages, new Set(), 'others', 'images');
    
    const updatedData = {
      introduction,
      advantages,
      images: uploadedImages,
    };
  
    try {
      await axios.put(apiUrl, updatedData);
      navigate('/about');
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

const handleCancel = async (event) => {
  event.preventDefault();


}

  // 장점 삭제 버튼 컴포넌트
  const RemoveButton = ({ onClick, index }) => (
    <Button
      variant="danger"
      className="ml-2"
      onClick={() => onClick(index)}
      size="sm"
      style={{ marginBottom: '10px', marginRight: '5px' }}
    >
      삭제
    </Button>
  );

  // 장점 추가
  const handleAddAdvantage = () => {
    setAdvantages([...advantages, '']);
  };

  // 장점 삭제
  const handleRemoveAdvantage = (index) => {
    const newAdvantages = [...advantages];
    newAdvantages.splice(index, 1);
    setAdvantages(newAdvantages);
  };

  // 이미지 추가
  const handleAddImage = () => {
    setImages([...images, '']);
  };

  // 이미지 삭제
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleFileInputChange = async (index, event) => {
    try {
      const file = event.target.files[0];
  
      if (!file) {
        // 파일이 없는 경우 예외 처리 또는 사용자에게 메시지 표시
        throw new Error('파일을 선택해주세요.');
      }
  
      const formData = new FormData();
      formData.append('image', file);
  
      // 이미지 업로드 & URL & 키 이름 가져오기
      const { imageURL, keyName } = await getImageUrl(formData, 'admin', 'about');
  
      if (!imageURL || !keyName) {
        // 이미지 URL 또는 키 이름이 없는 경우 예외 처리 또는 사용자에게 메시지 표시
        throw new Error('이미지 업로드에 실패했습니다.');
      }
  
      // 새로운 이미지 배열 및 키 이름 배열 생성
      const newImages = [...images];
      const newKeyNames = [...imageList];
  
      // 해당 인덱스의 이미지 및 키 이름 업데이트
      newImages[index] = imageURL;
      newKeyNames[index] = keyName;
  
      // 상태 업데이트
      setImages(newImages);
      setImageList(newKeyNames);

      // 비동기 작업 완료 후에 이미지 상태를 콘솔에 로그
      console.log(newImages);
    } catch (error) {
      // 에러 메시지를 사용자에게 표시하거나 알림을 통해 알리기
      console.error('이미지 업로드 오류:', error.message);
    }
  };

  return (
    <Card body className="about">
      <Row>
        <Col>
          <h2 className="text-center font-weight-bold">영진전문대학 현지학기제란?</h2>
          <Form.Group controlId="introduction">
            <Form.Control as="textarea" rows={6} value={introduction} onChange={handleIntroductionChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center font-weight-bold m-3">영진전문대학 현지학기제 장점</h2>
          {advantages.map((advantage, index) => (
            <Form.Group controlId={`advantage${index}`} key={index}>
              <Form.Label>장점 {index + 1}</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={advantage}
                  onChange={(event) => handleAdvantageChange(index, event)}
                  size="sm"
                  style={{ marginBottom: '10px', marginRight: '5px' }}
                />
                <RemoveButton onClick={handleRemoveAdvantage} index={index} />
              </div>
            </Form.Group>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddAdvantage}
            style={{ marginBottom: '10px', marginRight: '10px', width: '95px' }}
          >
            장점 추가
          </Button>
        </Col>
      </Row>
      <Row className="image">
        <Col>
          <div className="image-container">
            {images.map((image, index) => {
              const uid = image.split('_uid_')[1];
              const displayedImageUrl = `about/admin_uid_${uid}`;

              return (
                <div className="image-wrapper" key={index}>
                  <Form.Group controlId={`image${index}`}>
                    <Form.Label>이미지 {index + 1}</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="file"
                        accept=".jpg"
                        onChange={(event) => handleFileInputChange(index, event)}           
                        size="sm"
                        style={{ marginBottom: '10px', marginRight: '5px' }}
                      />
                      <RemoveButton onClick={handleRemoveImage} index={index} />
                    </div>
                    {image && <p>선택된 파일: {displayedImageUrl}</p>}
                  </Form.Group>
                </div>
              );
            })}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddImage}
            style={{ marginBottom: '10px', marginRight: '10px', width: '95px' }}
          >
            이미지 추가
          </Button>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col lg="9"/>
        <Col>
          <Button className='mx-3' variant="primary" size="md" onClick={handleSubmit}>
            저장
          </Button>
          <Button variant="primary" size="md" href='/About'>
            취소
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default AboutPageUpdate;
