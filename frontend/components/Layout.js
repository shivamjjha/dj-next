import Head from 'next/head';
import Header from './Header';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';

const Layout = ({
  title = 'DJ Events | Find the hottest parties.',
  keywords = 'music, dj, dem, events',
  description = 'Find the latest DJ and other musical events',
  children,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='desc' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
