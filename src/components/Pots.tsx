import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet, useAPIPost } from '../api/api';
import { Button } from '../features/button/Button';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Pot } from './Pot';
import { IconButton } from '../features/button/IconButton';
import { Sidebar } from './Sidebar';
import { PotSettings } from '../features/form/PotSettings';

const StyledAddPotButton = styled.div`
  align-self: center;
`;

interface PotsProps {
  uuid?: number
  guid?: number
  suid?: number
  onClick: (event : any) => void
}

interface PotsProps {
}

//Button component draws us an html button with icon and size of the icon
const Pots = ({uuid, guid, suid, onClick} : PotsProps) : ReactElement => {
  const [loading, setLoading] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [puid, setPuid] = useState(0)

  const nav = useNavigate();

  const getPots = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/pot", "get", {"payload" : {"suid": suid}});
  const addPots = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/pot", "add", {"payload" : {"suid": suid}});

  const onAddPot = () => {
    addPots.post()
    setLoading(true)
  }

  const onEditPot = (puid : any, event : React.MouseEvent) => {
    setSidebar(true)
    setPuid(puid)
    console.log(puid)
  }

  useEffect(() => {
    getPots.post()
    if (loading || !getPots.data){
      return
    }
    setLoading(false)
  }, [addPots.postVersion, loading])

  var water = 100;
  var fertilizer = 100;

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        {getPots.data && getPots.data.pots.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Pot puid={value.PUID} onClick={(e) => onEditPot(value.PUID, e)} water={water} fertilizer={fertilizer}/>
          </FlexboxElement>
          </div>
        );
      })}
        </Flexbox>
      </GridElement>
      <GridElement position='b' align='center'>
        <IconButton size='2x' icon={faPlus as IconProp} onClick={() => onAddPot()}></IconButton>
      </GridElement>
    </Grid>
    <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
      <PotSettings puid={puid}></PotSettings>
    </Sidebar>
    </>
  );
}

export { Pots }
