import { sessionId } from '../handleEvents';

const addRaiting = async (movieId, guestSession, rating) => {
  const body = { value: rating };
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWQ2M2JlMWFjZTVjNzgyYWI1N2M2YjIxMGQ1MzRkMiIsIm5iZiI6MTczNDQzNTY3My40OTUwMDAxLCJzdWIiOiI2NzYxNjM1OWQxODNkMWUyNWNjYmVhMDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HTm07QYtFo2cKrk2Deckrcx7LOr3Rmt7NTIG8PGKSTA',
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSession}`,
      options
    );
    if (!res.ok) {
      throw new Error(`Could not fetch this movie, recived ${res.status}`);
    }
    const data = await res.json();
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default addRaiting;
