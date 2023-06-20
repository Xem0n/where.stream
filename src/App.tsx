import React from 'react';
import styles from './App.module.css';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

function App(props: AppProps) {
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <a className={styles.Link} href='/'>where.stream</a>
      </header>
      {props.children}
    </div>
  );
}

export default App;
