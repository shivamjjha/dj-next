import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
// with aliases explicitly need to say `/index`
import { API_URL } from '@/config/index';
const PER_PAGE = 2;

const Events = ({ events }) => {
  // console.log(events);
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        <h1>Events</h1>
        {events && events.length > 0 ? (
          events.map(evt => <EventItem key={evt.id} evt={evt} />)
        ) : (
          <h3>No events to show</h3>
        )}
      </Layout>
    </>
  );
};

export default Events;

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await res.json();

  return {
    props: { events },
  };
}
