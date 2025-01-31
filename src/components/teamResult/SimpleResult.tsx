import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { imgCenturyGothicLogo } from 'public/assets/images';
import { getTeamResult } from '@src/services';
import { useQuery } from 'react-query';
import { filterQuestionType } from '@src/hooks/FilterQuestionType';
import {
  imgTartPositive,
  imgMacaronPositive,
  imgTartNegative,
  imgEclairNegative,
  imgEclairPositive,
  imgMacaronNegative,
  imgCanelePositive,
  imgCaneleNegative,
  imgSaltbreadPositive,
  imgSaltbreadNegative,
} from 'public/assets/images';
interface TeamResultProps {
  teamId: number;
}

function SimpleResult({ teamId }: TeamResultProps) {
  const { data } = useQuery('teamResult', () => getTeamResult(teamId), {
    enabled: !!teamId,
  });

  const handleDate = (date: string) => {
    return date && date.replaceAll('-', '.');
  };

  const checkSpelling = (category: string) => {
    const categoryKorean = filterQuestionType(category);
    const charCode = categoryKorean?.charCodeAt(categoryKorean.length - 1);
    const consonantCode = (charCode - 44032) % 28;
    if (consonantCode === 0) {
      return '가';
    }
    return '이';
  };

  const handleImgSrc = (isGood: boolean, category: string) => {
    if (isGood) {
      switch (category) {
        case 'a':
          return { src: imgTartPositive.src, alt: '웃는 타르트' };
        case 'b':
          return { src: imgMacaronPositive.src, alt: '웃는 마카롱' };
        case 'c':
          return { src: imgEclairPositive.src, alt: '웃는 에끌레어' };
        case 'd':
          return { src: imgCanelePositive.src, alt: '웃는 까눌레' };
        case 'e':
          return { src: imgSaltbreadPositive.src, alt: '웃는 소금빵' };
        default:
          return { src: '', alt: '' };
      }
    } else {
      switch (category) {
        case 'a':
          return { src: imgTartNegative.src, alt: '우는 타르트' };
        case 'b':
          return { src: imgMacaronNegative.src, alt: '우는 마카롱' };
        case 'c':
          return { src: imgEclairNegative.src, alt: '우는 에끌레어' };
        case 'd':
          return { src: imgCaneleNegative.src, alt: '우는 까눌레' };
        case 'e':
          return { src: imgSaltbreadNegative.src, alt: '우는 소금빵' };
        default:
          return { src: '', alt: '' };
      }
    }
  };

  const { date, teamName, good, bad } = data?.data || {};
  return (
    <StSimpleResult>
      <StDate>{handleDate(date)}</StDate>
      <StTeamName>&#39;{teamName}&#39;</StTeamName>
      <StTeamResultText>
        <p>팀</p>
        <img src={imgCenturyGothicLogo.src} alt="T.time" className="logo" />
        <p>결과</p>
      </StTeamResultText>
      <StImageContainer>
        <img className="emoticon" alt={handleImgSrc(true, good).alt} src={handleImgSrc(true, good).src} />
        <img className="emoticon" alt={handleImgSrc(false, bad).alt} src={handleImgSrc(false, bad).src} />
      </StImageContainer>
      <StTeamInfoDetail>
        <p>우리 팀은요..</p>
        <p>
          <span style={{ color: COLOR.BLUE_TEXT }}>{filterQuestionType(good)}</span>
          {checkSpelling(good)} 가장 뛰어나고,
          <br />
          <span style={{ color: COLOR.ORANGE_TEXT }}>{filterQuestionType(bad)}</span>
          {checkSpelling(bad)} 가장 필요해요.
        </p>
      </StTeamInfoDetail>
    </StSimpleResult>
  );
}

export default SimpleResult;

const StSimpleResult = styled.div``;

const StDate = styled.p`
  margin-bottom: 0.8rem;
  color: ${COLOR.GRAY_9E};
  ${FONT_STYLES.PRETENDARD_M_12};
  line-height: 1.432rem;
`;

const StTeamName = styled.p`
  margin-bottom: 0.8rem;
  color: ${COLOR.GRAY_7E};
  ${FONT_STYLES.NEXON_B_16};
  line-height: 2.24rem;
`;

const StTeamResultText = styled.div`
  display: flex;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.NEXON_B_22}
  line-height: 2.64rem;
  .logo {
    position: relative;
    width: 7.2rem;
    height: 2.8rem;
    bottom: 0.3rem;
    margin: 0 0.4rem;
  }
`;

const StImageContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  margin: 5.2rem 0 2.8rem 2.1rem;
  .emoticon {
    position: relative;
    width: 12.5rem;
    height: 12.5rem;
  }
`;

const StTeamInfoDetail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5.2rem;
  text-align: center;
  & > p:first-of-type {
    margin-bottom: 0.6rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.PRETENDARD_B_14};
  }
  & > p:nth-of-type(2) {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.PRETENDARD_B_20};
    & > span {
      ${FONT_STYLES.PRETENDARD_EB_20};
    }
  }
`;
