import cookie from 'cookie';
import { API_URL } from '@/config/index';

const login = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method: ${req.method} not allowed` });
    return;
  }

  // DESTROY the Http-Only cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: 'true',
      // Check if prod
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0), // A date that is passed
      sameSite: 'strict',
      path: '/',
    })
  );

  res.status(200).json({ message: 'success' });
};

export default login;
