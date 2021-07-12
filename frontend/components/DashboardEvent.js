import styles from '@/styles/DashboardEvent.module.css';
import Link from 'next/link';

const DashboardEvent = ({ evt }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
    </div>
  );
};

export default DashboardEvent;
