import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPI, useAPIGet } from "../api/api";
import { LightTheme, SkyGradient } from "../schema/color";
import { Stacks } from "./Stacks";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHouse,
  faSeedling,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, GridElement } from "./Grid";

const getDestinationStyling = (destination?: string): string => {
  switch ( destination ) {
    case "indoor":
        return "white"
    case "outdoor":
      return getCurrentHourBackground();
    case "greenhouse":
      return"#c5d0c2"
    default: 
      return"darkblue"
 }
}

const getDestinationBorder = (destination?: string): string => {
  switch ( destination ) {
    case "indoor":
        return `
        border-image: linear-gradient(to right, lightgrey, darkorchid) 1;`
    case "outdoor":
      return "border: none;";
    case "greenhouse":
      return `
      border-image-source: linear-gradient(to left, #00C853, #B2FF59);`
    default: 
      return"darkblue"
 }
}

export const getCurrentHourBackground = (hour?: number): string => {
  let currentHour = new Date().getHours();
  let gradients = "linear-gradient(";
  if(hour) {
    currentHour = hour;
  }

  gradients = gradients + SkyGradient[currentHour].direction + ", "
            + SkyGradient[currentHour].color1 + " "
            + SkyGradient[currentHour].intensity1 + ", "
            + SkyGradient[currentHour].color2 +" "
            + SkyGradient[currentHour].intensity2 + ", "

  if(SkyGradient[currentHour].color3 !== undefined && SkyGradient[currentHour].intensity3 !== undefined) {
    gradients = gradients + SkyGradient[currentHour].color3+" "+ SkyGradient[currentHour].intensity3 + ", "
  }
  if(SkyGradient[currentHour].color4 !== undefined && SkyGradient[currentHour].intensity4 !== undefined) {
    gradients = gradients + SkyGradient[currentHour].color4+" "+ SkyGradient[currentHour].intensity4 + ", "
  }
  if(SkyGradient[currentHour].color5 !== undefined && SkyGradient[currentHour].intensity5 !== undefined) {
    gradients = gradients + SkyGradient[currentHour].color5+" "+ SkyGradient[currentHour].intensity5 + ", "
  }

  return gradients.substring(0, gradients.length - 2) + ")";

}

const getCurrentDayStyling = (): string => {
  const hours = new Date().getHours()
  const isDayTime = hours > 6 && hours < 20;
  if(isDayTime === true){
    return "day"
  } else {
      return "night"
  }
}

const StyledGreenhouse = styled.div`
  width: 100%;
`;

const StyledGreenhouseBanner = styled.div`
  position: relative;
  width: calc(100vw - 75px);
  height: 250px;
`;

const StyledGreenhouseHeader = styled.div<{daytime?: string}>`
  font-size: 20px;
  color: ${getCurrentDayStyling() === "day" ? LightTheme.palette.contrast :  LightTheme.palette.light};
`;

const StyledGreenhouseContainer = styled.div<{destination?: string, status?: string, humidity?: string }>`
  font-size: 20px;
  color: ${LightTheme.palette.contrast};
  background: ${(props) => getDestinationStyling(props.destination)};
  height: 100%;
  width: 40%;
  position: absolute;
  border-left: 0;
  border-top:0;
  border-bottom:0;
  border-right: 5px solid grey;
  border-image-slice: 1;
  ${(props) => getDestinationBorder(props.destination)};
`;

const StyledWeatherHeader = styled.div<{daytime?: string}>`
  font-size: 20px;
  color: ${getCurrentDayStyling() === "day" ? LightTheme.palette.contrast :  LightTheme.palette.light};
`;

const StyledGround = styled.div<{daytime?: string}>`
  font-size: 20px;
  color: ${getCurrentDayStyling() === "day" ? LightTheme.palette.contrast :  LightTheme.palette.light};
  background: ${getCurrentDayStyling() === "day" ? "sandybrown" :  "saddlebrown"};;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 15px;
  `;

  const StyledGrass = styled.div<{daytime?: string}>`
    font-size: 20px;
    color: ${getCurrentDayStyling() === "day" ? LightTheme.palette.contrast :  LightTheme.palette.light};
    background: ${getCurrentDayStyling() === "day" ? "limegreen" :  "darkgreen"};
    width: 100%;
    position: absolute;
    bottom: 15px;
    height: 10px;

  `;



const StyledWeatherBackground = styled.div<{background: string, status?: string, humidity?: string }>`
  font-size: 20px;
  color: ${LightTheme.palette.contrast};
  background: ${(props) => getCurrentHourBackground()};
  height: 100%;
  width: 60%;
  position: absolute;
  color: ${getCurrentDayStyling() === "day" ? LightTheme.palette.contrast :  LightTheme.palette.light};

`;

const StyledGreenhouseInfo = styled.div`
break-after: auto;

`;


interface GreenhouseProps {
  uuid?: number;
  guid?: number;
  children?: React.ReactNode;
  onClick?: (event: any) => void;
}

interface GetGreenhouseProps {
  GUID: number;
  Address: string;
  Zip: number;
}


//Button component draws us an html button with icon and size of the icon
const Greenhouse = ({ uuid, guid, onClick }: GreenhouseProps): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const getGreenhouse = useAPIGet("/user/" + uuid + "/greenhouse/" + guid);

  useEffect(() => {
    setLoading(true);
    getGreenhouse.get();
    if (loading || !getGreenhouse.data) {
      return;
    }
    setMessage("200");
    setLoading(false);
  }, [loading]);

  return (
    <StyledGreenhouse onClick={onClick}>
      {getGreenhouse.data && (
        <>
        <StyledGreenhouseBanner>
          <Grid rows='' layout={"40% 60%"} dimension={""} >
            <GridElement>
            <StyledGreenhouseContainer destination={getGreenhouse.data.greenhouse.Destination}>
              <StyledGreenhouseHeader>
                {getGreenhouse.data.greenhouse.DisplayName}
               
              </StyledGreenhouseHeader>

                <StyledGreenhouseInfo>Status : {getGreenhouse.data.greenhouse.Status + "\n"}</StyledGreenhouseInfo>
                <StyledGreenhouseInfo>Destination : {getGreenhouse.data.greenhouse.Destination + "\n"}</StyledGreenhouseInfo>
                <StyledGreenhouseInfo>Temperature Inside : {getGreenhouse.data.greenhouse.TempIn + "\n"}</StyledGreenhouseInfo>
                <StyledGreenhouseInfo>Humidity : {getGreenhouse.data.greenhouse.Humidity + "\n"}</StyledGreenhouseInfo>
                <StyledGreenhouseInfo>Brightness : {getGreenhouse.data.greenhouse.Brightness + "\n"}</StyledGreenhouseInfo>
                <StyledGreenhouseInfo>Co2 : {getGreenhouse.data.greenhouse.Co2 + "\n"}</StyledGreenhouseInfo>
                <StyledGrass></StyledGrass>
                <StyledGround></StyledGround>
            </StyledGreenhouseContainer>
            </GridElement>
            <GridElement>
              <StyledWeatherBackground background={getCurrentHourBackground()}>
                <StyledWeatherHeader>
                  {getGreenhouse.data.greenhouse.TempOut + "°"}
                </StyledWeatherHeader>
                <StyledGrass></StyledGrass>
                <StyledGround>

                </StyledGround>
              </StyledWeatherBackground>
            </GridElement>
          </Grid>
          
        </StyledGreenhouseBanner>
        </>
      )}
      <Stacks uuid={uuid} guid={guid} onClick={() => {}}></Stacks>
    </StyledGreenhouse>
  );
};

export { Greenhouse };
