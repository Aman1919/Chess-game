import { useState } from "react";
import Canvas from "./game/canvas";

export default function App() {
  const [turn, setTurn] = useState('white');
  const [gameover, setGameOver] = useState<string>('');

  return (
    <div className="contanier">
      {(gameover.length) ? <p>{gameover} is the winner</p> : <p>Who's Turn is it : {turn}</p>}
      <Canvas gameover={gameover} setGameOver={setGameOver} setTurn={setTurn} />
    
    </div>

)
  }



