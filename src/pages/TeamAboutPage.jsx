import React, { useState, useEffect } from 'react';
import { Row, Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TeamAbout.css';

const TeamAboutPage = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const apiUrl = 'http://localhost:3300/team';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // data가 존재하고 배열인 경우에만 데이터를 설정
        if (data && Array.isArray(data)) {
          setTeamMembers(data);
        } else {
          console.error('Invalid team data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const toggleEdit = () => {
    navigate('/team/update');
  };

  return (
    <Card body className="about">
      <Row className="justify-content-center" style={{ marginBottom: '20px' }}>
        {teamMembers.map((member, index) => (
          <Col key={index} md={5} lg={4} className="mb-4">
            <Card style={{ width: '18rem' }} className="text-center">
              <Card.Img variant="top" src={member.image} className='card-img' />
              <Card.Body>
                <Card.Title><strong>{member.name}</strong></Card.Title>
                <Card.Text>
                  <span>학번 : </span> {member.std} <br />
                  <a href={member.link} target="_blank" rel="noopener noreferrer">GitHub</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <div className="text-center mt-1" style={{ height: '20px' }}>
          <Button variant="primary" size="md" onClick={toggleEdit}>
            수정
          </Button>
        </div>
      </Row>
    </Card>
  );
};

export default TeamAboutPage;
