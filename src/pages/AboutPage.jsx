import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/About.css';

const AboutPage = () => {
  const navigate = useNavigate();
  const [introduction, setIntroduction] = useState('');
  const [advantages, setAdvantages] = useState([]);
  const [images, setImages] = useState([]);
  const apiUrl = 'http://localhost:3300/about';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data[0]; 

        setIntroduction(data.introduction);
        setAdvantages(data.advantages);
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); 

  const toggleEdit = () => {
    navigate('/about/update');
  };

  return (
    <Card body className="about">
      <Row>
        <Col>
          <h2 className="text-center font-weight-bold">영진전문대학 현지학기제란?</h2>
          <p>{introduction}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center font-weight-bold">영진전문대학 현지학기제 장점</h2>
          <ul>
            {advantages.map((advantage, index) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row className="image">
        <Col>
          <div className="image-container">
            {images.map((image, index) => (
              <div className="image-wrapper" key={index}>
                <img src={image} alt={`${index + 1}`} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Button variant="primary" size="md" onClick={toggleEdit}>수정</Button>
      </Row>
    </Card>
  );
}

export default AboutPage;