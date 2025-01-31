import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import { SubmitButton } from 'public/assets/icons/index';
import { imgChatLogo } from 'public/assets/images/index';
import React, { useState, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { CHAT_QUESTION_LIST } from '@src/constants/chat/chatQuestion';
import { useMutation } from 'react-query';
import { postAnswer } from '@src/services';
import { StaticImageData } from 'next/image';

interface InputQuestionType {
  setQuestionIndex: Dispatch<SetStateAction<number>>;
  questionIndex: number;
  setInput: Dispatch<SetStateAction<boolean>>;
  teamId: number;
  setChat: Dispatch<SetStateAction<(string | StaticImageData)[]>>;
  grade: number;
  userId: string;
}

function InputAnswer({ setQuestionIndex, questionIndex, setInput, teamId, setChat, grade }: InputQuestionType) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [text, setText] = useState(0);

  const handleCountText = (event: React.FormEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.length >= 0) {
      setText(event.currentTarget.value.length);
    }
  };

  const handleResizeTextHeight = () => {
    if (textarea.current != null) {
      if (textarea.current.scrollHeight > 96) {
        textarea.current.style.height = 96 * 0.1 + 'rem';
        textarea.current.style.overflow = 'scroll';
      } else {
        textarea.current.style.height = '4rem';
        textarea.current.style.height = textarea.current.scrollHeight * 0.1 + 'rem';
        textarea.current.style.overflow = 'hidden';
      }
    }
  };

  const getData = useMutation(() =>
    postAnswer(
      {
        questionType: CHAT_QUESTION_LIST[questionIndex].questionType,
        questionNumber: CHAT_QUESTION_LIST[questionIndex].questionNumber,
        answer: value,
        grade: grade,
        teamId: teamId,
      },
      localStorage.getItem('accessToken'),
    ),
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.length < 1) {
      alert('답변을 입력해주세요!');
    } else {
      setChat((prev) => prev.concat(`A${value}`));
      setQuestionIndex(questionIndex + 1);
      setInput(false);
      getData.mutate();
    }
  };

  return (
    <StForm onSubmit={(e) => handleSubmit(e)}>
      <ImageDiv src={imgChatLogo} alt="Logo Icon" className="buttonLogo" fill={true} />
      <StInput
        ref={textarea}
        rows={1}
        maxLength={100}
        onChange={(event) => {
          handleResizeTextHeight();
          handleCountText(event);
          setValue(event.currentTarget.value);
        }}
        placeholder="답변을 입력해주세요."
        className="inputBox"></StInput>
      <StSubmitButton>
        <ImageDiv src={SubmitButton} alt="전송 버튼" className="SubmitButton" />
      </StSubmitButton>
      <StCountTextNumber> {text} / 100자 </StCountTextNumber>
    </StForm>
  );
}

export default InputAnswer;

const StSubmitButton = styled.button`
  position: relative;
  margin-bottom: 1.7rem;
  .SubmitButton {
    position: fixed;
    bottom: 2.7rem;
    right: 1.7rem;
  }
`;

const StCountTextNumber = styled.div`
  position: absolute;
  right: 1.8rem;
  bottom: 0.6rem;
  color: ${COLOR.GRAY_7E};
  ${FONT_STYLES.PRETENDARD_SB_12};
`;

const StForm = styled.form`
  display: flex;

  align-items: center;
  position: fixed;
  width: 100vw;
  height: auto;
  bottom: 0;
  background-color: ${COLOR.WHITE_100};
  z-index: 4;
  .buttonLogo {
    position: relative;
    width: 2.4rem;
    height: 4rem;
    margin: 0 0.8rem 2.5rem 1.6rem;
  }
`;

const StInput = styled.textarea`
  width: 71.9%;
  height: 4rem;
  bottom: 2.4rem;
  padding: 1.2rem 5.2rem 1.2rem 1.4rem;
  margin: 0.8rem 0 2.5rem 0;
  border: 0.1rem solid ${COLOR.GRAY_EC};
  border-radius: 2.6rem;
  color: ${COLOR.BLACK};
  background: ${COLOR.GRAY_EC};
  font-size: 1.7rem;
  overflow: hidden;
  outline: none;
  resize: none;
  ${FONT_STYLES.NEXON_R_16};
  &::placeholder {
    color: ${COLOR.GRAY_7E};
  }
`;
