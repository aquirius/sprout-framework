import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMasksTheater, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet, useAPIPost } from '../api/api';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Popup } from './Popup';
import { Pots } from './Pots';
import { Snack } from './Snack';
import { Stack } from './Stack';

const StyledStacks = styled.div`

`;

interface StacksProps {
  uuid?: number
  guid?: number
  onClick : (event :any) => void
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
const Stacks = ({uuid, guid, onClick} : StacksProps) : ReactElement => {

  const [data, setData] = useState<any>()
  const [stacks, setStacks] = useState<any>()
  const [pots, setPots] = useState<GetPots>()


  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [stackUUID, setStackUUID] = useState();

  const {getData, get} = useAPIGet("/user/"+uuid+"/greenhouse/"+guid+"/get-stacks");
  const {postVersion, post} = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/add-stack", "add", {"payload" : {"UUID": uuid,"GUID": guid}});

  useEffect(() => {
    get()
    if (loading || !getData){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [postVersion])

  console.log(getData?.stacks.length)

  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onAddStack = () => {
    post()
    setLoading(true)
  }

  console.log("stacks", getData)

  return (
    <>
    <StyledStacks>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
          {getData && getData.stacks.map((value : any, index : number) => {
            console.log(value.SUID)
          return (
            <div key={index}>
              <FlexboxElement align='flex-start' order={0} grow={0}>
                <Stack onClick={(e) => onClick(e)} height={300} width={900} childFront={<Pots onClick={onClick} uuid={uuid} guid={guid} suid={value.SUID}></Pots>} childBack={<><Button icon={faPlus as IconProp} onClick={() => {setLoading(true)}}></Button></>}/>
            </FlexboxElement>
            </div>
          );
        })}
        <FlexboxElement align='flex-start' order={0} grow={0}>
          <Stack onClick={(e) => onClick(e)} height={300} width={900} childFront={<Button icon={faPlus as IconProp} onClick={() => onAddStack()}></Button>} childBack={<><Button icon={faPlus as IconProp} onClick={() => {setLoading(true)}}></Button></>}/>
        </FlexboxElement>
      </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
    </StyledStacks>
        

    </>
  );
}

export { Stacks }
