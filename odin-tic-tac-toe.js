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

let name1 = prompt("Please enter player one's name.");
  
const player1 = player(`${name1}`);

let name2 = prompt("Please enter player two's name.");
  
const player2 = player(`${name2}`);

console.log(`Player one's name is ${player1.name}. They are ${player1.choice}.`);

console.log(`Player two's name is ${player2.name}. They are ${player2.choice}.`);