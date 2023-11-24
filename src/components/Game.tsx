import Canvas from "../game/canvas";
import socket from "./socket";
import {useEffect, useState} from "react";
import CustomDialog from "./customDialog";
import { Container, TextField } from "@mui/material";
import OnlineGame from "./OnlineGame";


type Props = {
    gameover: string,
    setGameOver: (arg: string) => void,
    setTurn: (arg: string) => void,
    turn: string,
}

export default function Game({gameover,setGameOver, setTurn, turn}:Props) {
    const [userName, setUserName] = useState("");
    const [submit, setSubmit] = useState<boolean>(true);



  return (
    <Container>
      <CustomDialog
        open={submit}
        title="Pick a username"
        contentText="Please select a username"
        handleContinue={() => {
                if (!userName) return;
                setSubmit(false);
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          name="username"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
      </CustomDialog>
        {!submit && <OnlineGame username = {userName}  gameover={gameover} setGameOver={setGameOver} setTurn={setTurn} turn={turn}/>}
    </Container>
  );
}
