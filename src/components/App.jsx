import { Home } from 'pages/Home/Home';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
import { Movies } from 'pages/Movies/Movies';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';
import { SharedLayout } from './SharedLayout/SharedLayout';

export const App = () => {
  const [filmId, setFilmId] = useState('545611');

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="movies" element={<Movies />}></Route>
          <Route
            path="movies/:movieId"
            element={<MovieDetails setId={setFilmId} />}
          >
            <Route path="cast" element={<Cast id={filmId} />}></Route>
            <Route path="reviews" element={<Reviews id={filmId} />}></Route>
          </Route>
          <Route path="*" element={<div>Home page</div>} />
        </Route>
      </Routes>
    </div>
  );
};
