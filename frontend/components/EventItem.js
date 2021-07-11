import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

const EventItem = ({ evt }) => {
  const src =
    evt &&
    evt.image &&
    evt.image.formats &&
    evt.image.formats.thumbnail &&
    evt.image.formats.thumbnail.url;
    
  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image
          src={src || '/images/event-default.png'}
          width={170}
          height={100}
          alt='Event Image'
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString()} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
