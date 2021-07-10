// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { events } = require('./data.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(events.find(djEvent => djEvent.slug === req.query.slug));
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `${req.method} is not allowed` });
  }
}
