import React from 'react';
import ShowTypes from '../../types/ShowTypes';
import Form from './Form';
import Results from './Results';
// import styles from './App.module.css';

function Search() {
  const getMovies = (title: string, country: string, type: ShowTypes) => {
    console.log(title);
    console.log(country);
    console.log(type);
  };

  return (
    <>
      <Form onSubmit={getMovies} />
      <Results />
    </>
  );
}

export default Search;
