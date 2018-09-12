    var board;
    const human = 'O';
    const robot = 'X';
    const winBoard = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]

    const cells = document.querySelectorAll('.cell');
    start();

    function start() {
        document.querySelector(".finish").style.display = "none"
        board = [0,1,2,3,4,5,6,7,8]
        
        for(var cell of cells) {
            cell.innerText = ''
            cell.style.removeProperty('background-color');
            cell.addEventListener('click', clickCell, false);
        }
    }

    function clickCell(cell) {
        chooseCell(cell.target.id, human);
    }

    function chooseCell(id, player) {
        // Update board
        board[id] = player;
        document.getElementById(id).innerText = player;
        // Check if one of the combinations of marked cells has won the match
        checkWin(player);
        checkDraw();
    }

    function checkWin(player) {
        let moves = board.reduce(
            (acc,e,index) => (e == player) ? acc.concat(index) : acc,   // Add only marked cells
            []                                                          // Start with an empty array
        );
        for(var set of winBoard.values()) {
            if( set.every(x => moves.includes(x)) ) won(set, player);         // Check if the marked cells contains one element of winBoard
        }   
    }

    function won(set, player) {
        set.every( index => document.getElementById(index).style.backgroundColor = player == human ? "green" : "red");
    }

    function availableCells() {
        return board.filter(x => (x != human && x != robot));   
    }

    function checkDraw() {
        if(availableCells().length < 1) draw();
    }

    function draw() {
        [0,1,2,3,4,5,6,7,8].every( index => document.getElementById(index).style.backgroundColor = "gray");
    }