import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useChatContext, Channel } from 'stream-chat-react';
import Cookies from "universal-cookie";
import CustomInput from './CustomInput';






const LeaderBoard=({personJSX})=>{
    
        return (
            <>  
            <Box style={{marginTop:0}}>

                    <h3>SCOREBOARD :-</h3>
            </Box>
              <Box style={{display:'flex', flexDirection:'row'}}>
            {
                personJSX.map((people)=>{
                    
                    return (
                        <>
                            <Box style={{textAlign:'center', display:'flex', flexDirection:'column',marginLeft:10, background:'green',width:105}}>
                                <Box style={{background:'#42a5f5'}}>

                                    <Typography style={{ fontSize:20, fontWeight:'500'}}>
                                        {people[0]}
                                    </Typography>
                                    <Typography>VS </Typography>
                                    <Typography style={{ fontSize:20, fontWeight:'500'}}>
                                        {people[1]}
                                    </Typography>
                                
                                </Box>
                                <Box style={{marginTop:20}}>

                                    <Typography>
                                        {people[2]}
                                    </Typography>
                                
                                </Box>
                            </Box>
                        </>
                    )
                    //  (<ul>
                    //                  {people}
                    //         </ul>)
                    })
            }
                </Box>
              
            </>
        )
}

export default LeaderBoard;