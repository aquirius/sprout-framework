import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMasksTheater, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, ReactEventHandler, useEffect, useState } from 'react';
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
import { IconButton } from '../features/button/IconButton';
import { Sidebar } from './Sidebar';
import { PotSettings } from '../features/form/PotSettings';
import { StackSettings } from '../features/form/StackSettings';

const StyledStackSettings = styled.div<{expand:boolean}>`
  position: absolute;
  top: 0px;
  transition:all 0.5s ease
`;

const StyledStacks = styled.div`
`;


const StyledStack = styled.div`
  position: relative;
  margin: 2rem 0;
  &:hover ${StyledStackSettings}{
    top: -50px;
  }
`;

interface StacksProps {
  uuid?: number
  guid?: number
  onClick : (event :any) => void
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

  const [stacks, setStacks] = useState<any>()
  const [pots, setPots] = useState<GetPots>()
  const [suid, setSuid] = useState(0)
  const [sidebar, setSidebar] = useState(false)


  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [stackUUID, setStackUUID] = useState();

  const getStack = useAPIGet("/user/"+uuid+"/greenhouse/"+guid+"/stack");
  const addStack = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/stack", "add", {"payload" : {"UUID": uuid,"GUID": guid}});

  const onEditStack = (suid : any, event : React.MouseEvent) => {
    setSidebar(true)
    setSuid(suid)
    console.log(suid)
  }

  useEffect(() => {
    getStack.get()
    if (loading || !getStack.data){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [addStack.postVersion])

  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onAddStack = () => {
    addStack.post()
    setLoading(true)
  }
  return (
    <>
    <StyledStacks>
    <Grid layout={""} dimension={"'a'"} >
      <GridElement position='a'>
        <Flexbox align='left' direction='row' wrap='wrap'>
          {getStack.data && getStack.data.stacks.map((value : any, index : number) => {
          return (
            <div key={index}>
              <FlexboxElement align='flex-start' order={0} grow={0}>
                <StyledStack>
                <StyledStackSettings expand={true}>
                  <IconButton size='2x' icon={faPen as IconProp} onClick={(e) => onEditStack(value.SUID, e)}></IconButton>
                  {value.SUID}
                </StyledStackSettings>
                  <Stack onClick={() => {}} uuid={uuid ? uuid : 0} guid={guid ? guid : 0} suid={value.SUID ? value.SUID : 0}></Stack>
                </StyledStack>
              </FlexboxElement>
            </div>
          );
        })}
      </Flexbox>
      </GridElement>
      <GridElement position='a' align='center'>
        <IconButton size='2x' icon={faPlus as IconProp} onClick={() => onAddStack()}></IconButton>
      </GridElement>
    </Grid>
    </StyledStacks>
    <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
      <StackSettings suid={suid}></StackSettings>
    </Sidebar>
    </>
  );
}

export { Stacks }
