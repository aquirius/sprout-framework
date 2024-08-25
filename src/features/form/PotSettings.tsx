import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snack } from '../../components/Snack';
import { useAPIGet, useAPIPost } from '../../api/api';
import { LightTheme } from '../../schema/color';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBox, faCloudSun, faHouse } from '@fortawesome/free-solid-svg-icons';
import { PotProps } from '../../components/Pots';

type Nutrients = {
  carbon: number;
  hydrogen: number;
  oxygen: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  sulfur: number;
  calcium: number;
  magnesium: number;
}

type Plant = {
  pluid: number;
  createdTs: number;
  plantedTs: number;
  harvestedTs: number;
  nutrients: Nutrients;
}

interface PotSettingsProps {
    visible: boolean;
    uuid?: number
    guid?: number
    suid?: number
    puid?: number

    pot?: PotProps
    plant? : Plant
  }

const StyledPotSettingsForm = styled.div`
  max-width: 500px;
  background: linear-gradient(90deg, #f9f9f9 0%, transparent 100%);
  border-radius: 25px;
  padding: 2rem 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; 
  margin:10vh auto;
`;

const StyledPotSettingsFormHeader = styled.div`
color: inherit;
`;

const StyledPotSettingsFormContent = styled.form`
`;

const StyledPotSettingsFormLabel = styled.label`
  white-space: nowrap;
`;

const StyledPotSettingsFormInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const StyledPotInfo = styled.div`
  font-size: ${LightTheme.font.size.medium};
  color: ${LightTheme.palette.contrast};

`;

const PotSettings = ({visible, uuid, guid, suid, puid, pot} : PotSettingsProps) : ReactElement => {
  //initialize our form with empty states
  const {register, handleSubmit, formState: {errors}} = useForm();
  const state = {
    "PUID" :"",
  }
  const [nutrientID, setNutrientID] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pluid, setPluid] = useState(0)

  const addPlant = useAPIPost("", "add", {});
  const harvestPlant = useAPIPost("", "harvest", {});
  const getPlant = useAPIGet("/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/"+puid+"/plant");
  const handleAddPlant = () => {
    addPlant.post({"payload" : {"puid": puid}}, "/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/" + puid + "/plant")
  }

  const handleHarvestPlant = () => {
    console.log(puid)
    harvestPlant.post({"payload" : {"puid": puid}}, "/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/" + puid + "/plant")
  }

  const onSubmit = (data: any) => {
    
  }

  useEffect(() => {
    getPlant.get();
    if (loading || !getPlant.data) {
      return;
    }
    setPluid(getPlant.data.PLUID);
    setLoading(false);
  },[loading, visible])


  return (
    <>
      <StyledPotSettingsForm>
        <StyledPotSettingsFormHeader>
          <h2>PotSettings</h2>
        </StyledPotSettingsFormHeader>
        <StyledPotSettingsFormContent onSubmit={handleSubmit(onSubmit)}>
          {getPlant.data && (
            <>
                <StyledPotInfo>Created : {getPlant.data ? getPlant.data.plant.CreatedTS : ""}</StyledPotInfo>
                <StyledPotInfo>Planted : {getPlant.data ? getPlant.data.plant.PlantedTS : ""}</StyledPotInfo>
                <StyledPotInfo>Harvested : {getPlant.data ? getPlant.data.plant.HarvestedTS : ""}</StyledPotInfo>
                <StyledPotInfo>Nitrogen : {getPlant.data ? getPlant.data.plant.Nutrients.Nitrogen : ""}</StyledPotInfo>
                <StyledPotInfo>Calcium : {getPlant.data ? getPlant.data.plant.Nutrients.Calcium : ""}</StyledPotInfo>
                <StyledPotInfo>Hydrogen : {getPlant.data ? getPlant.data.plant.Nutrients.Hydrogen : ""}</StyledPotInfo>
                <StyledPotInfo>Oxygen : {getPlant.data ? getPlant.data.plant.Nutrients.Oxygen : ""}</StyledPotInfo>
            </>
          )}
          <StyledPotSettingsFormLabel><FontAwesomeIcon size='2x' icon={faHouse as IconProp}/></StyledPotSettingsFormLabel>
          <StyledPotSettingsFormInput placeholder={"tomato"} {...register("nutrientID")} type={"radio"} value={1} onClick={() => setNutrientID(1)}/>
          <StyledPotSettingsFormLabel><FontAwesomeIcon size='2x' icon={faCloudSun as IconProp}/></StyledPotSettingsFormLabel>
          <StyledPotSettingsFormInput placeholder={"cabbage"} {...register("nutrientID")} type={"radio"} value={2} onClick={() => setNutrientID(2)}/>
          <Button onClick={handleAddPlant} content='add plant'></Button>
          <Button onClick={handleHarvestPlant} content='harvest plant'></Button>

        </StyledPotSettingsFormContent>
      </StyledPotSettingsForm>
    </>
  );
}
export { PotSettings }
