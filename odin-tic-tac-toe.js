const player = (name, playerNum) => {
    let choice;
    if (playerNum === 'one') {
        choice = 'X';
    }
    else {
        choice = 'O';
    }
    return {name, choice};
};

const gameboard = (() => {

    let boardArray = [];

    for (i = 0; i < 9; i++) {
        boardArray.push('');
    }

    let spaces = document.getElementById('spaces');

    let play = document.getElementById('player-entry');

    boardArray.forEach(() => {
        const square = document.createElement('div');
        square.className = 'square';
        spaces.appendChild(square);
    });

    playAgain = () => {
        document.getElementById("message").style.display = "block";
    };

    resetGame = () => {
        const square = document.querySelectorAll('.square');
        square.forEach(square => {
            square.innerHTML = '';
        });
        boardArray = [];
        for (i = 0; i < 9; i++) {
            boardArray.push('');
        }
        play.reset();
        gamelogic.playerTurn = 'one';
        gamelogic.claim = 0;
        popup = document.getElementById("results");
        popup.textContent = '';
        document.getElementById("message").style.display = "none";
    };

    return {boardArray, playAgain, resetGame};
})();

const gamelogic = (() => {

    let claim = 0;

    let playerTurn = 'one';

    let win = true;

    let player1;

    let player2;

    let results = document.getElementById("results");

    const square = document.querySelectorAll('.square');
    square.forEach(square => {
        square.addEventListener('click', e => {
            
            if (playerTurn === 'one' && !win && e.target.textContent === '') {
                square.textContent = player1.choice;
                gameboard.boardArray[[...square.parentNode.children].indexOf(square)] = player1.choice;
                playerTurn = 'two';
                results.textContent = '';
            }
            else if (playerTurn === 'two' && !win && e.target.textContent === '') {
                square.textContent = player2.choice;
                gameboard.boardArray[[...square.parentNode.children].indexOf(square)] = player2.choice;
                playerTurn = 'one';              
                results.textContent = '';
            }
            else if ((e.target.textContent !== '') && !win) {
                return results.textContent = 'Please pick an empty square!';
            }
            else {
                return;
            };
            claim++;
            // check win conditions at 5 plays or more, minimum needed for victory of player 1
            if ((claim > 4) && (win === false)) {
                win = winCheck();
            }
            if (claim > 8) {
                results.textContent = `Tie game!`;
                win = true;
                gameboard.playAgain();
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
                    results.textContent = `Game over, ${player1.name} wins!`;
                }
                else {
                    results.textContent = `Game over, ${player2.name} wins!`;
                }
                gameboard.playAgain();
                return true;
            }
        }
        return false;
    };

    function playerGen (first, second) {
        player1 = player(first, 'one');
        player2 = player(second, 'two');
        win = false;
    };

    return {winStates, playerTurn, win, player1, player2, playerGen};
})();