import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import EventMap from '@/components/EventMap';

const EventPage = ({ evt }) => {
  const router = useRouter();

  /*   const deleteEvent = async () => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      router.push('/events');
    }
  }; */

  // If the dynamic page is not yet generated (the path was not there) (at build time), this will be displayed
  // initially until getStaticProps() finishes running
  // For subsequent visits to this page, everyone who requests the same page will get the statically pre-rendered page.
  // See https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        <span>
          {new Date(evt.date).toLocaleDateString()} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              alt={evt.name}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.name}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

/* at build time we cannot just pass dynamic slug routes as `{ query: { slug } }`,
 * because in case of getStaticProps(),  the web pages needs to be generated statically at build time
 * and it needs to know the paths at build time; so
 * we need to use `getStaticPaths()` in combination with `getStaticProps()`
 */
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}

/*
 * Generates static paths for our data
 * If a page has dynamic routes (documentation) and uses getStaticProps,
 * it needs to define a list of paths that have to be rendered to HTML at build time.
 * Returned obj should be like
 * {
 *   paths: [
 *     {params: {id: 1}},
 *     {params: {id: 2}},
 *     {params: {id: 3}},
 *   ],
 * }
 */
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map(evt => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    // See https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
    /* Basically, if false, then if that path not found
     * (not generated at buildtime; ex new path added in API route);
     * goes to 404 page. Else, looks for the new path
     */
    fallback: true,
  };
}

// If we want to make request on every page load (not ideal)
/* export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
  };
} */
