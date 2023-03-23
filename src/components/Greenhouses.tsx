import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet, useAPIPost } from '../api/api';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';
import { IconButton } from '../features/button/IconButton';
import { Sidebar } from './Sidebar';
import { GreenhouseSettings } from '../features/form/GreenhouseSettings';
import { Greenhouse } from './Greenhouse';


const StyledGreenhouseSettings = styled.div<{expand:boolean}>`
  position: absolute;
  top: 0px;
  transition:all 0.5s ease
`;

const StyledGreenhouseButton = styled.div`
  height: 50px;
  text-align: center;
`;

const StyledGreenhouse = styled.div`
  position: relative;
  margin: 2rem;
  &:hover ${StyledGreenhouseSettings}{
    top: -50px;
  }
`;
interface GreenhousesProps {
  uuid: number
}

//Button component draws us an html button with icon and size of the icon
const Greenhouses = ({uuid} : GreenhousesProps) : ReactElement => {
  const [messageFetch, setMessage] = useState("")
  const [guid, setGuid] = useState(0)

  const [loading, setLoading] = useState(false)
  const [sidebar, setSidebar] = useState(false)


  const nav = useNavigate();
  const getGreenhouses = useAPIGet("/user/"+uuid+"/greenhouses");
  const addGreenhouse = useAPIPost("/user/"+uuid+"/greenhouses", "add", {"payload" : {"UUID": uuid}});

  const onEditGreenhouse = (guid : any, event : React.MouseEvent) => {
    setSidebar(true)
    setGuid(guid)
  }

  useEffect(() => {
    getGreenhouses.get()
    if (loading || !getGreenhouses.data){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [addGreenhouse.postVersion])

  const onAddGreenhouse = () => {
    addGreenhouse.post()
    setLoading(true)
  }

  return (
    <>
    <StyledGreenhouse>
     <Flexbox align='center' direction='row' wrap='wrap'>
        {getGreenhouses.data && getGreenhouses.data.greenhouses.map((value : any, index : number) => {
          return (
            <div key={index}>
              <FlexboxElement align='flex-start' order={0} grow={0}>
              <StyledGreenhouse>
                <StyledGreenhouseSettings expand={true}>
                  <IconButton size='2x' icon={faPen as IconProp} onClick={(e) => onEditGreenhouse(value.GUID, e)}></IconButton>
                </StyledGreenhouseSettings>
                <Greenhouse uuid={uuid} guid={value.GUID} onClick={() => {}}/>
              </StyledGreenhouse>
            </FlexboxElement>
            </div>
          );
        })}
      </Flexbox>
      <StyledGreenhouseButton>
        <IconButton size='4x' icon={faPlus as IconProp} onClick={() => onAddGreenhouse()}></IconButton>
      </StyledGreenhouseButton>
    </StyledGreenhouse>
    <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <GreenhouseSettings guid={guid}></GreenhouseSettings>
    </Sidebar>
    </>
  );
}


export { Greenhouses }
