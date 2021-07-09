import { useRouter } from 'next/router';

const Event = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>My Event</h1>
      {router.query.slug}
      <button onClick={() => router.push('/')}>Click</button>
    </div>
  );
};

export default Event;
