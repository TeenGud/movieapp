export const handleSearch = (
  newTitle,
  setIsEmpty,
  setNotFound,
  getMovies,
  page,
  setMovies,
  setIsLoading,
  setErrorText
) => {
  setNotFound(false);
  if (!newTitle.trim().length) {
    setIsEmpty(true);
  } else {
    setIsEmpty(false);
    getMovies(newTitle, page)
      .then((body) => {
        if (!body.results.length) {
          setNotFound(true);
        }
        setMovies(body.results);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorText(err.message);
        console.error(err);
        setIsLoading(false);
      });
  }
};
