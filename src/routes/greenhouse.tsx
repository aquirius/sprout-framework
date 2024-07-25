
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Greenhouses } from '../components/Greenhouses';
import { CloudAnimation } from '../components/CloudAnimation';
import { Greenhouse } from '../components/Greenhouse';

interface GreenhousePageProps {
}
//Register page does import our form component and is bound to our react routing system
const GreenhousePage = ({} : GreenhousePageProps) : ReactElement => {
    const { uuid } = useParams();
    const { guid } = useParams();
    
    let userID : number = 0
    let greenhouseID : number = 0
    if (uuid != null){
        userID = parseInt(uuid)
    }
    if (guid != null){
        greenhouseID = parseInt(guid)
    }

    return (
    <>
    <CloudAnimation transform='' top={true}></CloudAnimation>
    <Grid layout={'75px auto'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar uuid={uuid}/>
        </GridElement>
        <GridElement position='b'>
            <Greenhouse uuid={userID} guid={greenhouseID}/>
        </GridElement>
    </Grid>
    </>
);
}


  
export { GreenhousePage }