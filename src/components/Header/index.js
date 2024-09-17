import { Title } from './styles';

export default function Header() {
  return (
    <header>
      <Title>{getCurrentDate()}</Title>
    </header>
  );
}

function getCurrentDate() {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}
