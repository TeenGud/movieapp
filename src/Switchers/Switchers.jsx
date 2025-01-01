import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import './Switchers.css';
import { SessionIdContext } from '../utils/createContext';
import { useContext } from 'react';
import { handleSearchRatedMovies } from '../utils/handleEvents';
import { getRatedMovies } from '../utils/fetch';

function Switchers({ setIsRatedPage, setRatedMovies, setIsRatedEmpty, setIsLoading, setRatedErrorText, page }) {
  const sessionId = useContext(SessionIdContext);

  const onChange = (key) => {
    if (key === '2') {
      setIsRatedPage(true);
      setIsLoading(true);
      setIsRatedEmpty(false);
      handleSearchRatedMovies(
        getRatedMovies,
        sessionId,
        page,
        setIsRatedEmpty,
        setRatedMovies,
        setIsLoading,
        setRatedErrorText
      );
    } else if (key === '1') {
      setIsRatedPage(false);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];
  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

Switchers.defaultProps = {
  page: 1,
};
Switchers.propTypes = {
  setIsRatedPage: PropTypes.func,
  setRatedMovies: PropTypes.func,
  setIsRatedEmpty: PropTypes.func,
  setIsLoading: PropTypes.func,
  setRatedErrorText: PropTypes.func,
  page: PropTypes.number,
};

export default Switchers;
