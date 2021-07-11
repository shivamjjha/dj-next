import Link from 'next/link';
import Search from './Search';
import styles from '@/styles/Header.module.css';
import { FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          {/* For any link styling put in <a> tag inside <link> */}
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>

          <li>
            <Link href='/events/add'>
              <a>Add Event</a>
            </Link>
          </li>

          <li>
            <Link href='/account/login'>
              <a className='btn-secondary btn-icon'>
                <FaSignInAlt /> Login
              </a>
            </Link>
          </li>

          <li>
            <Link href='/account/register'>
              <a className='btn-secondary btn-icon'>
               Register
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
