import React, { useState } from 'react';
import '../styles/About.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image1 from '../AboutPageImages/1.jpg';
import image2 from '../AboutPageImages/2.jpg';
import image3 from '../AboutPageImages/3.jpg';
import image4 from '../AboutPageImages/4.jpg';
import image5 from '../AboutPageImages/5.jpg';
import image6 from '../AboutPageImages/6.jpg';

const AboutPage = () => {
  const [editMode, setEditMode] = useState(false);

  const [introduce, setIntroduce] = useState(
    '영진전문대학의 현지학기제는 방학동안 일본IT과 2학년 학생들을 대상으로 일본 후쿠오카현에서 진행하며 약 한 달의 기간동안 일본 현지에서 일본어를 배우고, 접하고, 사용할 수 있도록 하고 그 밖에도 진로와 관련된 여러 기업 방문이나 설명회 등을 들을 수 있는 기회를 제공합니다. 비행기나 숙소는 물론이고 많은 부분에서 적극적으로 지원을 해주기 때문에 학과 학생들의 부담을 최소화하여 일본에서의 공부와 경험에 집중할 수 있도록 해줍니다. 오전수업 → 점심시간 → 오후수업 → 자유시간의 순으로 하루 일과를 보내고 주말이나 휴일에는 사전에 짜여진 조의 구성원들이 함께 다양한 경험을 하도록 권장하여 그에 대한 교통비나 기차표 등도 지원을 받습니다. 그렇기 때문에 후쿠오카현뿐만 아니라 규슈 지역 전체를 둘러볼 수 있을 정도로 많은 경험을 자유롭게 쌓을 수 있는 (가서 직접 보고 듣고 느끼는) 현지 학기제 입니다.'
  );  

  const [advantages, setAdvantages] = useState([
    '일본 현지 어학원에서의 교습',
    '비행기, 숙소, 교통비, 조별 활동 등의 폭넓은 지원',
    '북 규슈 지방 레일이 자유롭게 사용가능한 레일패스',
    '조별 활동 성과에 따른 상여금 지급',
    '다양한 기업의 현장 방문과 설명회 기회 제공',
    '일본에서 취업 후 활약 중인 선배들과의 만남',
    '일본 대학의 대학생들과의 교류 기회 제공',
    '학생들을 위한 회식 제공',
  ]);

  const [images, setImages] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
  ]);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const introductionEdit = (e) => {
    setIntroduce(e.target.value);
  };

  const advantagesEdit = (index, value) => {
    const newAdvantages = [...advantages];
    newAdvantages[index] = value;
    setAdvantages(newAdvantages);
  };

  const imageEdit = (index, newImage) => {
    const newImages = [...images];
    newImages[index] = newImage;
    setImages(newImages);
  };

  return (
    <Card body className="about">
      <Row>
        <Col>
          <h2 className="text-center font-weight-bold">영진전문대학 현지학기제란?</h2>
          {editMode ? (
            <textarea
              className="form-control mb-2"
              value={introduce}
              onChange={introductionEdit}
            />
          ) : (
            <p className="text-left">{introduce}</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center font-weight-bold">영진전문대학 현지학기제 장점</h2>
          {editMode ? (
            <ul>
              {advantages.map((advantage, index) => (
                <li key={index}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={advantage}
                    onChange={(e) => advantagesEdit(index, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
      <Row className="image">
        <Col>
          <div className="image-container">
            {editMode ? (
              images.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={image}
                    onChange={(e) => imageEdit(index, e.target.value)}
                  />
                </div>
              ))
            ) : (
              images.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <img src={image} alt={`Image ${index + 1}`} className="img-fluid" />
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <Button variant="primary" size="sm" onClick={toggleEdit}>
          {editMode ? '저장' : '수정'}
        </Button>
      </div>
    </Card>
  );
};

export default AboutPage;