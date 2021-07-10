import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
// with aliases explicitly need to say `/index`
import { API_URL } from '@/config/index';

const HomePage = ({ events }) => {
  // console.log(events);
  return (
    <>
      <Layout>
        <h1>Upcoming Events</h1>
        {events && events.length > 0 ? (
          events.map(evt => <EventItem key={evt.id} evt={evt} />)
        ) : (
          <h3>No events to show</h3>
        )}

        {events.length && (
          <Link href='/events'>
            <a className='btn-secondary'>View all Events</a>
          </Link>
        )}
      </Layout>
    </>
  );
};

export default HomePage;

/*
 * `getStaticProps` Runs at build time to generate a static page (by default only once),
 * that will be displayed on every request
 * so that the page does not have to fetch data everytime on page load
 * but if there is some update in data (that API is fetching, then it will not be reflected back)
 * since this will be generated at build time
 * so, we use `revalidate`
 * So that It may be called again, on a serverless function, if
 * revalidation is enabled and a new request comes in
 * See
 *   https://github.com/vercel/next.js/discussions/11427#discussioncomment-2227
 *   https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
 */
export async function getStaticProps() {
  // coming from strapy
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();
  // console.log(events[0].image.formats);

  return {
    props: { events },
    // An optional amount in seconds after which a page re-generation can occur (defaults to: false or no revalidating)
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1,
  };
}
