
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
                const context = canvas.getContext('2d');
                if (!context) return;
                canvas.width = Math.min(window.innerWidth * 0.9, 720);
                canvas.height = Math.min(window.innerWidth * 0.9, 720);

                const g = new Game(canvas.width, canvas.height, context, canvas,setTurn,setGameOver,room);
                setGame(g);
                console.log('not socket')

},[canvasRef,window.innerWidth])

                        socket.on('move', (data) => {
                                if(!game)return;
                                console.log(data);

                                game.MakeSocketMove(data);
                        })


        function  onClick(e: React.MouseEvent<HTMLElement>){
                if(!game)return
                if(!orientation||!room){
                        game.onMouseClick(e);
                        console.log('first',room,orientation)
                }else {
                if(orientation!==turn)return;
                game.onMouseClick(e);
                        console.log('second')
                }
        }
        
        return<div id='canvasDiv'>
                <canvas
                
                ref={canvasRef}
                onClick={(e) => onClick(e)}
                onMouseMove={(e) => game?.OnMouseMove(e)}
        />

        </div>
}

export default Canvas;