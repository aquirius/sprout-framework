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

const StyledNotificationSettings = styled.div<{ expand: boolean }>`
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

const StyledNotificationsContent = styled.div<{destination: string}>`
  background: ${LightTheme.palette.light};
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  color : ${LightTheme.palette.contrast};
  height: 100px;
  width: 100%;
`;

const StyledNotifications = styled.div`
  position: relative;
  width: calc(100vw - 75px);
  height: 100px;
`;

const StyledNotificationsHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 4rem;
  height: 65px;
  top: 0px;
  transition: all 0.5s ease;
  background: ${LightTheme.palette.light};
  color: ${LightTheme.palette.contrast};

`;

const StyledNotificationsButton = styled.div`
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
  const [nuid, setNuid] = useState(0);

  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const nav = useNavigate();
  const getNotifications = useAPIPost(`/user/${uuid}/notifications`, "get-many", {});
  const addNotifications = useAPIPost("", "add", {});

  const onEditNotifications = (nuid: any, event: React.MouseEvent) => {
    setSidebar(true);
    setNuid(nuid);
  };

  useEffect(() => {
    getNotifications.post({}, `/user/${uuid}/notifications`);
    if (loading || !getNotifications.data) {
      return;
    }
    setMessage("200");
    setLoading(false);
  }, [loading, addNotifications.postVersion]);

  const onAddNotifications = () => {
    setSidebar(true);

  };

  return (
    <>
      <Flexbox gap={1} align="center" direction="row" wrap="wrap">
        {getNotifications.data &&
          getNotifications.data.notifications.map((value: any, index: number) => {
            return (
              <div key={index}>
                <FlexboxElement align="flex-start" gap={1} order={0} grow={0}>
                  <StyledNotifications>
                    <StyledNotificationsHeader>{value.Title ? value.Title : "\n"}</StyledNotificationsHeader>
                    <StyledNotificationsContent destination={value.Destination}>
                        {value.Message ? value.Message : "\n"}
                    </StyledNotificationsContent>
                    <StyledNotificationsButton></StyledNotificationsButton>
                  </StyledNotifications>
                </FlexboxElement>
              </div>
            );
          })}
      </Flexbox>
      <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <NotificationsSettings uuid={uuid}></NotificationsSettings>
      </Sidebar>
    </>
  );
};

export { Notifications };
