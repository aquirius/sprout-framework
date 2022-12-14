
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Greenhouse } from '../components/Greenhouse';
import { Stacks } from '../components/Stacks';
import { Pots } from '../components/Pots';


interface GreenhousePageProps {
}
//Register page does import our form component and is bound to our react routing system
const GreenhousePage = ({}) : ReactElement => {
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
    <Grid layout={'10vw 80vw'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar uuid={uuid}/>
        </GridElement>
        <GridElement position='b'>
            <Greenhouse uuid={userID} guid={greenhouseID}></Greenhouse>
                <Stacks uuid={userID} guid={greenhouseID}></Stacks>
        </GridElement>
    </Grid>
    <Background/>
    </>
);
}

  
export { GreenhousePage }