import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({
  title = 'DJ Events | Find the hottest parties.',
  keywords = 'music, dj, dem, events',
  description = 'Find the latest DJ and other musical events',
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='desc' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header></Header>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Layout;
