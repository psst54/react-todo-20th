import styled from 'styled-components';
import { COLORS } from 'styles/constants';

export const Container = styled.main`
  display: flex;
  gap: 1rem;

  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ColumnContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  flex: 1;

  height: fit-content;
  padding: 1rem;
  background: ${(props) => COLORS.BACKGROUND[props.state.toUpperCase()]};
  border: 2px solid ${(props) => COLORS.BORDER[props.state.toUpperCase()]};
  border-radius: 1rem;
`;

export const ColumnHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubjectCount = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  background: ${(props) => COLORS.BORDER[props.state]};
  border-radius: 1rem;
`;

export const DivideLine = styled.hr`
  border: 1px solid ${(props) => COLORS.BORDER[props.state]};
`;

export const SubjectListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
