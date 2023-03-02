import LogoTop from '@src/components/common/LogoTop';
import styled from 'styled-components';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';
import { useQuery } from 'react-query';
import { getMyPage } from '@src/services';

interface myPageDataType {
  date: string;
  teamName: string;
}

function MyPage() {
  const { data } = useQuery('myPageData', () => getMyPage());

  return (
    <StMyPage>
      <LogoTop />
      <LogoutBtn>Logout</LogoutBtn>
      <StMainContainer>
        <StResultContainer>
          <StTitle>{data.userName}의 지난 T.time</StTitle>
          {data.history.map(({ date, teamName }: myPageDataType) => {
            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            };
            const dateObj = new Date(date);
            const processDate = dateObj.toLocaleDateString('ko-kr', options).replaceAll(' ', '');
            return (
              <StResult key={date}>
                <StDate>진행일 : {processDate}</StDate>
                <StTeam>
                  ‘{teamName}’ 팀의 <span>T</span>
                  <span>.</span>time
                </StTeam>
                <StButtonWrapper>
                  <StResultBtn>개인 결과 보기</StResultBtn>
                  <StResultBtn>팀 결과 보기</StResultBtn>
                </StButtonWrapper>
              </StResult>
            );
          })}
        </StResultContainer>
      </StMainContainer>
    </StMyPage>
  );
}
export default MyPage;

const StMyPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const StMainContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${COLOR.IVORY_3};
`;
const StResultContainer = styled.div`
  width: 35.6rem;
`;
const StResult = styled.div`
  width: 100%;
  height: 12.7rem;
  background-color: ${COLOR.IVORY_1};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.2rem;
  margin-top: 1.6rem;
  border-radius: 12px;
`;
const LogoutBtn = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 2rem;
  width: 5.7rem;
  height: 2.6rem;
  border: 0.2rem solid ${COLOR.GRAY_7E};
  border-radius: 2rem;
  color: ${COLOR.GRAY_7E};
  ${FONT_STYLES.PRETENDARD_M_12}
  z-index: 3;
`;
const StTitle = styled.h2`
  margin-top: 2rem;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.PRETENDARD_B_20};
`;
const StDate = styled.div`
  height: 1.4rem;
  margin-bottom: 0.8rem;
  ${FONT_STYLES.PRETENDARD_M_12}
  line-height: 14px;
  color: ${COLOR.GRAY_7E};
`;
const StTeam = styled.h4`
  height: 2.2rem;
  ${FONT_STYLES.NEXON_B_16};
  color: ${COLOR.BLACK};
  line-height: 140%;
  span:first-child {
    color: ${COLOR.ORANGE_1};
  }
  span:last-child {
    color: ${COLOR.BLUE_TEXT};
  }
`;
const StButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2.5rem;
`;
const StResultBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 3.4rem;
  border-radius: 2rem;
  ${FONT_STYLES.PRETENDARD_B_16}
  color: ${COLOR.WHITE_100};
  &:nth-of-type(1) {
    background-color: ${COLOR.ORANGE_1};
  }
  &:nth-of-type(2) {
    background-color: ${COLOR.BLUE_TEXT};
  }
`;
