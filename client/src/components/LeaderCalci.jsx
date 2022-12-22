import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useChatContext, Channel } from 'stream-chat-react';
import Cookies from "universal-cookie";
import CustomInput from './CustomInput';



const LeaderCalci=({personJSX})=>{
    const cookies= new Cookies();
        const player1= cookies.get("username");
        const player2= cookies.get("rivalUsername");
        const winner= cookies.get("winner");

        if(winner=='X'){
            personJSX.push(
                {rival: player2, result:winner}
            )
        }
        else{
            personJSX.push(
                {rival: player1, result:winner}
            )
        }
        
        return (
            personJSX
        )
}

export default LeaderCalci;