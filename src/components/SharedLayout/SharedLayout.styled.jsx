import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  color: #212121;
  text-decoration: none;
  font-size: 25px;
  font-weight: 500;

  &.active {
    color: orangered;
  }
`;

export const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 2px solid silver;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;
