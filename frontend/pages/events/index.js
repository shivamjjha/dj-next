import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
// with aliases explicitly need to say `/index`
import { API_URL } from '@/config/index';

const Events = ({ events }) => {
  console.log(events);
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

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
