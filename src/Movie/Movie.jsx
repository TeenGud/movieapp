import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { Button } from 'antd';
import { Image } from 'antd';
import './Movie.css';
import { useContext, useState } from 'react';
import { SessionIdContext } from '../utils/createContext';
import { addRaiting } from '../utils/fetch';
import { colors, fallback, sliceDescription } from '../utils';

function Movie({ title, description, poster, release_date, vote_average, movieId, rating, genresNames, isRatedPage }) {
  const [rateValue, setRateValue] = useState(rating ? Number(rating) : 0);
  const sessionId = useContext(SessionIdContext);
  const colorClass =
    vote_average < 3 ? colors[3] : vote_average < 5 ? colors[5] : vote_average < 7 ? colors[7] : colors[11];
  const handleButtonClick = (e) => {
    e.preventDefault();
  };

  const onChangeRaiting = (value) => {
    setRateValue(value);
    addRaiting(movieId, sessionId, value);
  };
  const genres = [];
  for (let i of genresNames) {
    genres.push(
      <Button key={i} className="tag" onClick={handleButtonClick}>
        {i}
      </Button>
    );
  }
  return (
    <li className="movie">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${poster}`}
        alt={title}
        width={183}
        height={281}
        fallback={fallback}
        className="movie_poster"
      />
      <div className="info">
        <div className="title_and_rate">
          <h3 className="title">{title}</h3>
          <span className={`rate ${colorClass}`}>{vote_average?.toFixed(1) || 0.0}</span>
        </div>
        <p className="date">{release_date}</p>
        <div className="tags">{genres}</div>
        <p className="description">{sliceDescription(description)}</p>
        <Rate
          className="stars"
          allowHalf
          defaultValue={0}
          count={10}
          onChange={onChangeRaiting}
          value={rateValue}
          disabled={isRatedPage}
        />
      </div>
    </li>
  );
}

Movie.defaultProps = {
  page: 1,
};
Movie.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  poster: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  movieId: PropTypes.number,
  rating: PropTypes.number,
  genresNames: PropTypes.array,
  isRatedPage: PropTypes.bool,
};

export default Movie;
