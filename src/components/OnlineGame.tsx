import { Button, Stack, TextField } from "@mui/material";
import {useEffect, useState} from "react";
import CustomDialog from "./customDialog";
import socket from './socket';
import Canvas from "../game/canvas";

type Props = {
    username:string,
    gameover: string,
    setGameOver: (arg: string) => void,
    setTurn: (arg: string) => void,
    turn: string,
}

export default function OnlineGame({username,gameover, setGameOver, setTurn, turn}:Props) {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [roomInput, setRoomInput] = useState(''); // input state
  const [roomError, setRoomError] = useState('');
  const [room, setRoom] = useState('');
  const [orientation, setOrientation] = useState('');
  // const [players,setPlayers]=useState(['']);
const [opponent,setOpponent]=useState('');

    function game() {
        return (
            <>
                <div className="leftCorner">
                    <h5>Turn : {turn}</h5>
                    <h5>RoomId : {room}</h5>
                    <h5>Opponent : {opponent} </h5>
                    <h5>Orientation : {orientation}</h5>
                </div>

                <Canvas
                    room={room}
                    setGameOver={setGameOver}
                    setTurn={setTurn}
                 turn={turn}
                orientation={orientation}
                />
                <CustomDialog
                    open={Boolean(gameover)}
                    title={gameover}
                    contentText={gameover}
                    handleContinue={() => {
                        setGameOver("");
                    }}
                ></CustomDialog>
            </>
        );
    }

function JoinOrStart(){
  return  <Stack alignItems="center" sx={{ py: 1, height: "100vh" }}>
            <CustomDialog open={roomDialogOpen} handleClose={() => setRoomDialogOpen(false)}
                title="Select Room to Join"
                contentText="Enter a valid room ID to join the room"
                handleContinue={() => {
                    if (!roomInput) return;
                    socket.emit("username", username);
                    socket.emit("joinRoom", { roomId: roomInput}, (r: any) => {
                        if (r.error) return setRoomError(r.message);
                        console.log("response:", r);
                        // setPlayers(r.players);
                        console.log(r.players)
                        settingOpponent(r.players)
                        setRoom(r?.roomId);
                        setOrientation("Black");
                        setRoomDialogOpen(false)
                    });
                }}
            >
                <TextField autoFocus margin="dense" id="room" label="Room ID" name="room" value={roomInput} required
                    onChange={(e) => setRoomInput(e.target.value)}
                    type="text" fullWidth variant="standard" error={Boolean(roomError)}
                    helperText={!roomError ? 'Enter a room ID' : `Invalid room ID: ${roomError}` }
                />
            </CustomDialog>
            <Button variant="contained" onClick={() => {
                socket.emit("username", username);
                socket.emit("createRoom", (room:string) => {
                    console.log(room);
                    setRoom(room);
                    setOrientation('White');

                })
            }}>
                Start a game
            </Button>
            <Button onClick={() => {setRoomDialogOpen(true)}}>
                Join a game
            </Button>
        </Stack>

    }

    useEffect(() => {
        socket.on('opponentJoined',(roomData:any)=>{
            console.log("roomData",roomData);
            // setPlayers(roomData.players);
settingOpponent(roomData.players);
            // console.log(players);
            console.log(opponent)

        })
    }, []);
function settingOpponent(players:string[]){
    for(let p of players){
        if(p!==username){
            setOpponent(p);
            console.log(p,username)
            return;
        }
    }

}


  return <>
      {room?game():JoinOrStart()}
      </>;
}