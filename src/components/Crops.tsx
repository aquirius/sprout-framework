import { faCheck, faHouse, faPen, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPIGet, useAPIPost } from "../api/api";
import { Flexbox, FlexboxElement } from "./Flexbox";
import { IconButton } from "../features/button/IconButton";
import { Sidebar } from "./Sidebar";
import { CropsSettings } from "../features/form/CropsSettings";
import { LightTheme, SkyGradient } from "../schema/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, GridElement } from "./Grid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const StyledCropsSettings = styled.div<{ expand: boolean }>`
  position: absolute;
  font-size: ${LightTheme.font.size.medium};
  top: 0px;
  transition: all 0.5s ease;
`;

const StyledAddCropsButton = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;  color: ${LightTheme.palette.light};
  background: ${LightTheme.palette.secondary};
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  height: 500px;
  width: 300px;
  margin: 2rem;
`;

const StyledCropsContent = styled.div<{destination: string}>`
  background: ${LightTheme.palette.light};
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  color : ${LightTheme.palette.contrast};
  width: 100%;
`;

const StyledCrops = styled.div`
  position: relative;
  width: calc(100vw - 75px);
  height: 100px;
`;

const StyledCropsHeader = styled.div`
  width: 100%;
  font-size: 2rem;
  transition: all 0.5s ease;
  background: ${LightTheme.palette.light};
  color: ${LightTheme.palette.contrast};

`;

const StyledCropsButton = styled.div`
  width: 100%;
  transition: all 0.5s ease;
  position: relative;
`;
interface CropsProps {
  uuid: number;
}

//Button component draws us an html button with icon and size of the icon
const Crops = ({ uuid }: CropsProps): ReactElement => {
  const [messageFetch, setMessage] = useState("");
  const [cuid, setCuid] = useState(0);
  const [crops, setCrops] = useState([]);


  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const nav = useNavigate();
  const getCrops = useAPIPost(`/user/${uuid}/crops`, "get-many", {});
  const addCrop = useAPIPost(`/user/${uuid}/crops`, "add", {});

  //const deleteCrop = useAPIPost("", "delete", {});

  const onEditCrops = (cuid: any, event: React.MouseEvent) => {
    setSidebar(true);
    setCuid(cuid);
  };

  const onAddCrop = () => {
    setSidebar(true);
    addCrop.post(
      { payload: { UUID: uuid, CropName: "tomato" } },
      `/user/${uuid}/crops`
    )
  };

  useEffect(()=> {
    setLoading(true);
  }, [])

  return (
    <>
      <Flexbox gap={1} align="center" direction="row" wrap="wrap">
        {crops}
        {getCrops.data &&
          getCrops.data.Crops.map((value: any, index: number) => {
            return (
              <div key={index}>
                <FlexboxElement align="flex-start" gap={1} order={0} grow={0}>
                  <StyledCrops>
                  <StyledCropsHeader>{value.DisplayName ? value.DisplayName : "\n"}</StyledCropsHeader>
                    <StyledCropsContent destination="">
                      <StyledCropsButton>
                      <IconButton
                        size="3x"
                        icon={faHouse as IconProp}
                        onClick={(e) =>
                          nav("/user/" + uuid + "/greenhouse/" + value.GUID)
                        }
                      ></IconButton>
                      </StyledCropsButton>
                      <StyledCropsButton>
                        <IconButton
                          size="3x"
                          icon={faPen as IconProp}
                          onClick={(e) => onEditCrops(value.CUID, e)}
                        ></IconButton>
                      </StyledCropsButton>
                    </StyledCropsContent>
                  </StyledCrops>
                </FlexboxElement>
              </div>
            );
          })}
          <FlexboxElement align="flex-end" gap={1} order={0} grow={0}>
              <StyledAddCropsButton>
                <IconButton
                  size="4x"
                  icon={faPlus as IconProp}
                  onClick={() => onAddCrop()}
                ></IconButton>
          </StyledAddCropsButton>
          </FlexboxElement>
      </Flexbox>
      <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <CropsSettings uuid={uuid}></CropsSettings>
      </Sidebar>
    </>
  );
};

export { Crops };
