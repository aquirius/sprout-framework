import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Popup } from './Popup';
import { Pots } from './Pots';
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

interface Pots {
  puid?: number
}

interface GetPots {
  pots: Array<Pots>
}

//Button component draws us an html button with icon and size of the icon
const Stacks = ({uuid, guid} : StacksProps) : ReactElement => {

  const [data, setData] = useState<any>()
  const [stacks, setStacks] = useState<any>()
  const [pots, setPots] = useState<GetPots>()


  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [stackUUID, setStackUUID] = useState();

  const nav = useNavigate();

  useEffect(() => {
    if (loading){
      fetch("/user/"+uuid+"/greenhouse/"+guid+"/get-stacks")
      .then((res) => {
        setMessage(res.statusText)
        return res.json()})
      .then((json) => {
        setStacks(json.stacks)
      })
      .finally(() => setLoading(false))
    }
  }, [uuid,guid,loading])

  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onAddStack = () => {
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
    <StyledStacks>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        {stacks && stacks.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Card height={300} width={900} childFront={<Pots uuid={uuid} guid={guid} suid={value.SUID}></Pots>} childBack={<><Button icon={faPlus as IconProp} onClick={() => {setLoading(true)}}></Button></>}/>
          </FlexboxElement>
          </div>
        );
      })}      
      
      </Flexbox>
      </GridElement>
      <GridElement position='b'>
      <Button icon={faPlus as IconProp} onClick={onAddStack}></Button>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
    </StyledStacks>
        

    </>
  );
}

export { Stacks }
