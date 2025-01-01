import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin, Alert } from 'antd';
import Movie from '../Movie';
import './List.css';
import { useContext } from 'react';
import { GenresContext } from '../utils';

function List({ movies, isLoading, errorText, isEmpty, notFound, ratedMovies, isRatedPage }) {
  const genres = useContext(GenresContext);
  if (notFound) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Alert message="There is no such film" type="info" style={{ fontSize: 30, marginTop: 30 }} />
      </Flex>
    );
  } else if (isEmpty) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Alert message="Find something" type="info" style={{ fontSize: 30, marginTop: 30 }} />
      </Flex>
    );
  } else if (isLoading) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, marginTop: 30 }} spin />} />
      </Flex>
    );
  } else if (errorText) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Alert message={errorText} type="error" style={{ marginTop: 30 }} />
      </Flex>
    );
  } else {
    const listOfMovies = [];
    const ratedMoviesRatings = {};
    ratedMovies.map(({ id, rating }) => {
      ratedMoviesRatings[id] = rating;
    });
    const ratedMoviesIds = ratedMovies.map(({ id }) => id);
    for (let i of movies) {
      const genresNames = [];
      const genresIds = i.genre_ids; //list
      for (let j of genres) {
        if (genresIds.includes(j.id)) {
          genresNames.push(j.name);
        }
      }
      if (ratedMoviesIds.includes(i.id)) {
        listOfMovies.push(
          <Movie
            key={`${i.id}list`}
            movieId={i.id}
            title={i.title}
            description={i.overview}
            popularity={i.popularity}
            poster={i.poster_path}
            release_date={i.release_date}
            vote_average={i.vote_average}
            rating={Number(ratedMoviesRatings[i.id])}
            genresNames={genresNames}
            isRatedPage={isRatedPage}
          />
        );
      } else {
        listOfMovies.push(
          <Movie
            key={`${i.id}list`}
            movieId={i.id}
            title={i.title}
            description={i.overview}
            popularity={i.popularity}
            poster={i.poster_path}
            release_date={i.release_date}
            vote_average={i.vote_average}
            genresNames={genresNames}
          />
        );
      }
    }
    return <ul className="moviesList">{listOfMovies}</ul>;
  }
}

List.propTypes = {
  movies: PropTypes.array,
  ratedMovies: PropTypes.array,
  isLoading: PropTypes.bool,
  errorText: PropTypes.string,
  isEmpty: PropTypes.bool,
  notFound: PropTypes.bool,
  isRatedPage: PropTypes.bool,
};

export default List;
