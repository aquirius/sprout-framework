import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPIGet, useAPIPost } from "../api/api";
import { Flexbox, FlexboxElement } from "./Flexbox";
import { IconButton } from "../features/button/IconButton";
import { Sidebar } from "./Sidebar";
import { NotificationsSettings } from "../features/form/NotificationsSettings";
import { LightTheme, SkyGradient } from "../schema/color";
import { getCurrentHourBackground, getDestinationStyling } from "./Greenhouse";

const StyledNotificationsettings = styled.div<{ expand: boolean }>`
  position: absolute;
  font-size: ${LightTheme.font.size.medium};
  top: 0px;
  transition: all 0.5s ease;
`;

const StyledAddNotificationsButton = styled.div`
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

const StyledGreenhouseContent = styled.div<{destination: string}>`
  background: ${(props) => getDestinationStyling(props.destination)};
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  height: 500px;
  width: 300px;
`;

const StyledGreenhouse = styled.div`
  position: relative;
  margin: 2rem;
  &:hover ${StyledNotificationsettings} {
    top: -50px;
  }
`;

const StyledGreenhouseHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 4rem;
  height: 65px;
  top: 0px;
  transition: all 0.5s ease;
  background: ${LightTheme.palette.secondary};
  color: ${LightTheme.palette.light};

`;

const StyledGreenhouseButton = styled.div`
  display: grid;
  width: 100%;
  height: 200px;
  top: 0px;
  transition: all 0.5s ease;
  position: relative;
  align-items: center;
  justify-content: center;
`;
interface NotificationsProps {
  uuid: number;
}

//Button component draws us an html button with icon and size of the icon
const Notifications = ({ uuid }: NotificationsProps): ReactElement => {
  const [messageFetch, setMessage] = useState("");
  const [guid, setGuid] = useState(0);

  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const nav = useNavigate();
  const getNotifications = useAPIGet(`/user/${uuid}/notifications`);
  const addGreenhouse = useAPIPost("", "add", {});

  const onEditNotifications = (guid: any, event: React.MouseEvent) => {
    setSidebar(true);
    setGuid(guid);
  };

  useEffect(() => {
    getNotifications.get();
    if (loading || !getNotifications.data) {
      return;
    }
    setMessage("200");
    setLoading(false);
  }, [loading, addGreenhouse.postVersion]);

  const onAddGreenhouse = () => {
    setSidebar(true);

  };

  return (
    <>
      <Flexbox gap={1} align="center" direction="row" wrap="wrap">
        {getNotifications.data &&
          getNotifications.data.Notifications.map((value: any, index: number) => {
            return (
              <div key={index}>
                <FlexboxElement align="flex-start" gap={1} order={0} grow={0}>
                  <StyledGreenhouse>
                    <StyledGreenhouseHeader>{value.DisplayName ? value.DisplayName : "\n"}</StyledGreenhouseHeader>
                    <StyledGreenhouseContent destination={value.Destination}>
                      <StyledGreenhouseButton>
                      <IconButton
                        size="3x"
                        icon={faHouse as IconProp}
                        onClick={(e) =>
                          nav("/user/" + uuid + "/greenhouse/" + value.GUID)
                        }
                      ></IconButton>
                      </StyledGreenhouseButton>
                      <StyledGreenhouseButton>
                        <IconButton
                          size="3x"
                          icon={faPen as IconProp}
                          onClick={(e) => onEditNotifications(value.GUID, e)}
                        ></IconButton>
                      </StyledGreenhouseButton>
                    </StyledGreenhouseContent>
                  </StyledGreenhouse>
                </FlexboxElement>
              </div>
            );
          })}
          <FlexboxElement align="flex-end" gap={1} order={0} grow={0}>
              <StyledAddNotificationsButton>
                <IconButton
                  size="4x"
                  icon={faPlus as IconProp}
                  onClick={() => onAddGreenhouse()}
                ></IconButton>
          </StyledAddNotificationsButton>
          </FlexboxElement>
      </Flexbox>
      <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <NotificationsSettings guid={guid}></NotificationsSettings>
      </Sidebar>
    </>
  );
};

export { Notifications };
