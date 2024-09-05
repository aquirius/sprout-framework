import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faHouse, faPen, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPIGet, useAPIPost } from "../api/api";
import { Flexbox, FlexboxElement } from "./Flexbox";
import { IconButton } from "../features/button/IconButton";
import { Sidebar } from "./Sidebar";
import { NotificationsSettings } from "../features/form/NotificationsSettings";
import { LightTheme, SkyGradient } from "../schema/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, GridElement } from "./Grid";

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
  width: 100%;
`;

const StyledNotifications = styled.div`
  position: relative;
  width: calc(100vw - 75px);
  height: 100px;
`;

const StyledNotificationsHeader = styled.div`
  width: 100%;
  font-size: 2rem;
  transition: all 0.5s ease;
  background: ${LightTheme.palette.light};
  color: ${LightTheme.palette.contrast};

`;

const StyledNotificationsButton = styled.div`
  width: 100%;
  transition: all 0.5s ease;
  position: relative;
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
  const deleteNotification = useAPIPost("", "delete", {});

  const onEditNotifications = (nuid: any, event: React.MouseEvent) => {
    setSidebar(true);
    setNuid(nuid);
  };

  let ws = useRef<WebSocket>(); // WebSocket reference

  // Establish WebSocket connection when component mounts
  useEffect(() => {
    // Replace with your WebSocket server URL
    ws.current = new WebSocket("ws://127.0.0.1:1234/ws");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");

      if(ws.current){

        ws.current.send("message");
    
        }
    };

    ws.current.onmessage = (event : any) => {
      // Update response when a message is received from the server
      console.log(event.data);
    };




    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error: any) => {
      console.error("WebSocket error:", error);
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    getNotifications.post({}, `/user/${uuid}/notifications`);
    if (loading || !getNotifications.data) {
      return;
    }
    setMessage("200");
    setLoading(false);
  }, [loading, deleteNotification.postVersion]);

  const handleDeleteNotification = (nuid: any) => {
    deleteNotification.post({}, `/user/${uuid}/notification/${nuid}`);
    setLoading(true)
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
                      <Grid gap="1" dimension="" layout="80% 20%">
                          <GridElement align="start">
                            <StyledNotificationsHeader>{value.Title ? value.Title : "\n"}</StyledNotificationsHeader>
                            <StyledNotificationsContent destination={value.Destination}>
                                {value.Message ? value.Message : "\n"}
                            </StyledNotificationsContent>
                          </GridElement>
                          <GridElement align="center">
                            <StyledNotificationsButton onClick={() => handleDeleteNotification(value.NUID)}><FontAwesomeIcon size='2x' icon={faX as IconProp}/></StyledNotificationsButton>
                          </GridElement>
                      </Grid>
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
