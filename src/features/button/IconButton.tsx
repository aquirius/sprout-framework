import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

const StyledIconButton = styled.button<{size?: SizeProp}>`
  height: ${(props) => props.size === "1x" ? "25px" : "50px"};
  width: ${(props) => props.size === "1x" ? "25px" : "50px"};
  border: none;
  background: transparent;
`;

interface IconButtonProps {
  size? : SizeProp
  icon?: IconProp
  children?: ReactElement
  onClick?: (e: any) => void
}

//Button component draws us an html button with icon and size of the icon
const IconButton = ({size, icon, onClick} : IconButtonProps) : ReactElement => {
  return (
    <>
      <StyledIconButton size={size} onClick={onClick}>
        {icon && <FontAwesomeIcon icon={icon} size={size}/>}
      </StyledIconButton>
    </>
  );
}

export { IconButton }
