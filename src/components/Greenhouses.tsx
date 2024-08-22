import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPIGet, useAPIPost } from "../api/api";
import { Flexbox, FlexboxElement } from "./Flexbox";
import { IconButton } from "../features/button/IconButton";
import { Sidebar } from "./Sidebar";
import { GreenhouseSettings } from "../features/form/GreenhouseSettings";
import { LightTheme } from "../schema/color";

const StyledGreenhouseSettings = styled.div<{ expand: boolean }>`
  position: absolute;
  font-size: ${LightTheme.font.size.medium};
  top: 0px;
  transition: all 0.5s ease;
`;

const StyledGreenhousesButton = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 75px;
  width: 100%;
  vertical-align: middle;
  color: white;
  background: ${LightTheme.palette.secondary};
`;

const StyledGreenhouseContent = styled.div`
  background: white;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 100%;
  height: 100px;
  width: 100px;
`;

const StyledGreenhouse = styled.div`
  position: relative;
  margin: 2rem;
  &:hover ${StyledGreenhouseSettings} {
    top: -50px;
  }
`;
interface GreenhousesProps {
  uuid: number;
}

//Button component draws us an html button with icon and size of the icon
const Greenhouses = ({ uuid }: GreenhousesProps): ReactElement => {
  const [messageFetch, setMessage] = useState("");
  const [guid, setGuid] = useState(0);

  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const nav = useNavigate();
  const getGreenhouses = useAPIGet(`/user/${uuid}/greenhouses`);
  const addGreenhouse = useAPIPost("", "add", {});

  const onEditGreenhouse = (guid: any, event: React.MouseEvent) => {
    setSidebar(true);
    setGuid(guid);
  };

  useEffect(() => {
    getGreenhouses.get();
    if (loading || !getGreenhouses.data) {
      return;
    }
    setMessage("200");
    setLoading(false);
  }, [loading, addGreenhouse.postVersion]);

  const onAddGreenhouse = () => {
    setSidebar(true);
    addGreenhouse.post(
      { payload: { UUID: uuid } },
      `/user/${uuid}/greenhouses`
    )
  };

  return (
    <>
      <Flexbox gap={1} align="center" direction="row" wrap="wrap">
        {getGreenhouses.data &&
          getGreenhouses.data.greenhouses.map((value: any, index: number) => {
            return (
              <div key={index}>
                <FlexboxElement align="flex-start" gap={1} order={0} grow={0}>
                  <StyledGreenhouse>
                    <StyledGreenhouseContent>
                      <IconButton
                        size="2x"
                        icon={faPen as IconProp}
                        onClick={(e) => onEditGreenhouse(value.GUID, e)}
                      ></IconButton>
                      <IconButton
                        size="2x"
                        icon={faHouse as IconProp}
                        onClick={(e) =>
                          nav("/user/" + uuid + "/greenhouse/" + value.GUID)
                        }
                      ></IconButton>
                    </StyledGreenhouseContent>
                  </StyledGreenhouse>
                </FlexboxElement>
              </div>
            );
          })}
      </Flexbox>
      <StyledGreenhousesButton>
        <IconButton
          size="4x"
          icon={faPlus as IconProp}
          onClick={() => onAddGreenhouse()}
        ></IconButton>
      </StyledGreenhousesButton>
      <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <GreenhouseSettings guid={guid}></GreenhouseSettings>
      </Sidebar>
    </>
  );
};

export { Greenhouses };
