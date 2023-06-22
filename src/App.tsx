import React, { useEffect, useState } from 'react';
import { loadData } from './api/data';
import styles from './App.module.css';
import Loading from './components/Loading';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

function App(props: AppProps) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadData().then(() => {
      setLoading(false);
    });

    return () => {
      setLoading(true);
    };
  }, []);

  const children = isLoading ? <Loading /> : props.children;

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <a className={styles.Link} href='/'>
          where.stream
        </a>
      </header>
      {children}
    </div>
  );
}

export default App;
