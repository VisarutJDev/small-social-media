import React from 'react';
import styles from '../styles/Dialog.module.css';

type DialogProps = {
  title: string;
  message: string;
  onClose: () => void;
};

const Dialog: React.FC<DialogProps> = ({ title, message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Dialog;
