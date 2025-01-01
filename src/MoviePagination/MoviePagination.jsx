import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import './MoviePagination.css';
import { useContext } from 'react';
import { SessionIdContext } from '../utils/createContext';
import { getMovies, getRatedMovies } from '../utils/fetch';
import { handleSearch, handleSearchRatedMovies } from '../utils/handleEvents';

function MoviePagination({
  setPage,
  title,
  setNotFound,
  setMovies,
  setIsLoading,
  setErrorText,
  setIsEmpty,
  setIsRatedEmpty,
  setRatedMovies,
  setRatedErrorText,
}) {
  const sessionId = useContext(SessionIdContext);
  const handleChange = (page) => {
    setPage(page);
    setErrorText('');
    setIsLoading(true);
    setNotFound(false);
    handleSearch(title, setIsEmpty, setNotFound, getMovies, page, setMovies, setIsLoading, setErrorText);

    handleSearchRatedMovies(
      getRatedMovies,
      sessionId,
      page,
      setIsRatedEmpty,
      setRatedMovies,
      setIsLoading,
      setRatedErrorText
    );
  };
  return (
    <div className="moviePagination">
      <Pagination defaultCurrent={1} total={50} onChange={handleChange} />
    </div>
  );
}

MoviePagination.propTypes = {
  title: PropTypes.string,
  setPage: PropTypes.func,
  setMovies: PropTypes.func,
  setIsLoading: PropTypes.func,
  setErrorText: PropTypes.func,
  setIsEmpty: PropTypes.func,
  setNotFound: PropTypes.func,
  setIsRatedEmpty: PropTypes.func,
  setRatedMovies: PropTypes.func,
  setRatedErrorText: PropTypes.func,
};

export default MoviePagination;
