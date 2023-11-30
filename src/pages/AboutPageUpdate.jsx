import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/About.css';

const AboutPageUpdate = () => {
  const navigate = useNavigate();
  const [introduction, setIntroduction] = useState('');
  const [advantages, setAdvantages] = useState([]);
  const [images, setImages] = useState([]);
  const apiUrl = 'http://localhost:3300/about/3';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data[0];

        setIntroduction(data.introduction);
        setAdvantages([...data.advantages]);
        setImages([...data.images]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); 

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  const handleAdvantageChange = (index, event) => {
    const newAdvantages = [...advantages];
    newAdvantages[index] = event.target.value;
    setAdvantages(newAdvantages);
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      introduction,
      advantages,
      images
    };

    try {
      await axios.put(apiUrl, updatedData);
      // Navigate to the AboutPage after updating
      navigate('/about');
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  const RemoveButton = ({ onClick }) => (
    <Button
      variant="danger"
      className="ml-2"
      onClick={onClick}
      size="sm"
      style={{ marginBottom: '10px', marginRight: '5px' }}
    >
      삭제
    </Button>
  );

  const handleAddAdvantage = () => {
    setAdvantages([...advantages, '']);
  };

  const handleRemoveAdvantage = (index) => {
    const newAdvantages = [...advantages];
    newAdvantages.splice(index, 1);
    setAdvantages(newAdvantages);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
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
                <RemoveButton onClick={() => handleRemoveAdvantage(index)} />
              </div>
            </Form.Group>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddAdvantage}
            style={{ marginBottom: '10px', marginRight: '10px' }}
          >
            장점 추가
          </Button>
        </Col>
      </Row>
      <Row className="image">
        <Col>
          <div className="image-container">
            {images.map((image, index) => (
              <div className="image-wrapper" key={index}>
                <Form.Group controlId={`image${index}`}>
                  <Form.Label>이미지 {index + 1}</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={image}
                      onChange={(event) => handleImageChange(index, event)}
                      size="sm"
                      style={{ marginBottom: '10px', marginRight: '5px' }}
                    />
                    <RemoveButton onClick={() => handleRemoveImage(index)} />
                  </div>
                </Form.Group>
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddImage}
            style={{ marginBottom: '10px', marginRight: '10px' }}
          >
            이미지 추가
          </Button>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <Button variant="primary" size="md" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </Card>
  );
};

export default AboutPageUpdate;
