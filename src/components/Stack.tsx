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
  font-size: ${LightTheme.font.size.small};
  min-height: 75px;
  min-width: 150px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
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

  const getSprout = useAPIGet(
    "/user/" + uuid + "/greenhouse/" + guid + "/stack/" + suid
  );

  useEffect(() => {
    setLoading(true);
    getSprout.get();
    if (loading || !getSprout.data) {
      return;
    }
    setLoading(false);
  }, [loading]);

  console.log("sprout", getSprout.data);

  return (
    <>
      <StyledStack>
        <Pots onClick={() => {}} uuid={uuid} guid={guid} suid={suid}></Pots>
      </StyledStack>
    </>
  );
};

export { Stack };
