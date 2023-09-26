/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import { createContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [onConfirm, setOnConfirm] = useState(null);

  const openModal = (modalData, confirmFunction) => {
    setModalData(modalData);
    setShowModal(true);
    setOnConfirm(() => confirmFunction);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({});
    setOnConfirm(null);
  };

  const handleConfirm = () => {
    // eslint-disable-next-line no-unused-expressions
    onConfirm && onConfirm();
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title ?? 'Confirm'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.ContentComponent ? (
            <modalData.ContentComponent />
          ) : (
            modalData.content ?? ''
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant={modalData.confirmVariant ?? 'primary'} onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
