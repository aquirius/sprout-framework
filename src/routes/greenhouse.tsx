
import React, { ReactElement, ReactEventHandler, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Greenhouse } from '../components/Greenhouse';
import { Stacks } from '../components/Stacks';
import { Pots } from '../components/Pots';
import { rejects } from 'assert';
import { Popup } from '../components/Popup';
import { Sidebar } from '../components/Sidebar';
import { RecordWithTtl } from 'dns';

interface GreenhousePageProps {
}
//Register page does import our form component and is bound to our react routing system
const GreenhousePage = ({}) : ReactElement => {
    const { uuid } = useParams();
    const { guid } = useParams();
    const [popup, setPopup] = useState(false)
    const [sidebar, setSideBar] = useState(false)

    let userID : number = 0
    let greenhouseID : number = 0
    if (uuid != null){
        userID = parseInt(uuid)
    }
    if (guid != null){
        greenhouseID = parseInt(guid)
    }

    var rect;

    const onClick = (event: any ) => {
        event.preventDefault()
        rect = event.currentTarget.getBoundingClientRect()
        setPopup(true)
        return
    }

    const onSidebar = (event: React.PointerEvent ) => {
        setSideBar(!sidebar)
        event.preventDefault()
        var puid = event.currentTarget.getAttribute("puid")
        console.log(puid)
        return
    }
    
    return (
    <>
    <Grid layout={'10vw auto'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar uuid={uuid}/>
        </GridElement>
        <GridElement position='b'>
            <Greenhouse uuid={userID} guid={greenhouseID}>
                <Stacks onClick={(e) => onSidebar(e)} uuid={userID} guid={greenhouseID}></Stacks>
                <Sidebar expand={sidebar} onStacks={(e) => onClick(e)}>{<>adsfasdf</>}</Sidebar>
            </Greenhouse>
        </GridElement>
    </Grid>
    <Background/>
    </>
);
}

  
export { GreenhousePage }