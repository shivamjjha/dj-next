import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
// with aliases explicitly need to say `/index`
import { API_URL } from '@/config/index';

const SearchPage = ({ events }) => {
  // console.log(events);
  const router = useRouter();
  return (
    <>
      <Layout title={`Search Results for ${router.query.term}`}>
        <Link href='/events'>Go back</Link>
        <h1>Search Results for {router.query.term}</h1>
        {events && events.length > 0 ? (
          events.map(evt => <EventItem key={evt.id} evt={evt} />)
        ) : (
          <h3>No events to show</h3>
        )}
      </Layout>
    </>
  );
};

export default SearchPage;

/*
 * We never know what someone's gonna search for,
 * So we can't just generate static paths
 */
export async function getServerSideProps({ query: { term } }) {
  // returns query string thta will be used to call strapy API
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
