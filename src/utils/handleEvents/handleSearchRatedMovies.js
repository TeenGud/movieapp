export const handleSearchRatedMovies = (
  getRatedMovies,
  sessionId,
  page,
  setIsRatedEmpty,
  setRatedMovies,
  setIsLoading,
  setRatedErrorText
) => {
  getRatedMovies(sessionId, page)
    .then((body) => {
      setIsRatedEmpty(false);
      if (!body?.results?.length) {
        setIsRatedEmpty(true);
      }
      setRatedMovies(body.results);
      setIsLoading(false);
    })
    .catch((err) => {
      setRatedErrorText(err.message);
      console.error(err);
      setIsLoading(false);
    });
};
