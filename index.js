window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON'
    const PLAYERO_WON = 'PLAYER0_WON'
    const TIE = 'TIE!'

    /*
        Indexs within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
     */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = "Tie";
                announcer.classList.add('tie');
        }
        announcer.classList.remove('hide');
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`); // * Remove the wrong coloring
        currentPlayer = currentPlayer === "X" ? 'O' : 'X'; // * Change the symbol for the player
        playerDisplay.innerText = currentPlayer; // * Change who the current player is in the display
        playerDisplay.classList.add(`player${currentPlayer}`) // * Add the right coloring
    }

    function handleResultValidation() {
        let roundWon = false;

        for (let i = 0; i <= 7; i++) {
            // * Extact the different winningConditions From the list.
            const winCondition = winningConditions[i];

            // * Look at the board to check if the match the winning conditions!
            const a = board[winCondition[0]]
            const b = board[winCondition[1]]
            const c = board[winCondition[2]]

            if (a === '' || b === '' || c === '') {
                continue; // If any of the three files are Empty --> Continue to check the next condition.
            }
            // * If all three files contain the same symbol --> Stop checking for win conditions!
            if (a === b && b == c) {
                roundWon = true;
                break;
            }

        }

        // * If the game has been won! --> Announce the winner!
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON)
            isGameActive = false;
            return;
        }

        // * If there is no more empty tiles --> Announce it is a TIE!
        if (!board.includes('')) {
            announce(TIE);
        }


    }

    const updateBoard = (index) => {
        board[index] = currentPlayer; // * Set the tile to the current Player's symbol!
    }

    const isValidAction = (tile) => {
        // * If there is a symbol in the tile --> RETURN FALSE!
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    }

    const userAction = (tile, index) =>
    {
        if (isValidAction(tile) && isGameActive)
        {
            tile.innerText = currentPlayer; // * Add the current player's symbol.
            tile.classList.add(`player${currentPlayer}`); // * Assign the current player's class to the tile!
            updateBoard(index); // * Update the board
            handleResultValidation(); // * Check if the player won with this move!
            changePlayer(); // * Change player's turn
        }
    }

    const resetBoard = () =>
    {
        board = ['', '', '', '', '', '', '', '', '']; // * Empty the board!
        isGameActive = true; // * Start a new game
        announcer.classList.add('hide'); // * Hide the announcer again!
        announcer.classList.remove('tie') // * Remove the 'tie' class from the announcer!

        // * X always goes first!
        if(currentPlayer === 'O')
        {
            changePlayer();
        }

        // * Empty all tiles and reset their classes.
        tiles.forEach(tile =>
        {
            tile.innerText = '';
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })

    }


    tiles.forEach((tile, index) => tile.addEventListener('click', () => userAction(tile, index)));


    resetButton.addEventListener('click', resetBoard)
});