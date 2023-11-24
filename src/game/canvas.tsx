
import { useEffect, useRef, useState } from "react"
import Game from "./game";
import socket from "../components/socket";


type Props = {
        setGameOver: (val: string) => void;
  setTurn: (val: string) => void;
room?:string ;
orientation?:string;
turn:string;
};

const Canvas: React.FC<Props> = ({room,setGameOver,setTurn,orientation,turn})=>{
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        const [game, setGame] = useState<Game | null>(null);        
        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                canvas.width = Math.min(window.innerWidth * 0.9, 720);
                canvas.height = Math.min(window.innerWidth * 0.9, 720);
                const context = canvas.getContext('2d');
                if (!context) return;
                const g = new Game(canvas.width, canvas.height, context, canvas,setTurn,setGameOver,room);
                setGame(g);
             //    socket.on('move',(data)=>{
             //            console.log('move')
             // game?.MakeMove(data.prevSquare,data.nextSquare);
             //    })
        },[])
        
        function  onClick(e: React.MouseEvent<HTMLElement>){
                if(!game)return
                if(!orientation||!room){
                        game.onMouseClick(e);
                }else {
                if(orientation!==turn&&room)return;
                game.onMouseClick(e);
                }
        }
        
        return <canvas
                
                ref={canvasRef}
                onClick={(e) => game?.onMouseClick(e)}
                onMouseMove={(e) => game?.OnMouseMove(e)}
        />
}

export default Canvas;