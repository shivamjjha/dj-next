import styles from '@/styles/Search.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Search = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='search'
          onChange={e => setTerm(e.target.value)}
          placeholder='Search Events'
        />
      </form>
    </div>
  );
};

export default Search;
