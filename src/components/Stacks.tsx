import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';

const StyledStacks = styled.div`
`;

interface StacksProps {
  uuid?: number
  guid?: number
  children?: ReactElement
}

interface StacksProps {
}

//Button component draws us an html button with icon and size of the icon
const Stacks = ({uuid, guid} : StacksProps) : ReactElement => {

  const [data, setData] = useState<any>()
  const [stacks, setStacks] = useState<any>()
  const [pots, setPots] = useState<any>()


  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [StacksUUID, setStacksUUID] = useState(0);
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
    fetch("/user/"+uuid+"/greenhouse/"+guid+"/get-stacks")
    .then((res) => {
      setMessage(res.statusText)
      return res.json()})
    .then((json) => {
      console.log(json)
      setStackUUID(json.stacks[0].SUID)
      setStacks(json.stacks)
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
        {stacks && stacks.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Card childFront={<>{value.SUID}</>} childBack={<><Button icon={faPlus as IconProp} onClick={() => {}}></Button></>}/>
          </FlexboxElement>
          </div>
        );
      })}
          
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card childFront={<><Button icon={faPlus as IconProp} onClick={onSubmitStack}></Button></>} childBack={<></>}></Card>
          </FlexboxElement>
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Stacks }
