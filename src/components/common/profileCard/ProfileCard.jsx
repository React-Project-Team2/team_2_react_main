import { Card, Button, Form } from 'react-bootstrap';

const ProfileCard = ({ profile, index, editMode, onEdit, onDelete }) => {
  return (
    <Card style={{ width: '18rem' }}>
      {editMode ? (
        <Form>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={profile.image}
              onChange={(e) => onEdit(index, 'image', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={profile.name}
              onChange={(e) => onEdit(index, 'name', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Std</Form.Label>
            <Form.Control
              type="text"
              value={profile.std}
              onChange={(e) => onEdit(index, 'std', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Github Link</Form.Label>
            <Form.Control
              type="text"
              value={profile.link}
              onChange={(e) => onEdit(index, 'link', e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" size="sm" onClick={() => onEdit(index)}>
            저장
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(index)} className="ml-2">
            삭제
          </Button>
        </Form>
      ) : (
        <>
          <Card.Img variant="top" src={profile.image} />
          <Card.Body>
            <Card.Title>{profile.name}</Card.Title>
            <Card.Text>{profile.std}</Card.Text>
            <Button size="lg" variant="primary" href={profile.link}>
              Go Github
            </Button>
          </Card.Body>
          <Button variant="primary" size="sm" onClick={() => onEdit(index)}>
            수정
          </Button>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;