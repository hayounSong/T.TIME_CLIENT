import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import { SubmitButton } from '@src/assets/icons/index';
import { smallLogoIcon } from '@src/assets/icons/index';
import React, { useState, useRef } from 'react';

function InputAnswer() {
  const textarea = useRef<HTMLTextAreaElement>(null);
  // const countTextNumber = '000';
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    setValue('0');
  };

  return (
    <StForm onSubmit={onSubmit}>
      <ImageDiv src={smallLogoIcon} alt="small Input Logo" className="buttonLogo" />
      <StInput
        ref={textarea}
        rows={1}
        maxLength={99}
        onChange={(event) => {
          handleResizeTextHeight();
          handleCountText(event);
        }}
        placeholder="답변을 입력해주세요."
        className="inputBox"></StInput>
      <button>
        <ImageDiv src={SubmitButton} alt="전송 버튼" className="SubmitButton" />
      </button>
      <StCountTextNumber> {text} / 100자 </StCountTextNumber>
    </StForm>
  );
}

export default InputAnswer;

const StCountTextNumber = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 0.6rem;
  color: ${COLOR.GRAY_7E};
  ${FONT_STYLES.PRETENDARD_SB_12};
`;

const StForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: auto;
  bottom: 0;
  background-color: ${COLOR.WHITE_100};
  z-index: 4;
  .buttonLogo {
    width: 2.4rem;
    height: 4rem;
    margin: 0 0.8rem 2.5rem 1.6rem;
  }

  .submitButton {
    position: absolute;
    bottom: 2.7rem;
    right: 2.3rem;
    margin-right: 0.2rem;
  }
`;

const StInput = styled.textarea`
  width: 32.6rem;
  height: 4rem;
  bottom: 2.4rem;
  padding: 1.2rem 5.2rem 1.2rem 1.4rem;
  margin: 0.8rem 0 2.5rem 0;
  border: 0.1rem solid ${COLOR.GRAY_EC};
  border-radius: 2.6rem;
  color: ${COLOR.GRAY_7E};
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