import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({ onFlag, title, text, show }) => {

  const handleClose = () => onFlag(false);

  return (
    <>
      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ text }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => onFlag(false) }>
            Close
          </Button>
          <Button variant="primary" onClick={() => onFlag(true)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;