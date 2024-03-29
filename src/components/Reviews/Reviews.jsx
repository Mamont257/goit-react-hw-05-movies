import { useEffect, useState } from 'react';

export function Reviews({ id }) {
  const [filmReviews, setFilmReviews] = useState([]);

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = '158819e65eb0fbf8513ba7b934c25216';

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        setFilmReviews(data.results);
      });
  }, [id]);

  return (
    <section>
      {filmReviews.length ? (
        <ul>
          {filmReviews.map(({ author, content, id }) => {
            return (
              <li key={id}>
                <h3>Author: {author}</h3>
                <p>`{content}`</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </section>
  );
}
