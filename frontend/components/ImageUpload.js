import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { useState } from 'react';

const ImageUpload = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState(null);

  // console.log('imageUploaded', imageUploaded);

  const handleFileChange = e => {
    console.log('handleFileChange');
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('handleSubmit');

    // To upload image using an API
    const formData = new FormData();
    formData.append('files', image);

    // To connect to specific strapy collection
    formData.append('ref', 'events'); // name of our collection
    formData.append('refId', evtId);
    formData.append('field', 'image'); // We named our image field as 'image'

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      imageUploaded();
    }
  };

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
