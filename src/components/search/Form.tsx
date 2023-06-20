import React, { FormEvent, useState } from 'react';
import styles from './Form.module.css';

interface FormProps {
  onSubmit: (title: string, country: string, type: string) => void;
}

function Form(props: FormProps) {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.onSubmit(title, country, type);
  };

  return (
    <form className={styles.Form}
          onSubmit={onSubmit}>
      <div className={styles.Inputs}>
        <input className={styles.Title} 
               placeholder='Type title...'
               type='text'
               value={title}
               onChange={e => setTitle(e.target.value)} />

        <div className={styles.Select}>
          <select value={type}
                  onChange={e => setType(e.target.value)}>
            <option>All</option>
            <option>Series</option>
            <option>Movies</option>
          </select>
        </div>

        <div className={styles.Select}>
          <select value={country}
                  onChange={e => setCountry(e.target.value)}>
            <option>PL</option>
            <option>US</option>
            <option>DE</option>
          </select>
        </div>
      </div>

      <button className={styles.Search}>
        Search...
      </button>
    </form>
  );
}

export default Form;
