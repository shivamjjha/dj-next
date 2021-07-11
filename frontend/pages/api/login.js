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
  console.log(data);

  if (!strpiRes.ok) {
    res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });

    return;
  }

  // @todo Set Http-Only cookie
  res.status(200).json({ user: data.user });
};

export default login;
