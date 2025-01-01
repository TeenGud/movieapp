import { getGenres } from '../fetch';

const fetchGenres = async () => {
  const res = await getGenres();
  return res.genres;
};

export const genres = await fetchGenres();
