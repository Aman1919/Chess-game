import { useState } from "react";
import Canvas from "./game/canvas";
import CustomDialog from "./components/customDialog";
import { Stack,Button } from "@mui/material";
import Game from './components/Game';
import socket from "./components/socket";
export default function App() {
  const [turn, setTurn] = useState('White');
  const [gameover, setGameOver] = useState<string>('');
  const [online, setOnline] = useState('');
  
  function OfflineGame() {
        return <>
           <h4 >Turn :{turn}</h4>
          <Canvas setGameOver={setGameOver} setTurn={setTurn} turn={turn} />
  <CustomDialog 
            open={Boolean(gameover)}
            title={gameover}
            contentText={gameover}
            handleContinue={() => {
              setGameOver("");
            } } ></CustomDialog>
</>
  }
  
  
  return (
    <div className="contanier">
      <h2>2 Player Chess Game</h2>
      <>
        {!online.length?<Stack
          alignItems="center"
          sx={{ py: 1, height: "100vh" }}
          gap='1rem'
        >
          <Button variant='contained' onClick={() => {
            setOnline('online')
            socket.connect()
          }}>Online</Button>
          <Button variant='contained' onClick={() => {
            setOnline('offline');
          }}>Offline</Button>
        </Stack> : ''}
        {online === 'online' ?
            <Game gameover={gameover} setGameOver={setGameOver} setTurn={setTurn} turn={turn} />:''}
        {online==='offline'?OfflineGame():''}
        
 </>
    
    </div>

)
  }



