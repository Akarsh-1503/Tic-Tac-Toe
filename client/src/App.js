import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import SignUp from './components/Signup'
import {StreamChat} from 'stream-chat';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import JoinGame from './components/JoinGame';
import {Chat} from 'stream-chat-react';
import {Box, Grid, styled} from '@mui/material';
import LeaderBoard from './components/LeaderBoard';



const SignupStyler=styled(Box)`
  background: red;
  display:flex;
  flex-direction: column;
  margin: 5px;
`


function App({personJSX}) {

  const api_key="a4n4zc3q3qac";
  const cookies =new Cookies();
  const token= cookies.get("token");
  
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth]= useState(false);
  
  
  
    const logOut=()=>{
      cookies.remove("hashedPassword");
      // cookies.remove("username");
      cookies.remove("lastName");
      cookies.remove("firstName");
      cookies.remove("userId");
      cookies.remove("channelName");
      cookies.remove("token");
  
      client.disconnectUser();
      setIsAuth(false);
    };

  if(token){
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),

    },
      token
    ).then((user)=>{
      setIsAuth(true);
    });
  }
  
  
  return (
    <div className="App">
    
    {
      isAuth ? 
      <Chat client={client} >
        <Box style={{width:'100%',display:'flex', flexDirection:'column'}}>
          <Box>
              <button onClick={logOut} style={{position: 'top', justifyContent:'center'}}>Log Out</button>
          </Box>

        {/* <Grid container > */}
      
        {/* <Grid item md={12} sm={12} lg={12}> */}

        <Box style={{ background: 'green'}}>

          <JoinGame personJSX={personJSX}/>
        </Box>
        {/* </Grid> */}
        {/* </Grid> */}

      
        </Box>
      </Chat>
      : 
      <Grid container>

        <>
        
          <SignupStyler>
            {/* <Grid item md={6} sm={6} lg={6}> */}
              <SignUp setIsAuth={setIsAuth}/>
              <Login setIsAuth={setIsAuth}/>
            {/* </Grid>  */}
          </SignupStyler>
          
          <Box style={{maxWidth:'fit-content', overflow:'auto'}}>
            <Box style={{width:'100%'}}>
                    <LeaderBoard personJSX={personJSX}/>
            </Box>

          </Box>
          </>
      
      </Grid>
    }
    </div>
  );
}

export default App;
