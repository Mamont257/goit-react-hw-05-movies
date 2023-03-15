import { useEffect, useState } from 'react';

export function Cast({ id }) {
  const [filmCasts, setFilmCasts] = useState([]);

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    fetch(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        setFilmCasts(data.cast);
      });
  }, [id]);

  return (
    <section>
      <ul>
        {filmCasts.map(({ original_name, character, profile_path, id }) => {
          return (
            <li key={id}>
              <img
                src={IMAGE_BASE_URL + profile_path}
                alt={original_name}
                width="100px"
              />
              <p>{original_name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
