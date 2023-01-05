let playerNum = 0;
let claim = 0;

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

    for (i = 0; i < 9; i++) {
        boardArray.push('');
    }

    let spaces = document.getElementById('spaces');

    boardArray.forEach(() => {
        const square = document.createElement('div');
        square.className = 'square';
        spaces.appendChild(square);
    })

    const claimSpace = (space, player) => {
        boardArray[space] = player.choice;
        // update css to display the claimed space
    };

    return {boardArray, claimSpace};
})();

const gamelogic = (() => {

    const player1 = player(`${prompt("Please enter player one's name.")}`);

    const player2 = player(`${prompt("Please enter player two's name.")}`);

    console.log(`Player one's name is ${player1.name}. They are ${player1.choice}.`);

    console.log(`Player two's name is ${player2.name}. They are ${player2.choice}.`);

    const claimTest = () => {
        // logic below tests the the space claim and boardArray can be checked outside of the gameboard object

        gameboard.claimSpace(claim, player1);

        console.log(`${player1.name} claims space ${claim + 1} with ${gameboard.boardArray[claim]}`);

        claim++;

        gameboard.claimSpace(claim, player2);

        console.log(`${player2.name} claims space ${claim + 1} with ${gameboard.boardArray[claim]}`);

        claim++;

        gameboard.claimSpace(claim, player1);

        console.log(`${player1.name} claims space ${claim + 1} with ${gameboard.boardArray[claim]}`);
    };

    const winStates = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    return {claimTest, winStates, player1, player2};
})();