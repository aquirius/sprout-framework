import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { LightTheme } from '../../schema/color';

const StyledButton = styled.button`
  background: ${LightTheme.palette.secondary};
  color: white;
  padding: 1rem 2rem;
  font-size: 2rem;
  border-radius: 2.5rem;
  border: none;
  box-shadow: none;
`;

interface ButtonProps {
  content?: string
  type?: "button" | "submit" | "reset"
  onClick?: () => void
}

//Button component draws us an html button with icon and size of the icon
const Button = ({type, content, onClick} : ButtonProps) : ReactElement => {
  return (
    <>
      <StyledButton type={type} onClick={onClick}>
        {content}
      </StyledButton>
    </>
  );
}

export { Button }
