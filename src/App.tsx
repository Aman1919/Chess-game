import { useState } from "react";
import Canvas from "./game/canvas";
import CustomDialog from "./components/customDialog";

export default function App() {
  const [turn, setTurn] = useState('white');
  const [gameover, setGameOver] = useState<string>('');

  return (
    <div className="contanier">
      <h1>2 Player Chess Game</h1>
     <h4 >Turn :{turn}</h4>
      <Canvas gameover={gameover} setGameOver={setGameOver} setTurn={setTurn} />
      <CustomDialog winner={gameover} handleContinue={()=>setGameOver('')} />
    </div>

)
  }



