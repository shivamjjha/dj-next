import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

const Event = ({ evt }) => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{evt.name}</h1>
    </Layout>
  );
};

export default Event;

/* at build time we cannot just pass dynamic slug routes as `{ query: { slug } }`,
 * because in case of getStaticProps(),  the web pages needs to be generated statically at build time
 * and it needs to know the paths at build time; so
 * we need to use `getStaticPaths()` in combination with `getStaticProps()`
 */
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
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
  const res = await fetch(`${API_URL}/api/events`);
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
