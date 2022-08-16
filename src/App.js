import './App.css';
import { useState,useEffect } from 'react';
import Square from './Components/Square';
import { Patterns } from './Patterns';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result,setResult]=useState({winner:"none",state:"none"});

  useEffect(()=>{
    checkWinner();
    checkTie();
    if(player==="X"){
      setPlayer("O");

    }
    else{
      setPlayer("X");
    }
  },[board]);

  useEffect(()=>{
    if(result.state !=="none"){
      alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  },[result])

  const chooseSquareFunc = (square) => {
    setBoard(board.map((val, index) => {
      if (index === square && val === "") {
        return player;
      }
      return val;
      })
    );
  }

  const checkWinner=()=>{
    Patterns.forEach((currentPattern)=>{
      const firstPlayer=board[currentPattern[0]];
      if(firstPlayer ==="") return;
      let foundWinningPattern=true;
      currentPattern.forEach((idx)=>{
        if(board[idx]!==firstPlayer){
          foundWinningPattern=false;
        }
        
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    
    })
  }

  const checkTie=()=>{
    let filled=true;
    board.forEach((square)=>{
      if(square===""){
        filled=false;
      }
    })
    if(filled){
      setResult({winner:"No One",state:"Tie"});
    }
  }

  const restartGame=()=>{
    setBoard(["", "", "", "", "", "", "", "", ""]);
  }
  return (
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Square
            val={board[0]}
            chooseSquare={() => { chooseSquareFunc(0) }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => { chooseSquareFunc(1) }} />
          <Square
            val={board[2]}
            chooseSquare={() => { chooseSquareFunc(2) }} />
        </div>
        <div className='row'>
        <Square
            val={board[3]}
            chooseSquare={() => { chooseSquareFunc(3) }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => { chooseSquareFunc(4) }} />
          <Square
            val={board[5]}
            chooseSquare={() => { chooseSquareFunc(5) }} />
        </div>
        <div className='row'>
        <Square
            val={board[6]}
            chooseSquare={() => { chooseSquareFunc(6) }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => { chooseSquareFunc(7) }} />
          <Square
            val={board[8]}
            chooseSquare={() => { chooseSquareFunc(8) }} />
        </div>
        
      </div>
      <button className='resButton' onClick={restartGame}>Restart</button>
    </div>
   
      
  );
}

export default App;
