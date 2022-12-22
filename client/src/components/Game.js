import React, { useState } from "react";
import Board from "./Board";
import { Window,MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css"
import { Box,styled } from "@mui/material";
// import GamePlay from './GamePlayer/GamePlay'


const Styler=styled(Box)`

    width: 100%;
    margin-top:20px;
    margin-right:20px;
    height:100%;
    display:flex;
    flex-direction:column;
`


function Game({personJSX, channel,setChannel}){
    const [playersJoined, setPlayersJoined]= useState(channel.state.watcher_count==2)

    const [result,setResult]= useState({winner: "none", state: "none"});
    channel.on("user.watching.start",(e)=>{
        setPlayersJoined(e.watcher_count==2)
    })
    if(!playersJoined){
        return (
            <div> Waiting for other player to join...</div>
        )
    }
    return (
        <div >
            <Styler >
            {/* <Box style={{width:'100%', display:'flex', flexDirection:'column'}}> */}
                {/* <Box> */}

            <Board personJSX={personJSX} result={result} setResult={setResult}/>
                {/* </Box> */}
            {/* <Box style={{width:'fit-content', display:'flex', marginTop:50}}> */}
                
            <Window>
                <MessageList disableDateSeparator 
                closeReactionSelectorOnClick 
                hideDeletedMessages
                messageActions={["react"]}/>
                <MessageInput noFiles/> 
            </Window>

                {/* </Box>
                </Box> */}


            <button style={{marginTop:5}} onClick={async()=>{
                await channel.stopWatching();
                setChannel(null);
            }}>Leave Game</button>
            </Styler>

            {/* {
                result.state === "won" && <h1><div>{result.winner} Won The Game</div></h1>
            }
            {
                result.state === "tie" && <h1><div>Game Tied</div></h1>
            } */}
        </div>
    )
}

export default Game;

