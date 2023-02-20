const GameBoard = (() => {
  
  const board_lenght = 9; 
  const board = [];

  for (let i = 0; i < board_lenght; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const addMark = (index, player) => {

    if (board[index].getValue() !== '') return;

    board[index].markCell(player);

  }

  const printBoard = () => {
    const boardWithCellValues = board.map((cell) => cell.getValue());
    console.log(boardWithCellValues);
  }

  const checkBoard = (index1, index2, index3) => {
    return (board[index1].getValue() === board[index2].getValue()) 
    && (board[index2].getValue() === board[index3].getValue())
    && (board[index2].getValue() !== '');
  }

  const checkWin = () => {
    return (checkBoard(0, 1, 2) || checkBoard(3, 4, 5) || checkBoard(6, 7, 8) || checkBoard(0, 3, 6)
    || checkBoard(1, 4, 7) || checkBoard(2, 5, 8) || checkBoard(0, 4, 8) || checkBoard(2, 4, 6))
  }

  return { getBoard, addMark, printBoard, checkWin}; 

})();

function Cell() {
  let value = '';

  const markCell = (player) => {
    value = player; 
  }; 

  const getValue = () => value; 

  return {
    markCell, 
    getValue
  }; 
}

const GameController = ((
  playerOneName = "Player1",
  playerTwoName = "Player2"
) => {

  const players = [
    {
      name: playerOneName,
      mark: 'X'
    },
    {
      name: playerTwoName,
      mark: 'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer; 

  const printNewRound = () => {
    GameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`)
  }


  const playRound = (index) => {
    if (GameBoard.checkWin()) return;
    
    console.log(
      `Dropping ${getActivePlayer().name}'s token ${getActivePlayer().mark} into column ${index}...`
    );
    GameBoard.addMark(index, getActivePlayer().mark);
    
    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();

  return {
    playRound,
    getActivePlayer
  };
})();
GameController.playRound(0);
GameController.playRound(3);
GameController.playRound(1);
GameController.playRound(5);
GameController.playRound(2);




