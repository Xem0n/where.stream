import React, { useState } from 'react';
import ShowTypes from '../../types/ShowTypes';
import Loading from '../Loading';
import Form from './Form';
import Results from './Results';

const MIN_TITLE_LENGTH = 3;

function Search() {
  const [isSearching, setSearching] = useState(false);

  const getShows = async (title: string, country: string, type: ShowTypes) => {
    setSearching(true);

    if (title.length < MIN_TITLE_LENGTH) {
      return;
    }

    const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=${country}&show_type=${type}&output_language=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd8f31e989dmsh23bf5ea7462eb34p13be50jsn7e0152ef9e48',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log(data);
    } catch (e: any) {
      console.error(e);
    }

    setSearching(false);
  };

  return (
    <>
      <Form onSubmit={getShows} />
      {isSearching ? 
        <Loading /> : 
        <Results />
      }
    </>
  );
}

export default Search;
