import styled from 'styled-components';
import { COLOR } from './constants';

export const Container = styled.main`
  display: flex;
  gap: 1rem;

  width: 100%;
`;

export const ColumnContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  flex: 1;

  height: fit-content;
  padding: 1rem;
  background: ${(props) => COLOR[props.$state].background};
  border: 3px solid ${(props) => COLOR[props.$state].border};
  border-radius: 1rem;
`;

export const ColumnTitle = styled.h2``;

export const DivideLine = styled.hr`
  border: 1px solid ${(props) => COLOR[props.$state].border};
`;

export const SubjectListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
