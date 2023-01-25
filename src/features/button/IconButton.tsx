import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

const StyledIconButton = styled.button`
  height: 50px;
  width:50px;
  border: 1px solid lightgrey;
  background: transparent;
`;

interface IconButtonProps {
  size? : SizeProp
  icon?: IconProp
  children?: ReactElement
  onClick?: () => void
}

//Button component draws us an html button with icon and size of the icon
const IconButton = ({size, icon, onClick} : IconButtonProps) : ReactElement => {
  return (
    <>
      <StyledIconButton onClick={onClick}>
        {icon && <FontAwesomeIcon icon={icon} size={size}/>}
      </StyledIconButton>
    </>
  );
}

export { IconButton }
