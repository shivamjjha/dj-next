import { useState } from 'react';
import Layout from '@/components/Layout';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>

        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div></div>
          <button type='submit' className='btn'>
            LogIn
          </button>
        </form>

        <p>
          Don&apos;t have an account?{' '}
          <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
