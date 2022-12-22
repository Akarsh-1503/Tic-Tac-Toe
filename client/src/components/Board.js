import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from "./Winning";
import Cookies from "universal-cookie";
import LeaderCalci from "./LeaderCalci";

function Board({personJSX, result, setResult}){

    const [board,setBoard]= useState(["","","","","","","","",""])
    const [player,setPlayer]= useState("X");
    const [turn,setTurn]= useState("X");
    
    const {channel}= useChannelStateContext();
    const {client}= useChatContext();


    useEffect(()=>{
        checkIfTie();
        checkWin();
    },[board]);

    useEffect(() => {
        if (result.state != "none") {
            alert(`Game Finished! Winning Player: ${result.winner}`);
            //   restartGame();
            // console.log(result)
            const cookies= new Cookies();
            cookies.set("winner",result.winner);
            console.log(turn);
            console.log(player);
            console.log(result.winner);

            if(player != result.winner){
                personJSX.push([`${cookies.get("username")}`,`${cookies.get("rivalUsername")}`,`${cookies.get("username")} Lost`]);}
            else{
                personJSX.push([`${cookies.get("username")}`,`${cookies.get("rivalUsername")}`,`${cookies.get("username")} Won`]);
            }
            console.log(personJSX)
        }
    }, [result]);

    const chooseSquare=async(square)=>{
        if(turn===player && board[square]===""){
            setTurn(player==="X" ? "O":"X" );

            await channel.sendEvent({
                type: "game-move",
                data: {square, player},
            })
            
            setBoard(board.map((val,idx)=>{
                if(idx=== square && val=== ""){
                    return player;
                }
                return val;
            }))
        }
    }

    const checkWin=()=>{

        Patterns.forEach((currPattern)=>{
            const firstPlayer= board[currPattern[0]]
            if(firstPlayer=="")
                return ;

            let foundWinnningPattern =true;
            currPattern.forEach((idx)=>{
                if(board[idx]!=firstPlayer){
                    foundWinnningPattern=false;
                }
            });

            if(foundWinnningPattern){
                // alert("Winner", board[currPattern[0]])
                setResult({winner: board[currPattern[0]], state: "Won"})
                    // personJSX.push(board[currPattern[0]])   
                }
        })

    }

    const checkIfTie=()=>{
        let filled= true;
        board.forEach((square)=>{
            if(square==""){
                filled=false;
            }
        })

        if(filled){
            // alert("Game Tied")
            const cookies= new Cookies();
            setResult({winner: "none", state: "tie"})
            personJSX.push([`${cookies.get("username")}`,`${cookies.get("rivalUsername")}`,` Game Tied`])
        }
    }


    channel.on((e)=>{
        if(e.type==="game-move" && e.user.id!== client.userID){
            const currentPlayer= e.data.player==="X"?"O":"X";
            
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            
            setBoard(board.map((val,idx)=>{
                if(idx=== e.data.square && val=== ""){
                    return e.data.player;
                }
                return val;
            }))
        }
    })
    return (
    <div className="board">
        <div className="row">
            <Square chooseSquare={()=>{chooseSquare(0)}} val={board[0]}/>
            <Square chooseSquare={()=>{chooseSquare(1)}} val={board[1]}/>
            <Square chooseSquare={()=>{chooseSquare(2)}} val={board[2]}/>
        </div>
        <div className="row">
            <Square chooseSquare={()=>{chooseSquare(3)}} val={board[3]}/>
            <Square chooseSquare={()=>{chooseSquare(4)}} val={board[4]}/>
            <Square chooseSquare={()=>{chooseSquare(5)}} val={board[5]}/>
        </div>
        <div className="row">
            <Square chooseSquare={()=>{chooseSquare(6)}} val={board[6]}/>
            <Square chooseSquare={()=>{chooseSquare(7)}} val={board[7]}/>
            <Square chooseSquare={()=>{chooseSquare(8)}} val={board[8]}/>
        </div>
    </div>
    )
}

export default Board;