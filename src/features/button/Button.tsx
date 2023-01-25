import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

const StyledButton = styled.button`
  background: #63ac20;
  color: white;
  padding: 1rem 2rem;
  font-size: 2rem;
  border-radius: 4px;
`;

interface ButtonProps {
  content?: string
  onClick?: () => void
}

//Button component draws us an html button with icon and size of the icon
const Button = ({content, onClick} : ButtonProps) : ReactElement => {
  return (
    <>
      <StyledButton onClick={onClick}>
        {content}
      </StyledButton>
    </>
  );
}

export { Button }
