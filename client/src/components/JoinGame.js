import { Box, Grid, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';import Cookies from 'universal-cookie';
import CustomInput from './CustomInput';
import Game from './Game';
import LeaderBoard from "./LeaderBoard";



const LeftComponent=styled(Box)`
    display:flex;
    flex-direction:column;
    
`





function JoinGame({personJSX}){

const [rivalUsername, setRivalUsername]=useState("");
const {client}= useChatContext();

const [channel, setChannel] =useState("");

const createChannel=async()=>{
    const response= await client.queryUsers({name:{$eq: rivalUsername}});

    if(response.users.length==0){
        alert("User Not Found")
        return ;
    }
    
    const newChannel= await client.channel("messaging",{
        members: [client.userID, response.users[0].id],
    })
    await newChannel.watch();
    setChannel(newChannel);
}
const Cooker=()=>{
    const cookies= new Cookies();

    cookies.set("rivalUsername", rivalUsername);

}


const Clicker=()=>{
    
    createChannel();
    Cooker();
}

    return (
        <>
        {
            channel ? 
            <Channel channel={channel} Input={CustomInput}>
                <Game personJSX={personJSX} channel={channel} setChannel={setChannel}/>
            </Channel>

        :<div className='joinGame'>
            <Box style={{display:'flex', flexDirection:'column'}}>
{/* 
            <Grid container>
            <Grid item sm={12} md={12} xs={12}>
                 */}
            <LeftComponent style={{textAlign:'center'}}>

            <h4 style={{textAlign:'center'}}>Create Game</h4>

            <input placeholder='Username of rival' style={{marginLeft:"10%" ,width:"80%",display:'flex', textAlign:'center', justifyContent:'center'}} 
                onChange={(e)=>{setRivalUsername(e.target.value)}}/>
        
            <button onClick={Clicker} style={{marginLeft:"20%" ,width:"60%", justifyContent:'center'}}> Join/Start Game</button>
          

            </LeftComponent>
                {/* <Box style={{maxWidth:'fit-content', overflow:'scroll'}}>
                    <LeaderBoard personJSX={personJSX}/>

                </Box> */}
            </Box>
        </div>
        }
    </>
    )
}

export default JoinGame;