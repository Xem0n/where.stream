import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Show from '../../types/Show';
import styles from './Results.module.css';
import Thumbnail from './Thumbnail';

interface ResultsProps {
  shows: Show[];
}

function Results(props: ResultsProps) {
  const [display, setDisplay] = useState<Show>();

  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  const displayShow = (show: Show) => {
    setDisplay(show);
  }

  const thumbnails = props.shows.map(
    show => <Thumbnail show={show}
                       onClick={displayShow} />
  );

  const availableStreamings = Object.values(display?.streamingInfo ?? {})
    .map(country => Object.keys(country)
    .map(streaming => <li key={streaming}>{streaming}</li>));
  
  return (
    <>
      {thumbnails.length > 0 ?
        <div className={styles.ShowsList}>
          {thumbnails}
        </div> :

        <p className={styles.Fallback}>
          We couldn't find anything :(
        </p>
      }

      <ReactModal isOpen={display !== undefined}
                  onRequestClose={() => setDisplay(undefined)}
                  className={styles.Show}>
        <p className={styles.Title}>
          {display?.title}
        </p>

        <p>Available in your region on:</p>

        <ul className={styles.Services}>
          {availableStreamings.length > 0 ?
            availableStreamings :
            <li>Nothing :(</li>
          }
        </ul>
      </ReactModal>
    </>
  );
}

export default Results;
