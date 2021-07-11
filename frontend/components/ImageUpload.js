import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { useState } from 'react';

const ImageUpload = ({ evtId, ImageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = e => {
    console.log('handleFileChange');
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
          <button type='submit' className='btn'>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
