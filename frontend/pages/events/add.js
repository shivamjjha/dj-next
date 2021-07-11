import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';

const Add = () => {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();

    console.log('submit');
  };

  const handleInputChange = e => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Layout title='Add New Event'>
        <Link href='/events'>Go back</Link>
        <h1>Add Event Page</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className=''>
              <label htmlFor='name'>Event Name</label>
              <input
                type='text'
                name='name'
                id='name'
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='performers'>Performers</label>
              <input
                type='text'
                name='performers'
                id='performers'
                value={values.performers}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='venue'>Venue</label>
              <input
                type='text'
                name='venue'
                id='venue'
                value={values.venue}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                id='address'
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='date'>Date</label>
              <input
                type='date'
                name='date'
                id='date'
                value={values.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='time'>Time</label>
              <input
                type='text'
                name='time'
                id='time'
                value={values.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor='description'>Event Description</label>
            <textarea
              type='text'
              name='description'
              id='description'
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button type='submit' className='btn'>
            Add Event
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Add;
