import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
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


  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [stackUUID, setStackUUID] = useState();

  const nav = useNavigate();

console.log("here")
  useEffect(() => {
    fetch("/user/"+uuid+"/greenhouse/"+guid+"/get-stacks")
    .then((res) => {
      setMessage(res.statusText)
      return res.json()})
    .then((json) => {
      setStacks(json.stacks)
    })
    .finally(() => setLoading(false))
  }, [uuid, loading])

  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onLoadPots = (suid:number) => {
    const getPots = new Request("/user/"+uuid+"/greenhouse/"+guid+"/get-pots", {
      method: "post",
      body: JSON.stringify({
        suid: suid,
      }),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Method": "add"
      }
    });

    fetch(getPots).then(res => {
      console.log(res)
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
      console.log(json)
      console.log(suid)

      setPots(json.pots)
    }).catch(error => {
        console.log(error);
    });
  }

  const onAddPot = (suid : number) => {
    const addPot = new Request("/user/"+uuid+"/greenhouse/"+guid+"/add-pot", {
      method: "post",
      body: JSON.stringify({
        suid: suid,
      }),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Method": "add"
      }
    });
    fetch(addPot).then(res => {
      console.log(res)
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
      console.log(json)
      setPots(json.pots)
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
          <h1>stacks</h1>
        {stacks && stacks.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Card childFront={<>{value.SUID}<Button icon={faPlus as IconProp} onClick={() => onAddPot(value.SUID)}></Button></>} childBack={<><Button icon={faPlus as IconProp} onClick={() => setStackUUID(value.SUID) }></Button></>}/>
          </FlexboxElement>
          </div>
        );
      })}
      {stackUUID && <Pots uuid={uuid} guid={guid} suid={stackUUID}></Pots>} {stackUUID}
      
      
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
