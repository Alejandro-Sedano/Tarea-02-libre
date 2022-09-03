var board;
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]

    ]

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").appendChild(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmplyTle() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            if(board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if(!hasEmplyTle()){
        return;
    }

    let found = false;
    while(!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if(board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = 2;
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerHTML = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0) {
        tile.innerHTML = num;
        if(num <= 4096){
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft"){
        moveLeft();
        setTwo();
    }
    if(e.code == "ArrowRight"){
        moveRight();
        setTwo();
    }
    if(e.code == "ArrowUp"){
        moveUp();
        setTwo();
    }
    if(e.code == "ArrowDown"){
        moveDown();
        setTwo();
    }

    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num != 0); // create a new array withouth 0
}

function slide(row) {
    //[0, 2, 2, 2]
    row = filterZero(row); //get rid of 0 -> [2, 2, 2]

    //slice
    for(let i = 0; i < row.length - 1; i++) {
        if(row[i] == row[i + 1]) {
            row[i] *= 2;
            row.splice(i + 1, 1);
            score += row[i];
        } // [2, 2, 2] -> [4, 0, 2]
    }

    row = filterZero(row); //[4, 2]

    while(row.length < cols) {
        row.push(0);
    } // [4, 2, 0, 0]

    return row;
}

function moveLeft() {
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function moveRight() {
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function moveUp() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function moveDown() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}