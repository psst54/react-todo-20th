import styled from 'styled-components';
import { COLORS } from 'styles/constants';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button`
  padding: 0.25rem 0.5rem;

  border: 1px solid ${COLORS.BORDER.STANDARD};
  border-radius: 1rem;

  white-space: nowrap;

  cursor: pointer;
`;
