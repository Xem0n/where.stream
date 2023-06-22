import React, { useState } from 'react';
import { fetchShows } from '../../api/data';
import Show from '../../types/Show';
import ShowTypes from '../../types/ShowTypes';
import Loading from '../Loading';
import Form from './Form';
import Results from './Results';

const MIN_TITLE_LENGTH = 3;

function Search() {
  const [isSearching, setSearching] = useState(false);
  const [shows, setShows] = useState<Show[]>();

  const getShows = async (title: string, country: string, type: ShowTypes) => {
    setSearching(true);

    if (title.length < MIN_TITLE_LENGTH) {
      return;
    }

    setShows(await fetchShows(title, country, type));

    setSearching(false);
  };

  return (
    <>
      <Form onSubmit={getShows} />
      {isSearching ? <Loading /> : <Results shows={shows} />}
    </>
  );
}

export default Search;
