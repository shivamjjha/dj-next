import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/Modal.module.css';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ show, onClose, children, title }) => {
  const [isBroswer, setIsBroswer] = useState(false);

  useEffect(() => {
    // On page render
    setIsBroswer(true);
  }, []);

  const handleClose = e => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show && (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  // page is rendered on frontEnd, `window` obj is available
  if (isBroswer) {
    return ReactDOM.createPortal(
      modalContent,
      document.querySelector('#modal-root')
    );
  }

  // important to return anything (to render nothing, return null.)
  return null;
};

export default Modal;
