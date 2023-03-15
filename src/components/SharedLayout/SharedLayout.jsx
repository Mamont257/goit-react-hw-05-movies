import { Outlet } from 'react-router-dom';
import { List, StyledLink } from './SharedLayout.styled';

export function SharedLayout() {
  return (
    <>
      <header>
        <nav>
          <List>
            <li>
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li>
              <StyledLink to="/movies">Movies</StyledLink>
            </li>
          </List>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
