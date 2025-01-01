import { Input } from 'antd';
import './SearchInput.css';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { handleSearch } from '../utils/handleEvents';
import { getMovies } from '../utils/fetch';

function SearchInput({ title, setTitle, setMovies, setIsLoading, setErrorText, setIsEmpty, setNotFound, page }) {
  const debouncedSearch = useCallback(debounce(handleSearch, 600, { maxWait: 1000 }), []);
  const handleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(() => e.target.value);
    setErrorText('');
    setIsLoading(true);
    debouncedSearch(newTitle, setIsEmpty, setNotFound, getMovies, page, setMovies, setIsLoading, setErrorText);
  };
  return (
    <div className="input_container">
      <Input className="input" placeholder="Type to search..." value={title} onChange={(e) => handleChange(e)} />
    </div>
  );
}

SearchInput.defaultProps = {
  page: 1,
};
SearchInput.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  setMovies: PropTypes.func,
  setIsLoading: PropTypes.func,
  setErrorText: PropTypes.func,
  setIsEmpty: PropTypes.func,
  setNotFound: PropTypes.func,
  page: PropTypes.number,
};

export default SearchInput;
