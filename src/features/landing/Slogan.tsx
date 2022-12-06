import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledSlogan = styled.div<{rotate: string; positionY: string}>`
    background: transparent;
    position: absolute;
    width:100%;
    top:200px;
    text-align: center;
    transition: 0.5s all ease;
    transform: rotate3d(1, 1, 1, ${props => props.rotate}deg) translateY(${props => props.positionY}px);
`;

const StyledSloganCore = styled.span`
    font-size: 2rem;
    mix-blend-mode:difference;
    transform: translateZ(100px);
`;

const StyledSloganWrapper = styled.div`
  height: 1200px;
  position: relative;
  overflow: hidden;
`;

interface SloganProps {
  headContentString: string;
  bodyContentString: string;
  footerContentString: string;
  angle: number;
  offset: number;
}

const Slogan = ({headContentString, bodyContentString, footerContentString, angle, offset}: SloganProps) : ReactElement => {
  //initialize with empty states
  const [rotationGreeting, setRotationGreeting] = useState("");
  const [rotationAbout, setRotationAbout] = useState("");
  const [rotationArrow, setRotationArrow] = useState("");


  const [translationGreeting, setTranslationGreeting] = useState("");
  const [translationAbout, setTranslationAbout] = useState("");
  const [translationArrow, setTranslationArrow] = useState("");

  
  const handleScroll = () => {
      const position = window.pageYOffset;
      const rotateGreeting = ((position / 30)-angle)<=0 ? ((position / 30)-angle) : 0;
      const rotateAbout = ((position / 30)-(angle+10))<=0 ? ((position / 30)-(angle+10)) : 0;
      const rotateArrow = ((position / 30)-(angle+20))<=0 ? ((position / 30)-(angle+20)) : 0;

      const translateGreeting = (position/3)<=offset ? (position/3) : offset;
      const translateAbout = (position/2)<=(offset+200) ? (position/2) : (offset+200);
      const translateButton = (position/1)<=(offset+400) ? (position/1) : (offset+400);
      setRotationGreeting(rotateGreeting.toString())
      setRotationAbout(rotateAbout.toString())
      setRotationArrow(rotateArrow.toString())

      setTranslationGreeting(translateGreeting.toString());
      setTranslationAbout(translateAbout.toString())
      setTranslationArrow(translateButton.toString())
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

return (
    <>
    <StyledSloganWrapper>
        <StyledSlogan rotate={rotationGreeting} positionY={translationGreeting}>
          <StyledSloganCore>
            {headContentString}
          </StyledSloganCore>
        </StyledSlogan>
        <StyledSlogan rotate={rotationAbout} positionY={translationAbout}>
          <StyledSloganCore>
          {bodyContentString}
          </StyledSloganCore>
        </StyledSlogan>
        <StyledSlogan rotate={rotationArrow} positionY={translationArrow}>
          <StyledSloganCore>
          <FontAwesomeIcon size='2x' icon={"angle-down"}></FontAwesomeIcon>
          {footerContentString}
          </StyledSloganCore>
        </StyledSlogan>
    </StyledSloganWrapper>
    </>
  );
}

export { Slogan }
