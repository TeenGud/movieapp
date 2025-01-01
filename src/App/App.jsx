import { useEffect, useState } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Flex, Alert } from 'antd';
import Header from '../Header';
import List from '../List';
import MoviePagination from '../MoviePagination';
import SearchInput from '../SearchInput';
import Switchers from '../Switchers';
import './App.css';
import { GenresContext, SessionIdContext } from '../utils/createContext';
import RatedList from '../RatedList';
import ErrorBoundary from '../ErrorBoundary';
import { genres, sessionId } from '../utils/handleEvents';
import { getRatedMovies } from '../utils/fetch';

function App() {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(1);

  const [isRatedPage, setIsRatedPage] = useState(false);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isRatedEmpty, setIsRatedEmpty] = useState(true);
  const [ratedErrorText, setRatedErrorText] = useState('');

  useEffect(() => {
    getRatedMovies(sessionId, page)
      .then((body) => {
        if (!body.results.length) {
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
  }, []);

  return (
    <>
      <Offline>
        <Flex align="center" gap="middle" justify="center">
          <Alert message="No internet connection" type="error" style={{ marginTop: 60, fontSize: 30 }} />
        </Flex>
      </Offline>
      <Online>
        <ErrorBoundary>
          <SessionIdContext.Provider value={sessionId}>
            <GenresContext.Provider value={genres}>
              <section className="moviesapp">
                <Header>
                  <Switchers
                    setIsRatedPage={setIsRatedPage}
                    setRatedMovies={setRatedMovies}
                    setIsRatedEmpty={setIsRatedEmpty}
                    setIsLoading={setIsLoading}
                    setErrorText={setErrorText}
                    setRatedErrorText={setRatedErrorText}
                    page={page}
                  />

                  {!isRatedPage ? (
                    <SearchInput
                      title={title}
                      setTitle={setTitle}
                      setMovies={setMovies}
                      setIsLoading={setIsLoading}
                      setErrorText={setErrorText}
                      setIsEmpty={setIsEmpty}
                      setNotFound={setNotFound}
                      page={page}
                    />
                  ) : (
                    <></>
                  )}
                </Header>

                {isRatedPage ? (
                  <RatedList
                    ratedMovies={ratedMovies}
                    isLoading={isLoading}
                    isRatedEmpty={isRatedEmpty}
                    errorText={errorText}
                  />
                ) : (
                  <List
                    movies={movies}
                    isLoading={isLoading}
                    ratedErrorText={ratedErrorText}
                    isEmpty={isEmpty}
                    notFound={notFound}
                    ratedMovies={ratedMovies}
                    isRatedPage={isRatedPage}
                  />
                )}

                <MoviePagination
                  setIsEmpty={setIsEmpty}
                  page={page}
                  setPage={setPage}
                  title={title}
                  setNotFound={setNotFound}
                  setMovies={setMovies}
                  setIsLoading={setIsLoading}
                  setErrorText={setErrorText}
                  setIsRatedEmpty={setIsRatedEmpty}
                  setRatedMovies={setRatedMovies}
                  setRatedErrorText={setRatedErrorText}
                />
              </section>
            </GenresContext.Provider>
          </SessionIdContext.Provider>
        </ErrorBoundary>
      </Online>
    </>
  );
}

export default App;
