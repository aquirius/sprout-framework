import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAPIGet } from '../api/api';
import { Flexbox } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';
import { LightTheme } from '../schema/color';
import { IconButton } from '../features/button/IconButton';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Stacks } from './Stacks';

const StyledGreenhouse = styled.div`
  position: relative;
  background-color: ${LightTheme.palette.light};
  min-height: 300px;
  min-width: 300px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledGreenhouseHeader = styled.div`
`;

const StyledGreenhouseContent = styled.div`
  margin-top: 2rem;
`;

interface GreenhouseProps {
  uuid?: number
  guid?: number
  children?: React.ReactNode
  onClick?: (event : any) => void
}

interface GetGreenhouseProps {
  GUID: number;
  Address: string;
  Zip: number;
}

//Button component draws us an html button with icon and size of the icon
const Greenhouse = ({uuid, guid, onClick} : GreenhouseProps) : ReactElement => {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const nav = useNavigate()

  return (
    <StyledGreenhouse>
      <StyledGreenhouseContent>
        <Stacks uuid={uuid} guid={guid} onClick={() => {}}></Stacks>
      </StyledGreenhouseContent>
    </StyledGreenhouse>
  );
}

export { Greenhouse }
