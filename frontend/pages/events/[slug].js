import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const Event = () => {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <h1>My Event</h1>
      {router.query.slug}
      <button onClick={() => router.push('/')}>Click</button>
    </Layout>
  );
};

export default Event;
