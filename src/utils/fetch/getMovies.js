const getMovies = async (title, page) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ2M2JlMWFjZTVjNzgyYWI1N2M2YjIxMGQ1MzRkMiIsIm5iZiI6MTczNDQzNTY3My40OTUwMDAxLCJzdWIiOiI2NzYxNjM1OWQxODNkMWUyNWNjYmVhMDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HTm07QYtFo2cKrk2Deckrcx7LOr3Rmt7NTIG8PGKSTA',
    },
  };
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}`, options);
    if (!res.ok) {
      throw new Error(`Could not fetch ${title}, recived ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default getMovies;
