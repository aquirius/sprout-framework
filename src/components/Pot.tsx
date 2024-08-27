import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { Popup } from "./Popup";
import { IconButton } from "../features/button/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { LightTheme } from "../schema/color";
import { useAPIGet, useAPIPost } from "../api/api";
import { time } from "console";

const StyledEmptyPotContainer = styled.div<{ expand?: boolean }>`
  position: relative;
  width: ${(props) => (props.expand ? "50px" : "100px")};
  height: ${(props) => (props.expand ? "50px" : "100px")};
  background: ${LightTheme.palette.light};
  font-size: ${LightTheme.font.size.small};
  border-radius: 100%;
  overflow: hidden;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledPotContainer = styled.div<{ expand?: boolean, color?: string }>`
  position: relative;
  width: ${(props) => (props.expand ? "50px" : "100px")};
  height: ${(props) => (props.expand ? "50px" : "100px")};
  background: ${(props) => (props.color ? props.color : "red")};
  font-size: ${LightTheme.font.size.small};
  border-radius: 100%;
  overflow: hidden;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    transition: all 5sec ease;
`;

const StyledPotFertilizerLabel = styled.div<{ expand?: boolean }>`
  position: relative;
  color: white;
  opacity: 0;
  transition: all 0.3s ease;

  transform: translate3d(
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")}
  );
`;

const StyledPotWaterLabel = styled.div<{ expand?: boolean }>`
  position: relative;
  color: black;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translate3d(
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")}
  );
`;

const StyledPotFertilizer = styled.div<{ expand?: boolean }>`
  position: absolute;
  width: ${(props) => (props.expand ? "50px" : "100px")};
  height: ${(props) => (props.expand ? "50px" : "100px")};
  transition: all 0.3s ease;
  transform: translate3d(
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")}
  );
  &:hover {
    ${StyledPotFertilizerLabel} {
      opacity: 1;
    }
    transform: translate3d(0, 0, 0);
  }

  background-color: ${LightTheme.palette.secondary};
  border-radius: 100%;
`;

const StyledPotWater = styled.div<{ expand?: boolean }>`
  position: absolute;
  width: ${(props) => (props.expand ? "50px" : "100px")};
  height: ${(props) => (props.expand ? "50px" : "100px")};
  left: ${(props) => (props.expand ? "-25px" : "-50px")};
  transition: all 0.3s ease;
  transform: translate3d(
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")},
    ${(props) => (props.expand ? "15px" : "30px")}
  );
  &:hover {
    ${StyledPotWaterLabel} {
      opacity: 1;
    }
    & + ${StyledPotFertilizer} {
      transform: translate3d(
        ${(props) => (props.expand ? "50px" : "100px")},
        ${(props) => (props.expand ? "50px" : "100px")},
        ${(props) => (props.expand ? "50px" : "100px")}
      );
    }
    transform: translate3d(
      ${(props) => (props.expand ? "25px" : "50px")},
      0,
      ${(props) => (props.expand ? "15px" : "30px")}
    );
  }
  background-color: lightblue;
  color: black;
  border-radius: 100%;
`;

const StyledPot = styled.div<{
  expand?: boolean;
  height?: number;
  width?: number;
}>`
  background-color: transparent;
  min-height: 50px;
  min-width: 50px;
  border-radius: 50%;
`;

type Nutrients = {
  Carbon: number;
  Hydogen: number;
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

type PotProps = {
  uuid: number;
  guid: number;
  suid: number;
  puid: number;

  plant?: Plant;

  water?: number;
  fertilizer?: number;
  onClick: (event: any) => void;
}

const getColorForCrop = (crop: string): string => {
  if(crop === "tomato" ) {
    return "red"
  } else {
    return "green;"
  }
}

//User page does import our table component and is bound to our react routing system
const Pot = ({uuid, guid, suid, puid, plant, water, fertilizer, onClick }: PotProps): ReactElement => {
  const [rect, setRect] = useState<DOMRect>();
  const [data, setData] = useState<Plant>();
  const [expandPot, setExpandPot] = useState(true);
  const [loading, setLoading] = useState(false);


  water = Math.floor(Math.random() * (100 - 0 + 1) + 0);
  fertilizer = Math.floor(Math.random() * (100 - 0 + 1) + 0);

  //const getPlant = useAPIGet( "/user/" + uuid + "/greenhouse/" + guid + "/stack/" + suid + "/pot/" +puid+ "/plant");
  const now = Date.now() / 1000;

  const handleEditPot = (plant: any) => {
    onClick(plant);
    setLoading(true);
  }

  return (
    <>
      <StyledPot onClick={() => handleEditPot(plant)}>

      {plant && plant.Crop && plant.HarvestedTS < now && plant.HarvestedTS !== 0
        ? (<StyledPotContainer expand={expandPot} color={"grey"}>
        </StyledPotContainer>)
        : plant?.Crop.CropName
        ? (<StyledPotContainer expand={expandPot} color={getColorForCrop(plant?.Crop.CropName)}>
        </StyledPotContainer>)
        : (<StyledEmptyPotContainer expand={expandPot}>
          <StyledPotWater expand={expandPot}>
            <StyledPotWaterLabel expand={expandPot}>
            </StyledPotWaterLabel>
          </StyledPotWater>
          <StyledPotFertilizer expand={expandPot}>
            <StyledPotFertilizerLabel expand={expandPot}>
            </StyledPotFertilizerLabel>
          </StyledPotFertilizer>
        </StyledEmptyPotContainer>)}
      </StyledPot>
      
    
    </>
  );
};

export { Pot };
