import React, { FormEvent, useState } from 'react';
import { getCountries } from '../../api/data';
import ShowTypes from '../../types/ShowTypes';
import styles from './Form.module.css';

interface FormProps {
  onSubmit: (title: string, country: string, type: ShowTypes) => void;
}

function Form(props: FormProps) {
  const countries = getCountries();

  const defaultCountry = countries.find(
    country => navigator.language.toLowerCase().includes(country.toLowerCase())
  ) ?? 'us';

  const listCountries = countries.map(
    country => <option key={country}>{country.toUpperCase()}</option>
  );

  const [title, setTitle] = useState('');
  const [type, setType] = useState(ShowTypes.All);
  const [country, setCountry] = useState(defaultCountry);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.onSubmit(title.toLowerCase(), country.toLowerCase(), type);
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

        <div className={styles.Selects}>
          <div className={styles.Select}>
            <select value={type}
                    onChange={e => setType(e.target.value as ShowTypes)}>
              <option value={ShowTypes.All}>All</option>
              <option value={ShowTypes.Series}>Series</option>
              <option value={ShowTypes.Movies}>Movies</option>
            </select>
          </div>

          <div className={styles.Select}>
            <select value={country.toUpperCase()}
                    onChange={e => setCountry(e.target.value)}>
              {listCountries}
            </select>
          </div>
        </div>

        <button className={styles.Search}>
          Search...
        </button>
      </div>
    </form>
  );
}

export default Form;
