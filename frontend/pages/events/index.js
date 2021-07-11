import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
// with aliases explicitly need to say `/index`
import { API_URL, PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';

const Events = ({ events, page, total }) => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <h1>Events</h1>
        {events && events.length > 0 ? (
          events.map(evt => <EventItem key={evt.id} evt={evt} />)
        ) : (
          <h3>No events to show</h3>
        )}

        <Pagination page={page} total={total} />
      </Layout>
    </>
  );
};

export default Events;

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
