import SEO from '@common/SEO';
import styled from 'styled-components';
import ImageDiv from '@common/ImageDiv';
import { imgLetter } from 'public/assets/images/index';
import TeamInput from '@src/components/invite/TeamInput';
import TextTop from '@common/TextTop';
import BottomButton from '@common/BottomButton';
import { COLOR } from '@src/styles/color';
import useManageScroll from '@src/hooks/UseManageScroll';
import { useState } from 'react';
import router from 'next/router';
import { useMutation } from 'react-query';
import { getTeamInfo } from '@src/services';
import { TeamInfoData } from '@src/services/types';
import ToolTipIcon from '@src/components/common/ToolTipIcon';

function Invite() {
  useManageScroll();

  const [teamName, setTeamName] = useState<string>('');
  const [teamMember, setTeamMember] = useState<string>('');
  const saveData = useMutation(
    () =>
      getTeamInfo({ teamName: teamName.trim(), teamMember: Number(teamMember) }, localStorage.getItem('accessToken')),
    {
      onSuccess: (response: TeamInfoData) => {
        router.push({
          pathname: `/invite/${response?.id}`,
          query: { teamNum: response?.teamMember, teamId: response?.id, teamName: response?.teamName },
        });
      },
      onError: () => {
        alert('초대장을 만드는데 실패했어요');
      },
    },
  );
  const validator = {
    teamName: {
      regEx: /^.{0,14}$/,
      alertMsg: '팀 이름은 최대 14까지 입력 가능해요',
    },
    teamMember: {
      regEx: /^[0-9]+$/,
      alertMsg: '팀 인원 수는 숫자만 입력 가능해요',
    },
  };
  const toNext = () => {
    if (!teamName.trim()) {
      alert('프로젝트/팀명 입력은 필수예요.');
    } else if (!teamMember.trim()) {
      alert('팀 인원 수 입력은 필수예요.');
    } else {
      saveData.mutate();
    }
  };
  return (
    <>
      <ToolTipIcon top={5.8} />
      <StInvite>
        <SEO title="T.time | 팀과 내가 함께 성장하는 시간" description="T.time | 팀과 내가 함께 성장하는 시간" />
        <TextTop text="초대장 만들기" />
        <ImageDiv src={imgLetter} alt="편지이미지" className="letterImg" />
        <StForm action="post">
          <TeamInput
            label="프로젝트 또는 팀 이름"
            placeholder="14자 이내로 입력해 주세요"
            validation={validator.teamName.regEx}
            alertMsg={validator.teamName.alertMsg}
            inputVal={teamName}
            setInput={setTeamName}
          />
          <TeamInput
            label="팀 인원 수"
            placeholder="팀의 인원 수를 입력해주세요"
            validation={validator.teamMember.regEx}
            alertMsg={validator.teamMember.alertMsg}
            pattern="\d*"
            inputVal={teamMember}
            setInput={setTeamMember}
          />
        </StForm>
        <BottomButton width={28.2} color={COLOR.ORANGE_1} text={'다음'} handler={toNext} />
      </StInvite>
    </>
  );
}

export default Invite;

const StInvite = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  min-height: calc(var(--vh) * 100);
  padding-bottom: 4rem;
  background-color: ${COLOR.IVORY_1};
  text-align: center;
  .letterImg img {
    width: 16.8rem;
    height: 16.8rem;
    margin-top: 9rem;
    margin-bottom: 4rem;
  }
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 8.6rem;
`;
