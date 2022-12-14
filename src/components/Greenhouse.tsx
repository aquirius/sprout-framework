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
 //build our request
 const addStack = new Request("/user/"+uuid+"/greenhouse/"+guid+"/add-stack", {
  method: "post",
  body: JSON.stringify({
    UUID: uuid,
    GUID: guid
  }),
  headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Method": "add"
  }
});

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

  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onSubmitStack = () => {
    fetch(addStack).then(res => {
      console.log(res)
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
      setStacks(json.stacks)
    }).catch(error => {
        console.log(error);
    });
  }


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
        <Button size='4x' icon={faPlus as IconProp} onClick={onSubmitStack}></Button>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Greenhouse }
