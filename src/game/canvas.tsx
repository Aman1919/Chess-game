
import { useEffect, useRef, useState } from "react"
import Game from "./game";


type Props = {
        gameover: string;
        setGameOver: (val: string) => void;
  setTurn: (val: string) => void;
  
};

const Canvas: React.FC<Props> = ({gameover,setGameOver,setTurn})=>{
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        const [game, setGame] = useState<Game | null>(null);        
        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                canvas.width = Math.min(window.innerWidth * 0.9, 720);
                canvas.height = Math.min(window.innerWidth * 0.9, 720);
                const context = canvas.getContext('2d');
                if (!context) return;
                const g = new Game(canvas.width, canvas.height, context, canvas,setTurn,setGameOver);
                setGame(g);
                
        },[])
        
        
        
        return <canvas
                
                ref={canvasRef}
                onClick={(e) => game?.onMouseClick(e)}
                onMouseMove={(e) => game?.OnMouseMove(e)}
        />
}

export default Canvas;