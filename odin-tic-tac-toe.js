const player = (name, playerNum) => {

    let choice;
    if (playerNum === 'one') {
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
    });

    return {boardArray};
})();

const gamelogic = (() => {

    let claim = 0;

    let playerTurn = 'one';

    let win = false;

    const player1 = player(`${prompt("Please enter player one's name.")}`, 'one');

    const player2 = player(`${prompt("Please enter player two's name.")}`, 'two');

    console.log(`Player one's name is ${player1.name}. They are ${player1.choice}.`);

    console.log(`Player two's name is ${player2.name}. They are ${player2.choice}.`);

    const square = document.querySelectorAll('.square');
    square.forEach(square => {
        square.addEventListener('click', e => {
            if (playerTurn === 'one' && !win && e.target.textContent === '') {
                square.textContent = player1.choice;
                gameboard.boardArray[[...square.parentNode.children].indexOf(square)] = player1.choice;
                playerTurn = 'two';
            }
            else if (playerTurn === 'two' && !win && e.target.textContent === '') {
                square.textContent = player2.choice;
                gameboard.boardArray[[...square.parentNode.children].indexOf(square)] = player2.choice;
                playerTurn = 'one';              
            }
            else if ((e.target.textContent !== '') && !win) {
                return console.log('Please pick an empty square');
            }
            else {
                return;
            };
            claim++;
            // check win conditions at 5 plays or more, minimum needed for victory of player 1
            if ((claim > 8) && (win === false)) {
                console.log('Tie game! Play again?');
                win = true;
            }
            else if (claim > 4) {
                win = winCheck();
            };
        });
    });

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

    winCheck = () => {
        for (let combos of winStates) {
            if (
                // this part is not working properly; the sections evaluate to '' and not value stored
                gameboard.boardArray[combos[0]] 
                == gameboard.boardArray[combos[1]] &&
                gameboard.boardArray[combos[1]] 
                == gameboard.boardArray[combos[2]] &&
                gameboard.boardArray[combos[0]] != ''
            ) {
                let turn = claim % 2;
                if (turn) {
                    console.log(`Game over ${player1.name} wins!`);
                }
                else {
                    console.log(`Game over ${player2.name} wins!`); 
                }
                return true;
            }
        }
        return false;
    };

    return {winStates, player1, player2, playerTurn, win};
})();