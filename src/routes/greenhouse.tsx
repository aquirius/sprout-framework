
import React, { ReactElement, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Greenhouse } from '../components/Greenhouse';
import { Stacks } from '../components/Stacks';
import { Pots } from '../components/Pots';
import { rejects } from 'assert';
import { Popup } from '../components/Popup';

interface GreenhousePageProps {
}
//Register page does import our form component and is bound to our react routing system
const GreenhousePage = ({}) : ReactElement => {
    const { uuid } = useParams();
    const { guid } = useParams();
    const [popup, setPopup] = useState(false)
    
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
    
    return (
    <>
    <Grid layout={'10vw 80vw'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar uuid={uuid}/>
        </GridElement>
        <GridElement position='b'>
            <Greenhouse uuid={userID} guid={greenhouseID}></Greenhouse>
                <Stacks onClick={(e) => onClick(e)} uuid={userID} guid={greenhouseID}></Stacks>
                <Popup rect={rect} popup={popup} height={200} width={200}></Popup>

        </GridElement>
    </Grid>
    <Background/>
    </>
);
}

  
export { GreenhousePage }