import React, { useState } from 'react';
import { fetchShows } from '../../api/data';
import Show from '../../types/Show';
import ShowQuery from '../../types/ShowQuery';
import Loading from '../Loading';
import Form from './Form';
import Results from './Results';

const MIN_TITLE_LENGTH = 3;

function Search() {
  const [isSearching, setSearching] = useState(false);
  const [shows, setShows] = useState<Show[]>();

  const getShows = async (query: ShowQuery) => {
    setSearching(true);

    if (query.title.length < MIN_TITLE_LENGTH) {
      return;
    }

    setShows(await fetchShows(query));

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
