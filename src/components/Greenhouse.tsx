import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { json } from 'stream/consumers';
import styled from 'styled-components';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
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

  const [data, setData] = useState<GetGreenhouseProps>()
  const [stacks, setStacks] = useState<any>()
  const [pots, setPots] = useState<any>()


  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [greenhouseUUID, setGreenhouseUUID] = useState(0);
  const [stackUUID, setStackUUID] = useState(0);

  const nav = useNavigate();    

  useEffect(() => {
    fetch("/user/"+uuid+"/greenhouse/"+guid)
    .then((res) => {
      setMessage(res.statusText)
      return res.json()})
    .then((json) => {
      console.log(json)
      setData(json.greenhouse)
    })
    .finally(() => setLoading(false))
  }, [uuid, loading])

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        <h1>{data && data.GUID}</h1>
        <h1>{data && data.Address}</h1> 
        <h1>{data && data.Zip}</h1> 
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Greenhouse }
