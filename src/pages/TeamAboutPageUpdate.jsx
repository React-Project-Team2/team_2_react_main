import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/About.css";

const TeamAboutPageUpdate = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    std: "",
    link: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3300/team");
      const data = response.data;

      if (data && Array.isArray(data)) {
        setTeamMembers(data);
      } else {
        console.error("Invalid team data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevNewMember) => ({
      ...prevNewMember,
      [name]: value,
    }));
  };
  const handleRemoveMember = async (index) => {
    const removedMember = teamMembers[index];

    try {
      await axios.delete(`http://localhost:3300/team/${removedMember.id}`);
      setTeamMembers((prevTeamMembers) =>
        prevTeamMembers.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error removing member:", error.message);
    }
  };

  const handleSubmit = async () => {
    // Check if all fields are empty
    if (
      !newMember.name &&
      !newMember.std &&
      !newMember.link &&
      !newMember.image
    ) {
      alert("폼을 작성해 주세요.");
      return;
    }

    try {
      // Save the new member data to the server
      const response = await axios.post(
        "http://localhost:3300/team",
        newMember
      );
      const addedMember = response.data;

      // Update the local state with the new member
      setTeamMembers((prevTeamMembers) => [...prevTeamMembers, addedMember]);
      setNewMember({
        name: "",
        std: "",
        link: "",
        image: "",
      });

      // Navigate to the /team page after saving
      navigate("/team");
    } catch (error) {
      console.error("Error adding member:", error.message);
      alert("An error occurred while saving the new member. Please try again.");
    }
  };

  return (
    <Card body className="about">
      <Row className="justify-content-center" style={{ marginBottom: "20px" }}>
        {teamMembers.map((member, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card style={{ width: "18rem" }} className="text-center">
              <Card.Img variant="top" src={member.image} />
              <Card.Body>
                <Card.Title>
                  <strong>{member.name}</strong>
                </Card.Title>
                <Card.Text>
                  <span>학번 : </span> {member.std} <br />
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Card.Text>
                <div className="button-container">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveMember(index)}
                    className="mb-2"
                  >
                    삭제
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col md={4} className="mb-4">
          <Card style={{ width: "18rem" }} className="text-center">
            <Card.Body>
              <Card.Title>
                <strong>새로운 멤버 추가</strong>
              </Card.Title>
              <Form.Group controlId="newMemberName">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="이름을 입력하세요."
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="newMemberStd">
                <Form.Label>학번</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="학번을 입력하세요."
                  name="std"
                  value={newMember.std}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="newMemberLink">
                <Form.Label>GitHub 링크</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="GitHub 링크를 입력하세요."
                  name="link"
                  value={newMember.link}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="newMemberImage">
                <Form.Label>이미지 링크</Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg"
                  onChange={handleInputChange}
                  name="image"
                  value={newMember.image}
                  size="sm"
                  style={{ marginBottom: "10px", marginRight: "5px" }}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center" style={{ height: "50px" }}>
        <Button variant="primary" size="md" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </Card>
  );
};

export default TeamAboutPageUpdate;
