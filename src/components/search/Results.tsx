import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import getServicePrettyName from '../../api/prettyNames';
import Show from '../../types/Show';
import styles from './Results.module.css';
import Thumbnail from './Thumbnail';

interface ResultsProps {
  shows: Show[] | undefined;
}

function Results(props: ResultsProps) {
  const [display, setDisplay] = useState<Show>();

  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  const displayShow = (show: Show) => {
    setDisplay(show);
  };

  const getFallback = () => (
    <p className={styles.Fallback}>
      {props.shows === undefined
        ? 'What do you wanna watch?'
        : "We couldn't find anything :("}
    </p>
  );

  let i = 0;

  const thumbnails = (props.shows ?? []).map((show) => (
    <Thumbnail key={i++} show={show} onClick={displayShow} />
  ));

  const availableStreamings = Object.keys(
    Object.values(display?.streamingInfo ?? {})[0] ?? {}
  )
    .map((streaming) => getServicePrettyName(streaming))
    .sort()
    .map((streaming) => <li key={streaming}>{streaming}</li>);

  return (
    <>
      {thumbnails.length > 0 ? (
        <div className={styles.ShowsList}>{thumbnails}</div>
      ) : (
        getFallback()
      )}

      <ReactModal
        isOpen={display !== undefined}
        onRequestClose={() => setDisplay(undefined)}
        className={styles.Show}>
        <p className={styles.Title}>{display?.title}</p>

        <p>Available in your region on:</p>

        <ul className={styles.Services}>
          {availableStreamings.length > 0 ? (
            availableStreamings
          ) : (
            <li>Nothing :(</li>
          )}
        </ul>
      </ReactModal>
    </>
  );
}

export default Results;
