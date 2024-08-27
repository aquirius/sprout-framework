import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { useAPIGet, useAPIPost } from "../api/api";
import { Flexbox, FlexboxElement } from "./Flexbox";
import { Grid, GridElement } from "./Grid";
import { Stack } from "./Stack";
import { IconButton } from "../features/button/IconButton";
import { Sidebar } from "./Sidebar";
import { StackSettings } from "../features/form/StackSettings";
import { LightTheme } from "../schema/color";

const StyledStackSettings = styled.div<{ expand: boolean }>`
  position: absolute;
  top: 0px;
  transition: all 0.5s ease;
  width: 100%;
  height: 25px;
  background: ${LightTheme.palette.secondary};
`;

const StyledStacks = styled.div``;

const StyledStack = styled.div`
  position: relative;
  &:hover ${StyledStackSettings} {
    top: -25px;
  }
`;

const StyledAddStackButton = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;  color: ${LightTheme.palette.light};
  background: ${LightTheme.palette.secondary};
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  height: 150px;
  margin: 2rem;
`;


interface StacksProps {
  uuid?: number;
  guid?: number;
  onClick: (event: any) => void;
}

const Stacks = ({ uuid, guid, onClick }: StacksProps): ReactElement => {
  const [suid, setSuid] = useState(0);
  const [sidebar, setSidebar] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getStack = useAPIGet(`/user/${uuid}/greenhouse/${guid}/stack`);
  const addStack = useAPIPost(``, "add", {});
  const addSprout = useAPIPost(``, "add", {});

  useEffect(() => {
    setLoading(true);
    getStack.get();
    if (loading || !getStack.data) {
      return;
    }
    setLoading(false);
    setMessage("200");
    // eslint-disable-next-line
  }, [loading, addStack.postSuccess, addSprout.postSuccess]);

  const onEditStack = (suid: any, event: React.MouseEvent) => {
    setSidebar(true);
    setSuid(suid);
  };

  const onAddStack = () => {
    addStack.post(
      { payload: { UUID: uuid, GUID: guid } },
      `/user/${uuid}/greenhouse/${guid}/stack`
    );
    setLoading(true);
  };

  const onAddSprout = (suid: any) => {
    setSuid(suid);
    addSprout.post(
      { payload: { SUID: suid } },
      `/user/${uuid}/greenhouse/${guid}/stack/${suid}`
    );
    setLoading(true);
  };

  return (
    <>
      <StyledStacks>
        <Grid layout={""} dimension={"'a'"}>
          <GridElement position="a">
            <Flexbox gap={4} align="left" direction="row" wrap="wrap">
              {getStack.data &&
                getStack.data.stacks.map((value: any, index: number) => {
                  return (
                    <div key={index}>
                      <FlexboxElement
                        gap={1}
                        align="flex-start"
                        order={0}
                        grow={0}
                      >
                        <StyledStack>
                          <StyledStackSettings expand={true}>
                            <IconButton
                              size="1x"
                              icon={faPen as IconProp}
                              onClick={(e) => onEditStack(value.SUID, e)}
                            ></IconButton>
                            <IconButton
                              size="1x"
                              icon={faCircle as IconProp}
                              onClick={(e) => onAddSprout(value.SUID)}
                            ></IconButton>
                          </StyledStackSettings>
                          <Stack
                            onClick={() => {}}
                            uuid={uuid ? uuid : 0}
                            guid={guid ? guid : 0}
                            suid={value.SUID ? value.SUID : 0}
                          ></Stack>
                        </StyledStack>
                      </FlexboxElement>
                    </div>
                  );
                })}
            </Flexbox>
          </GridElement>
          <StyledAddStackButton>
              <IconButton
                size="4x"
                icon={faPlus as IconProp}
                onClick={() => onAddStack()}
              ></IconButton>
            </StyledAddStackButton>
        </Grid>
      </StyledStacks>
      <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <StackSettings suid={suid} guid={guid} uuid={uuid}></StackSettings>
      </Sidebar>
    </>
  );
};

export { Stacks };
