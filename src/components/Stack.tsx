import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { Pots } from "./Pots";
import { LightTheme } from "../schema/color";
import { useAPIGet, useAPIPost } from "../api/api";

const StyledStack = styled.div<{
  expand?: boolean;
  height?: number;
  width?: number;
}>`
  position: relative;
  background-color: ${LightTheme.palette.light};
  font-size: ${LightTheme.font.size.medium};
  min-height: 75px;
  min-width: 150px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledStackInfo = styled.div`
  brea-after: auto;
`;


interface StackProps {
  uuid: number;
  guid: number;
  suid: number;
  onClick?: (event: any) => void;
}

//User page does import our table component and is bound to our react routing system
const Stack = ({ uuid, guid, suid }: StackProps): ReactElement => {
  const [loading, setLoading] = useState(true);

  // const getSprout = useAPIGet(
  //   "/user/" + uuid + "/greenhouse/" + guid + "/stack/" + suid
  // );

  const getSprout = useAPIPost("", "get", {});

  useEffect(() => {
    setLoading(true);
    getSprout.post(
      { payload: { suid: suid } },
      "/user/" + uuid + "/greenhouse/" + guid + "/stack/" + suid
    );
    if (loading || !getSprout.data) {
      return;
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <>
      <StyledStack>
        {getSprout.data && <>
                <StyledStackInfo>SproutID : {getSprout.data ? getSprout.data.sprout.SproutUID : ""}</StyledStackInfo>
                <StyledStackInfo>Air Temperature : {getSprout.data ? getSprout.data.sprout.AirTemp : ""}</StyledStackInfo>
                <StyledStackInfo>Humidity : {getSprout.data ? getSprout.data.sprout.Humidity : ""}</StyledStackInfo>
                <StyledStackInfo>PH - Level : {getSprout.data ? getSprout.data.sprout.PH : ""}</StyledStackInfo>
                <StyledStackInfo>ORP : {getSprout.data ? getSprout.data.sprout.ORP : ""}</StyledStackInfo>
                <StyledStackInfo>TDS : {getSprout.data ? getSprout.data.sprout.TDS : ""}</StyledStackInfo>
                <StyledStackInfo>Water Temperature : {getSprout.data ? getSprout.data.sprout.WaterTemp : ""}</StyledStackInfo>
                </>
        }
        <Pots onClick={() => {}} uuid={uuid} guid={guid} suid={suid}></Pots>
      </StyledStack>
    </>
  );
};

export { Stack };
