import cookie from 'cookie';
import { API_URL } from '@/config/index';

const login = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method: ${req.method} not allowed` });
    return;
  }

  const { identifier, password } = req.body;

  const strpiRes = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  const data = await strpiRes.json();

  if (!strpiRes.ok) {
    res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });

    return;
  }

  // Set Http-Only cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', data.jwt, {
      httpOnly: 'true',
      // Check if prod
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/'
    })
  );
  res.status(200).json({ user: data.user });
};

export default login;
