import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';

function convertDate(str) {
  // You can parse the date using the Date constructor, then spit out the individual time components:
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}

const EditEventPage = ({ evt }) => {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      element => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
      return;
    }
    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error('Something went wrong!!');
      return;
    }

    const returnedEvent = await res.json();
    router.push(`/events/${returnedEvent.slug}`);
  };

  const handleInputChange = e => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Layout title='Add New Event'>
        <Link href='/events'>Go back</Link>
        <h1>Edit Event Page</h1>
        <ToastContainer />
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
                value={convertDate(values.date)}
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
            Update Event
          </button>
        </form>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: { evt },
  };
}

export default EditEventPage;