import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPen, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPIGet, useAPIPost } from "../api/api";
import { Button } from "../features/button/Button";
import { Flexbox, FlexboxElement } from "./Flexbox";
import { Grid, GridElement } from "./Grid";
import { Pot } from "./Pot";
import { IconButton } from "../features/button/IconButton";
import { Sidebar } from "./Sidebar";
import { PotSettings } from "../features/form/PotSettings";

const StyledAddPotButton = styled.div`
  align-self: center;
`;

interface PotsProps {
  uuid: number;
  guid: number;
  suid: number;
  onClick: (event: any) => void;
}

export type PotProps = {
  uuid: number;
  guid: number;
  suid: number;
  puid: number;

  plant?: Plant;

  water?: number;
  fertilizer?: number;
  onClick: (event: any) => void;
}

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

type Plant = {
  PLUID: number;
  CreatedTS: number;
  PlantedTS: number;
  HarvestedTS: number;
  Nutrients: Nutrients;
}

//Button component draws us an html button with icon and size of the icon
const Pots = ({ uuid, guid, suid, onClick }: PotsProps): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [puid, setPuid] = useState<any>();

  const nav = useNavigate();

  //todo, getpots over get api
  const getPots = useAPIPost("", "get", {});
  const addPots = useAPIPost("", "add", {});

  const onAddPot = () => {
    addPots.post(
      { payload: { suid: suid } },
      "/user/" + uuid + "/greenhouse/" + guid + "/stack/" + suid + "/pot"
    );
    setLoading(true);
  };

  const onEditPot = (puid: any, event: React.MouseEvent) => {
    setPuid(puid.PUID);
    setSidebar(true);
  };

  useEffect(() => {
    setLoading(true);
    getPots.post(
      { payload: { suid: suid } },
      "/user/" + uuid + "/greenhouse/" + guid + "/stack/" + suid + "/pot"
    );
    if (loading || !getPots.data) {
      return;
    }
    setLoading(false);
  }, [loading, addPots.postSuccess]);

  var water = 100;
  var fertilizer = 100;

  return (
    <>
      {getPots.data &&
      (<><Grid layout={"80% 20%"} dimension={"'a b'"}>
        <GridElement position="a">
          <Flexbox gap={1} align="center" direction="row" wrap="wrap">
            
              {getPots.data.pots.map((value: any, index: number) => {
                return (
                  <div key={index}>
                    <FlexboxElement
                      gap={1}
                      align="flex-start"
                      order={0}
                      grow={0}
                    >
                      <Pot
                        uuid={uuid}
                        guid={guid}
                        suid={suid}
                        puid={value.PUID}
                        onClick={(e) => onEditPot(value, e)}
                        water={water}
                        fertilizer={fertilizer}
                      />
                    </FlexboxElement>
                  </div>
                );
              })}
          </Flexbox>
        </GridElement>
        <GridElement position="b" align="center">
          <IconButton
            size="2x"
            icon={faPlus as IconProp}
            onClick={() => onAddPot()}
          ></IconButton>
        </GridElement>
      </Grid>
      <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <PotSettings visible={sidebar} uuid={uuid} guid={guid} suid={suid} puid={puid}></PotSettings>
      </Sidebar></>)
      }
    </>
  );
};

export { Pots };
