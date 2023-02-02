import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface props {
  teamName: string | string[] | undefined;
}

function TopBar({ teamName }: props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayIndex = today.getDay();
  const weekList = ['일', '월', '화', '수', '목', '금', '토'];
  const day = weekList[dayIndex];

  return (
    <StTopBox>
      <StTopBarText>&apos;{teamName}&apos; 의 티타임</StTopBarText>
      <StTopBarToday>
        {year}년 {month}월 {date}일 {day}요일
      </StTopBarToday>
    </StTopBox>
  );
}

export default TopBar;

const StTopBox = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 7rem;
  background-color: rgba(255, 252, 245, 0.8);
  backdrop-filter: blur(0.5rem);
  z-index: 1;
`;

const StTopBarText = styled.p`
  padding-top: 2rem;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.NEXON_B_14};
  text-align: center;
`;

const StTopBarToday = styled.p`
  padding-bottom: 1.6rem;
  text-align: center;
  color: ${COLOR.GRAY_7E};
  ${FONT_STYLES.NEXON_R_12};
`;
