import Card from "../Card/Card";
import { useEffect, useState } from "react";
import "./Grid.css";
import isWinner from "../../helpers/checkWinner";

function Grid ({ numberOfCards }) {
   const [board, setBoard] = useState(Array(numberOfCards).fill(""));
   const [turn, setTurn] = useState(true);   // true == O, false == X
   const [winner, setWinner] = useState(null);
   const [noWin, setNoWin] = useState(false);

   function play (index) {
      if (turn == true) {
        board[index] = "O" ;
      }else {
        board[index] = "X" ;
      }
      const win = isWinner(board, turn ? "O" : "X");
      if (win) {
         setWinner(win);
      }
      setBoard([...board]);
      setTurn(!turn);
   }
   useEffect(() => {
      if (board[0] !== '' && board[1] !== '' && board[2] !== '' &&
          board[3] !== '' && board[4] !== '' && board[5] !== '' &&
          board[6] !== '' && board[7] !== '' && board[8] !== ''
      ) {
        if(!winner) setNoWin(true);
      }
    
    }, [board])

   function reset () {
     setTurn(true);
     setWinner(null);
     setBoard(Array(numberOfCards).fill(""));
     setNoWin(false);
   }

   return (

    <div className="grid-wrapper" >
        {
           winner && (
            <>
                <h1 className="turn-highlight"> Winner is {winner} </h1>
                <button className="reset" onClick= {reset} > Reset Game</button>
            </>    
           )

        }
        {
           noWin  && (
            <>
                <h1 className="turn-highlight">Match Tie</h1>
                <button className="reset" onClick={reset}>Reset Game</button>          
            </>
           )

        }
        <h1 className="turn-highlight">Current turn: {(turn) ? 'O' : 'X'}</h1>
         <div className="grid" >
          {board.map((el, idx) => <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx}/>)}
       </div>

    </div>
      
   );
}

export default Grid;