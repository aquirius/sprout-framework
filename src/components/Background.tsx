
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div<{expand?: boolean}>`
  position fixed;
  width: 100%;
  z-index: -1;
  background: linear-gradient(90deg, #63ac20 0%, #095a04 100%);
  height: ${(props) => props.expand ? "300px" : "150px"};
  transform: skew(30deg, 15deg);
  top: 0;
`;

interface BackgroundProps {
    expand?: boolean
}

//User page does import our table component and is bound to our react routing system
const Background = ({expand}:BackgroundProps) : ReactElement => {

return (
    <>
    <StyledBackground expand={expand}/>
    </>
);
}
  
  export { Background }