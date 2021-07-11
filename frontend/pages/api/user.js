import cookie from 'cookie';
import { API_URL } from '@/config/index';

const login = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method: ${req.method} not allowed` });
    return;
  }

  // If no cookie is present (user is not authenticated yet)
  if (!req.headers.cookie) {
    // Unauthorized
    res.status(403).json({ message: 'Not Authorized' });
    return;
  }

  const { token } = cookie.parse(req.headers.cookie);

  const strpiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await strpiRes.json();

  if (!strpiRes.ok) {
    // Foridden
    res.status(403).json({ message: 'User forbidden' });
  }

  res.status(200).json({ user });
};

export default login;
