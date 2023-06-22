interface Show {
  title: string;
  overview: string;
  type: string;
  year: string;
  imdbRating: number;
  backdropURLs: {
    [resolution: string]: string;
  }
  streamingInfo: {
    [country: string]: {
      [service: string]: Object;
    };
  };
}

export default Show;
