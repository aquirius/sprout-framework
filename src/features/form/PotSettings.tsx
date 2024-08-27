import React, { ReactElement, SetStateAction, useEffect, useState } from 'react';
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
  Carbon: number;
  Hydrogen: number;
  Oxygen: number;
  Nitrogen: number;
  Phosphorus: number;
  Potassium: number;
  Sulfur: number;
  Calcium: number;
  Magnesium: number;
}

type Crop = {
  CUID: number;
  CropName: string;
  AirTempMin: number;
  AirTempMax: number;
  HumidityMin: number;
  HumidityMax: number;
  PHLevelMin: number;
  PHLevelMax: number;
  OrpMin: number;
  OrpMax: number;
  TdsMin: number;
  TdsMax: number;
  WaterTempMin: number;
  WaterTempMax: number;
}

type Plant = {
  PLUID: number;
  CreatedTS: number;
  PlantedTS: number;
  HarvestedTS: number;
  Nutrients: Nutrients;
  Crop: Crop;
}

interface PotSettingsProps {
    visible: boolean;
    uuid?: number
    guid?: number
    suid?: number
    puid?: number

    pot?: PotProps
    plant? : Plant

    sidebar: (value: React.SetStateAction<boolean>) => void
    onClick: () => void
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


const StyledPotPlant = styled.button<{color : string}>`
  background: ${(props) => props.color};
  width: 50px;
  height: 50px; 
  border-radius: 100%;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
  rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
  rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const PotSettings = ({visible, uuid, guid, suid, puid, plant, sidebar, onClick} : PotSettingsProps) : ReactElement => {
  //initialize our form with empty states
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [loading, setLoading] = useState(false)
  const [cropName, setCropName] = useState("");


  const addPlant = useAPIPost("", "add", {});
  const harvestPlant = useAPIPost("", "harvest", {});
  const getPlant = useAPIGet("/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/"+puid+"/plant");

  const handleAddPlant = () => {
    addPlant.post({"payload" : {"puid": puid, "cropName" : cropName}}, "/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/" + puid + "/plant")
    sidebar(false);
    onClick();

  }
  const handleHarvestPlant = () => {
    harvestPlant.post({"payload" : {"puid": puid}}, "/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/" + puid + "/plant")
    sidebar(false);
    onClick();
  }
  const onSubmit = (data: any) => {
    
  }

  return (
    <>
      <StyledPotSettingsForm>
        <StyledPotSettingsFormHeader>
          <h2>PotSettings</h2>
        </StyledPotSettingsFormHeader>
        <StyledPotSettingsFormContent onSubmit={handleSubmit(onSubmit)}>
          {plant && plant.CreatedTS ? (
              <>
                <StyledPotInfo>CUID : {plant ? plant.Crop.CUID : ""}</StyledPotInfo>
                <StyledPotInfo>Crop Name : {plant ? plant.Crop.CropName : ""}</StyledPotInfo>
                <StyledPotInfo>Air Temperature (Min) : {plant ? plant.Crop.AirTempMin : ""}</StyledPotInfo>
                <StyledPotInfo>Air Temperature (Max) : {plant ? plant.Crop.AirTempMax : ""}</StyledPotInfo>
                <StyledPotInfo>Humidity (Min) : {plant ? plant.Crop.HumidityMin : ""}</StyledPotInfo>
                <StyledPotInfo>Humidity (Max) : {plant ? plant.Crop.HumidityMax : ""}</StyledPotInfo>
                <StyledPotInfo>PH Level (Min) : {plant ? plant.Crop.PHLevelMin : ""}</StyledPotInfo>
                <StyledPotInfo>PH Level (Max) : {plant ? plant.Crop.PHLevelMax : ""}</StyledPotInfo>
                <StyledPotInfo>ORP (Min) : {plant ? plant.Crop.OrpMin : ""}</StyledPotInfo>
                <StyledPotInfo>ORP (Max) : {plant ? plant.Crop.OrpMax : ""}</StyledPotInfo>
                <StyledPotInfo>TDS (Min) : {plant ? plant.Crop.TdsMin : ""}</StyledPotInfo>
                <StyledPotInfo>TDS (Max) : {plant ? plant.Crop.TdsMax : ""}</StyledPotInfo>
                <StyledPotInfo>Water Temperature (Min) : {plant ? plant.Crop.WaterTempMin : ""}</StyledPotInfo>
                <StyledPotInfo>Water Temperature (Max) : {plant ? plant.Crop.WaterTempMax : ""}</StyledPotInfo>


                <StyledPotInfo>Created : {plant ? plant.CreatedTS : ""}</StyledPotInfo>
                <StyledPotInfo>Planted : {plant ? plant.PlantedTS : ""}</StyledPotInfo>
                <StyledPotInfo>Harvested : {plant ? plant.HarvestedTS : ""}</StyledPotInfo>
                <StyledPotInfo>Nitrogen : {plant ? plant.Nutrients.Nitrogen : ""}</StyledPotInfo>
                <StyledPotInfo>Calcium : {plant ? plant.Nutrients.Calcium : ""}</StyledPotInfo>
                <StyledPotInfo>Hydrogen : {plant ? plant.Nutrients.Hydrogen : ""}</StyledPotInfo>
                <StyledPotInfo>Potassium : {plant ? plant.Nutrients.Potassium : ""}</StyledPotInfo>
                <StyledPotInfo>Phosphorus : {plant ? plant.Nutrients.Phosphorus : ""}</StyledPotInfo>
                <StyledPotInfo>Magnesium : {plant ? plant.Nutrients.Magnesium : ""}</StyledPotInfo>
                <StyledPotInfo>Sulfur : {plant ? plant.Nutrients.Sulfur : ""}</StyledPotInfo>
                <Button type={"submit"} onClick={handleSubmit(handleHarvestPlant)} content='harvest plant'></Button>
            </>
          ) : (
            <>
            <StyledPotSettingsFormLabel placeholder='tomato' {...register("nutrientID")} onClick={() => setCropName("tomato")}><StyledPotPlant color='red'></StyledPotPlant></StyledPotSettingsFormLabel>
            <StyledPotSettingsFormLabel placeholder='lettuce' {...register("nutrientID")} onClick={() => setCropName("lettuce")}><StyledPotPlant color='green'></StyledPotPlant></StyledPotSettingsFormLabel>
            <Button type={"submit"} onClick={handleSubmit(handleAddPlant)} content='add plant'></Button>
            </>
          )}
        </StyledPotSettingsFormContent>
      </StyledPotSettingsForm>
    </>
  );
}
export { PotSettings }
