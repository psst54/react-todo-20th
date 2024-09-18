import { createGlobalStyle } from 'styled-components';
import { COLORS } from './constants';

const GlobalStyle = createGlobalStyle`
 @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

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
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    color: ${COLORS.TEXT.STANDARD};
  }

  body {
    background-color: ${COLORS.BACKGROUND.STANDARD};
  }

  form {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  input[type="text"] {
    flex: 1;

    background: transparent;

    border: none;
    border-bottom: 1px solid ${COLORS.BORDER.STANDARD};
    outline: none;
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
