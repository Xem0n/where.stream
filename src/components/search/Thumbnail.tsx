import React from 'react';
import Show from '../../types/Show';
import styles from './Thumbnail.module.css';

interface ThumbnailProps {
  show: Show;
  onClick: (show: Show) => void;
}

function Thumbnail(props: ThumbnailProps) {
  const show = props.show;

  const onClick = () => props.onClick(show);

  return (
    <div key={show.title} 
         onClick={onClick}
         style={{
          backgroundImage: `url("${show.backdropURLs['original']}")`
         }}
         className={styles.Thumbnail}>
      <div>
        <p className={styles.Title}>
          {show.title}
        </p>
      </div>
    </div>
  );
}

export default Thumbnail
