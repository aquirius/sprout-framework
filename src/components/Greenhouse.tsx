import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet } from '../api/api';
import { Flexbox } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';

const StyledGreenhouse = styled.div`
`;

interface GreenhouseProps {
  uuid?: number
  guid?: number
  children?: ReactElement
}

interface GetGreenhouseProps {
  GUID: number;
  Address: string;
  Zip: number;
}

//Button component draws us an html button with icon and size of the icon
const Greenhouse = ({uuid, guid} : GreenhouseProps) : ReactElement => {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const {getData, get} = useAPIGet("/user/"+uuid+"/greenhouse/"+guid);

  useEffect(() => {
    get()
    if (loading || !getData){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [uuid, loading, guid])

  return (
    <StyledGreenhouse>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        <h1>{getData && getData.greenhouse.GUID}</h1>
        <h1>{getData && getData.greenhouse.Address}</h1> 
        <h1>{getData && getData.greenhouse.Zip}</h1> 
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
    </StyledGreenhouse>
  );
}

export { Greenhouse}
