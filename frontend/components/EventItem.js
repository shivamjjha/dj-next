import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

const EventItem = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image
          src={evt.image || '/images/event-default.png'}
          width={170}
          height={100}
          alt='Event Image'
        />
      </div>
    </div>
  );
};

export default EventItem;
