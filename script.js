    var board;
    var wonSet;
    const human = 'O';
    const robot = 'X';
    const winBoard = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]

    const cells = document.querySelectorAll('.cell');
    start();

    function start() {
        document.querySelector(".finish").style.display = "none"
        board = [0,1,2,3,4,5,6,7,8]
        wonSet = []
        
        for(var cell of cells) {
            cell.innerText = ''
            cell.style.removeProperty('background-color');
            cell.addEventListener('click', clickCell, false);
        }
    }

    function clickCell(cell) {
        chooseCell(cell.target.id, human);
        chooseCell(minimax(robot, -99999, 99999).move, robot);
    }

    function chooseCell(id, player) {
        // Update board
        board[id] = player;
        document.getElementById(id).innerText = player;

        // Check if one of the combinations of marked cells has won the match
        if(checkWin(player)) won();
        if(checkDraw()) draw();
    }

    function checkWin(player) {
        let moves = board.reduce(
            (acc,e,index) => (e == player) ? acc.concat(index) : acc,   // Add only marked cells
            []                                                          // Start with an empty array
        );
        for(var set of winBoard.values()) {
            if( set.every(x => moves.includes(x)) ) {  // Check if the marked cells contains one element of winBoard          
                wonSet = set;
                return true;
            }   
        }
        return false;
    }

    function won(set, player) {
        wonSet.every( index => document.getElementById(index).style.backgroundColor = player == human ? "green" : "red");
    }

    function availableCells() {
        return board.filter(x => (x != human && x != robot));   
    }

    function checkDraw() {
        return availableCells().length < 1;
    }

    function draw() {
        [0,1,2,3,4,5,6,7,8].every( index => document.getElementById(index).style.backgroundColor = "gray");
    }

    function minimax(player, alpha, beta) {
        if(checkWin(robot)) return {utility: 10};
        else if(checkWin(human)) return {utility: -10};
        else if(availableCells().length < 1) return {utility: 0};
    
        var currentBest = (player == robot) ? {utility:-9999} : {utility:9999};
        for(var move of availableCells()) {
            board[move] = player;
            var next = (player == robot) ? minimax(human, alpha, beta) : minimax(robot, alpha, beta);
            board[move] = move;

            if(player == robot) {
                if(next.utility > currentBest.utility) currentBest = {move: move, utility:next.utility};
                alpha = Math.max(alpha, currentBest.utility);
            } else {
                if(next.utility < currentBest.utility) currentBest = {move: move, utility:next.utility};
                beta = Math.min(beta, currentBest.utility);
            }
            if(alpha >= beta) return currentBest;
        }
        return currentBest;
    }