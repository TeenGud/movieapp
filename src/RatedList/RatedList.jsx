import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Flex, Spin, Alert } from 'antd';
import Movie from '../Movie';
import './RatedList.css';
import { useContext } from 'react';
import { GenresContext } from '../utils';

function RatedList({ ratedMovies, isLoading, isRatedEmpty, ratedErrorText }) {
  const genres = useContext(GenresContext);
  if (isLoading) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, marginTop: 30 }} spin />} />
      </Flex>
    );
  } else if (isRatedEmpty) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Alert message="Rate something" type="info" style={{ fontSize: 30, marginTop: 30 }} />
      </Flex>
    );
  } else if (ratedErrorText) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Alert message={ratedErrorText} type="error" style={{ marginTop: 30 }} />
      </Flex>
    );
  } else {
    const listOfRatedMovies = [];
    for (let i of ratedMovies) {
      const genresNames = [];
      const genresIds = i.genre_ids; //list
      for (let j of genres) {
        if (genresIds.includes(j.id)) {
          genresNames.push(j.name);
        }
      }
      listOfRatedMovies.push(
        <Movie
          key={`${i.id}rated`}
          movieId={i.id}
          title={i.title}
          description={i.overview}
          popularity={i.popularity}
          poster={i.poster_path}
          release_date={i.release_date}
          vote_average={i.vote_average}
          rating={i.rating}
          genresNames={genresNames}
        />
      );
    }
    return <ul className="moviesList">{listOfRatedMovies}</ul>;
  }
}

RatedList.propTypes = {
  ratedMovies: PropTypes.array,
  ratedErrorText: PropTypes.string,
  isLoading: PropTypes.bool,
  isRatedEmpty: PropTypes.bool,
};

export default RatedList;
