import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';
import { faBox, faCloudSun, faHouse } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAPIPost, useAPIPut } from '../../api/api';

interface CropsSettingsProps {
    uuid?:number
  }

const StyledCropsSettingsForm = styled.div`
  max-width: 500px;
  height: 100%;
  overflow-y: scroll;
  background: linear-gradient(90deg, #f9f9f9 0%, transparent 100%);
  border-radius: 25px;
  padding: 2rem 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; 
`;

const StyledCropsettingsFormHeader = styled.div`
color: inherit;
`;

const StyledCropsettingsFormContent = styled.form`
`;

const StyledCropsettingsFormLabel = styled.label`
  white-space: nowrap;
`;

const StyledCropsettingsFormInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const CropsSettings = ({uuid} : CropsSettingsProps) : ReactElement => {
  //initialize our form with empty states
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [cropName, setCropName] = useState("");
  const [airTempMin, setAirTempMin] = useState(0);
  const [airTempMax, setAirTempMax] = useState(0);
  const [humidityMin, setHumidityMin] = useState(0);
  const [humidityMax, setHumidityMax] = useState(0);
  const [phLevelMin, setPhLevelMin] = useState(0);
  const [phLevelMax, setPhLevelMax] = useState(0);
  const [orpMin, setOrpMin] = useState(0);
  const [orpMax, setOrpMax] = useState(0);
  const [tdsMin, setTdsMin] = useState(0);
  const [tdsMax, setTdsMax] = useState(0);
  const [waterTempMin, setWaterTempMin] = useState(0);
  const [waterTempMax, setWaterTempMax] = useState(0);

  const postCropsSettings = useAPIPost("/user/"+uuid+"/crops",  "add", {})

  const onSubmit = (data: any) => {
    postCropsSettings.post({"payload" : 
    {
      uuid,
      cropName,
      airTempMin, 
      airTempMax, 
      humidityMin,
      humidityMax,
      phLevelMin, 
      phLevelMax,
      orpMin,
      orpMax,
      tdsMin,
      tdsMax,
      waterTempMin,
      waterTempMax,
    }}, "/user/"+uuid+"/crops", );
  }

  return (
    <>
      <StyledCropsSettingsForm>
        <StyledCropsettingsFormHeader>
          <h2>Crop Settings</h2>
        </StyledCropsettingsFormHeader>
        <StyledCropsettingsFormContent onSubmit={handleSubmit(onSubmit)}>
          <StyledCropsettingsFormLabel>Crop Name</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"crop name"} {...register("cropName")} type={"text"} onChange={(e) => setCropName(e.target.value)}/>

          <StyledCropsettingsFormLabel>Air Temperature Min</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"air temp min"} {...register("airTempMin")} type={"number"} onChange={(e) => setAirTempMin(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>Air Temperature Max</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"air temp max"} {...register("airTempMax")} type={"number"} onChange={(e) => setAirTempMax(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>Humidity Min</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"humidity min"} {...register("humidityMin")} type={"number"} onChange={(e) => setHumidityMin(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>Humidity Max</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"humidity max"} {...register("humidityMax")} type={"number"} onChange={(e) => setHumidityMax(parseFloat(e.target.value))}/>

          <StyledCropsettingsFormLabel>PH Level Min</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"ph level min"} {...register("phLevelMin")} type={"number"} onChange={(e) => setPhLevelMin(parseFloat(e.target.value))}/>

          <StyledCropsettingsFormLabel>PH Level Max</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"ph level max"} {...register("phLevelMax")} type={"number"} onChange={(e) => setPhLevelMax(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>ORP Min</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"orp min"} {...register("orpMin")} type={"number"} onChange={(e) => setOrpMin(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>ORP Max</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"orp max"} {...register("orpMax")} type={"number"} onChange={(e) => setOrpMax(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>TDS Min</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"tds min"} {...register("tdsMin")} type={"number"} onChange={(e) => setTdsMin(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>TDS Max</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"tds max"} {...register("tdsMax")} type={"number"} onChange={(e) => setTdsMax(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>Water Temperature Min</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"water temp min"} {...register("waterTempMin")} type={"number"} onChange={(e) => setWaterTempMin(parseInt(e.target.value))}/>

          <StyledCropsettingsFormLabel>Water Temperatire Max</StyledCropsettingsFormLabel>
          <StyledCropsettingsFormInput placeholder={"water temp max"} {...register("waterTempMax")} type={"number"} onChange={(e) => setWaterTempMax(parseInt(e.target.value))}/>

          <Button type={"submit"} content='submit'></Button>
        </StyledCropsettingsFormContent>
      </StyledCropsSettingsForm>
    </>
  );
}
export { CropsSettings }
