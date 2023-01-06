import LogoTop from 'src/components/common/LogoTop';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icDots } from '@src/assets/icons';
import { UserData } from '@src/mocks/types';

function MyResult() {
  const [resultData, setResultData] = useState<UserData>();
  const { data } = useQuery('userData', () => axios.get('/api/result/ttime'));

  useEffect(() => {
    setResultData(data?.data[0]);
    console.log(resultData);
  }, [data]);

  return (
    <>
      <LogoTop />
      {resultData ? (
        <StMyResult>
          <StWarningMessage>
            <div className="warn">잠깐!</div>
            카카오톡에서 접속 시, 이미지 저장을 위해 아이폰 사용자는 사파리로 이동해주세요
          </StWarningMessage>
          <StResultCard>
            <StInfoContainer>
              <p className="date">{resultData.date}</p>
              <p className="teamName">&#39;{resultData.teamName}&#39;</p>
              <div className="resultTitle">
                <p>
                  <span className="userName">{resultData.nickname}</span> 님의
                </p>
                <p>개인 T.time 결과</p>
              </div>
            </StInfoContainer>
            <StUserImage />
            <StResultTitle>
              <p className="feedback">동기부여 부족</p>
              <p>재충전 부족한 마카롱</p>
            </StResultTitle>
            <StDotsImage src={icDots.src}></StDotsImage>
            <StResultDetail>
              <p>동기부여 가 부족한 당신! 재충전이 필요한 마카롱이네요!</p>
              <p>달달한 마카롱 한입으로 재충전해보시는 것은 어떨까요?</p>
            </StResultDetail>
            <StRecommendText>
              <p>• 비전을 갖고 목표를 세워요.</p>
              <p>• 미래에 집중하세요.</p>
              <p>• 내가 이미 미래에 성공을 이룬 것처럼 행동해보세요.</p>
              <p>• 재충전의 시간을 보내보세요.</p>
            </StRecommendText>
            <article>
              <StGraphTitle>전체 항목 결과 그래프</StGraphTitle>
              <StGraphContainer></StGraphContainer>
            </article>
            <StCardFooter></StCardFooter>
          </StResultCard>
        </StMyResult>
      ) : (
        <>로딩중</>
      )}
    </>
  );
}
export default MyResult;

const StMyResult = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StWarningMessage = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19.7rem;
  margin: 2.2rem 9.7rem 1.2rem 9.7rem;
  font-size: ${FONT_STYLES.PRETENDARD_M_12};
  color: ${COLOR.GRAY_9E};
  .warn {
    margin-bottom: 0.6rem;
    font-style: ${FONT_STYLES.PRETENDARD_B_12};
    color: ${COLOR.ORANGE_1};
  }
`;
const StResultCard = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34.6rem;
  height: 104.4rem;
  background-color: ${COLOR.IVORY_1};
  border-radius: 1.4rem;
  margin: 0rem 2.2rem 6rem 2.2rem;
  padding: 2.5rem 2.2rem 0rem 2.2rem;
`;
const StInfoContainer = styled.div`
  width: 100%;
  .date {
    font-style: ${FONT_STYLES.PRETENDARD_M_12};
    color: ${COLOR.GRAY_9E};
  }
  .teamName {
    font-style: ${FONT_STYLES.NEXON_B_16};
    color: ${COLOR.GRAY_7E};
    margin: 0.8rem 0 1.2rem 0;
  }
  .resultTitle {
    font-style: ${FONT_STYLES.NEXON_B_22};
    color: ${COLOR.BLACK};
  }
  .resultTitle p {
    margin-bottom: 0.5rem;
  }
  .userName {
    color: ${COLOR.BLUE_TEXT};
  }
`;
const StDotsImage = styled.img`
  width: 2.2rem;
  height: 0.4rem;
  margin: 2.3rem 0 1.2rem 0;
`;
const StUserImage = styled.img`
  width: 14.8rem;
  height: 16.4rem;
  margin: 6.2rem 7.6rem 5rem 7.6rem;
`;
const StResultTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18.2rem;
  height: 4.2rem;
  font-style: ${FONT_STYLES.PRETENDARD_EB_20};
  color: ${COLOR.ORANGE_TEXT};
  .feedback {
    font-style: ${FONT_STYLES.PRETENDARD_B_12};
    color: ${COLOR.BLUE_TEXT};
    margin-bottom: 0.4rem;
  }
`;
const StResultDetail = styled.div`
  font-style: ${FONT_STYLES.PRETENDARD_R_14};
  white-space: nowrap;
  color: ${COLOR.BLACK};
  .highlight {
    font-style: ${FONT_STYLES.PRETENDARD_B_14};
  }
`;
const StRecommendText = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.8rem 0 4.4rem 0;
  padding: 1.6rem 1.1rem 1.6rem 1.1rem;
  width: 30.4rem;
  height: 13.2rem;
  background-color: ${COLOR.IVORY_3};
  border-radius: 1.4rem;
  font-style: ${FONT_STYLES.PRETENDARD_M_12};
  line-height: 2.2rem;
  color: ${COLOR.BLACK};
`;
const StGraphTitle = styled.p`
  width: 30.4rem;

  font-style: ${FONT_STYLES.NEXON_B_16};
`;
const StGraphContainer = styled.article`
  width: 30.4rem;
  height: 15rem;
  background-color: ${COLOR.IVORY_3};
  border-radius: 1.4rem;
  margin: 1rem 0 4.6rem 0;
  padding: 2.5rem 1.5rem 2.5rem 2rem;
`;
const StCardFooter = styled.footer``;
