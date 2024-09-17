import { createGlobalStyle } from 'styled-components';
import { COLORS } from './constants';

const GlobalStyle = createGlobalStyle`
 /* 기본 margin, padding 제거 */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 리스트 스타일 제거 */
  ul,
  ol {
    list-style: none;
  }

  * {
    color: ${COLORS.TEXT.STANDARD};
  }

  body {
    background-color: ${COLORS.BACKGROUND.STANDARD};
  }

`;

export default GlobalStyle;
