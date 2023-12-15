import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/About.css";
import { configureAWS, getImageUrl, deleteImages } from "../components/common/aws/awsServices";

const TeamAboutPageUpdate = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    std: "",
    link: "",
    image: "", // 기본 이미지
  });
  const [stackImageList, setStackImageList] = useState([]);
  const [newImageUrlList, setNewImageUrlList] = useState([]);

  useEffect(() => {
    configureAWS();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3300/team");
      const data = response.data;

      if (data && Array.isArray(data)) {
        setTeamMembers(data);
        let fetchImgList = data.map((item) => {
          return 'admin_uid_' + item.image.split('_uid_')[1];
        }).filter(Boolean);
        setStackImageList(fetchImgList);

        let fetchImageUrlList = data.map((item) => {
          return item.image;
        });

        setNewImageUrlList(fetchImageUrlList);

      } else {
        console.error("팀 데이터가 잘못되었습니다:", data);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevNewMember) => ({
      ...prevNewMember,
      [name]: value,
    }));
  };

  const handleInputImageChange = async (event) => {
    const { name } = event.target;

    const file = event.target.files[0];


    const formData = new FormData();
    formData.append('image', file);

    const { imageURL, keyName } = await getImageUrl(formData, 'admin', 'users');

    let sList = stackImageList;
    let nList = newImageUrlList;
    sList.push(keyName);
    nList.push(imageURL);
    setNewImageUrlList(sList);
    setNewImageUrlList(nList);

    console.log(imageURL)

    setNewMember((prevNewMember) => ({
      ...prevNewMember,
      [name]: imageURL,
    }));
  };

  const handleRemoveMember = async (index) => {
    const removedMember = teamMembers[index];
    let nList = newImageUrlList;
    nList.splice(index, 1);
    setNewImageUrlList(nList);

    console.log(stackImageList);
    console.log(nList);

    const uploadedImages = nList.map((item) => {
      const uidPart = item.match(/\/users\/(.+)$/);
      console.log(uidPart[1]);
      return uidPart;
    }).filter(Boolean); // falsy값 제거

    uploadedImages.push("admin_uid_default.jpg");

    deleteImages(stackImageList, new Set(uploadedImages), 'others', 'users');

    try {
      await axios.delete(`http://localhost:3300/team/${removedMember.id}`);
      setTeamMembers((prevTeamMembers) =>
        prevTeamMembers.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("멤버를 삭제하는 중 오류가 발생했습니다:", error.message);
    }
  };

  const handleSubmit = async () => {
    console.log(newMember);

    // 필수 필드가 비어 있는지 확인
    if (!newMember.name) {
      return navigate("/team"); // 페이지로 이동하지만, 데이터베이스에 저장되지 않음
    } else {

      // 이미지가 제공되지 않으면 기본 이미지를 사용
      console.log(newMember.image)
      const imageUrl =
        newMember.image ||
        "https://my-react-team-project.s3.ap-northeast-2.amazonaws.com/users/admin_uid_default.jpg";

      try {
        // 새로운 멤버 데이터를 서버에 저장
        const response = await axios.post("http://localhost:3300/team", {
          ...newMember,
          image: imageUrl,
        });

        const addedMember = response.data;

        // 새로운 멤버로 로컬 상태를 업데이트
        setTeamMembers((prevTeamMembers) => [...prevTeamMembers, addedMember]);

        // 새로운 멤버 추가 상태 초기화
        setNewMember({
          name: "",
          std: "",
          link: "",
          image: "",
        });

        // 아래 주석을 해제하면 페이지로 이동하면서 데이터베이스에도 저장됩니다.
        navigate("/team");
      } catch (error) {
        console.error("멤버를 추가하는 중 오류가 발생했습니다:", error.message);
        alert("새로운 멤버를 저장하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };


  return (
    <Card body className="about">
      <Row className="justify-content-center" style={{ marginBottom: "20px" }}>
        {teamMembers.map((member, index) => (
          <Col key={index} md={5} lg={4} className="mb-4">
            <Card style={{ width: '18rem' }} className="text-center">
              <Card.Img variant="top" src={member.image} className='card-img' />
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
                  onChange={handleInputImageChange}
                  name="image"
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
