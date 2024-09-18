import styled from 'styled-components';
import { COLORS } from 'styles/constants';

export const Container = styled.li`
  padding: 1rem;

  background: ${COLORS.BACKGROUND.CARD};

  border: 1px solid ${COLORS.BORDER.CARD};
  border-radius: 1rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const TaskCount = styled.span`
  color: ${COLORS.TEXT.DARK};
  font-weight: 100;
  font-size: 0.8rem;
`;
