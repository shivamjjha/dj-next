import Layout from '@/components/Layout';
// with aliases explicitly need to say `/index`
import { API_URL } from '@/config/index';

const HomePage = ({ events }) => {
  console.log(events);
  return (
    <>
      <Layout>
        <h1>Upcoming Events</h1>
      </Layout>
    </>
  );
};

export default HomePage;

// `getServerSideProps` Runs server side (everytime the page is loaded)
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
  };
}
