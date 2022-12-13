let playerNum = 0;

const player = (name) => {
    let choice;
    if (playerNum === 0) {
        choice = 'X';
    }
    else {
        choice = 'O';
    }
    playerNum++;
    return {name, choice};
};

const gameboard = (() => {
    const boardArray = [];

    const getBoard = (space) => {
        return boardArray[space];
    };

    const claimSpace = (space, player) => {
        boardArray[space] = player.choice;
        // update css to display the claimed space
    };

    return {boardArray, getBoard, claimSpace};
})();

let name1 = prompt("Please enter player one's name.");
  
const player1 = player(`${name1}`);

let name2 = prompt("Please enter player two's name.");
  
const player2 = player(`${name2}`);

console.log(`Player one's name is ${player1.name}. They are ${player1.choice}.`);

console.log(`Player two's name is ${player2.name}. They are ${player2.choice}.`);

// logic below tests the the space claim and boardArray can be checked outside of the gameboard object

let claim = 0;

gameboard.claimSpace(claim, player1);

console.log(`${player1.name} claims space ${claim + 1} with ${gameboard.boardArray[claim]}`);

claim++;

gameboard.claimSpace(claim, player2);

console.log(`${player2.name} claims space ${claim + 1} with ${gameboard.boardArray[claim]}`);

claim++;

gameboard.claimSpace(claim, player1);

console.log(`${player1.name} claims space ${claim + 1} with ${gameboard.boardArray[claim]}`);
