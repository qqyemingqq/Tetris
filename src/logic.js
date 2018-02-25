'use stric';

var boardWidth = 10;
var boardHeight = 15;
var boardCoordinate = [[0, 0, 2, 2, 2, 2, 2, 2, 2, 2], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
var boardSprites = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
var cubeFactoryPlaceL = [
    [3, 4, 5, 6],
    [3, 4, 5, 6],
    [3, 4, 5, 6],
    [3, 4, 5, 6]
]
var cubeFactoryPlaceLRotationP = {x:2,y:4}
var cubeFactoryPlaceS = [
    [3, 4, 5],
    [3, 4, 5],
    [3, 4, 5]
]
var cubeFactoryPlaceSRotationP = {x:1,y:4}

var cubeLeftGun = [
    [2, 2, 2],
    [0, 0, 2],
    [0, 0, 0]
]
var cubeRightGun = [
    [2, 2, 2],
    [2, 0, 0],
    [0, 0, 0]
]
var cubeSquare = [
    [2, 2, 0],
    [2, 2, 0],
    [0, 0, 0]
]
var cubeLeftSnake=[
    [2,2,0],
    [0,2,2],
    [0,0,0]    
]
var cubeRightSnake=[
    [0,2,2],
    [2,2,0],
    [0,0,0]    
]
var cubeT=[
    [2,2,2],
    [0,2,0],
    [0,0,0]    
]
var cubeStick=[
    [0,2,0,0],
    [0,2,0,0],
    [0,2,0,0],
    [0,2,0,0]    
]

function refreshBoard() {
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (boardCoordinate[i][j] > 0) {
                boardSprites[i][j].visible = true;
            } else {
                boardSprites[i][j].visible = false;
            }
        }
    }
    cunbeFactory();
}

function initBoardBlocks() {
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            var dot = new Laya.Sprite();
            dot.loadImage('comp/cube.png', j * 20 + 30, i * 20 + 30);
            Laya.stage.addChild(dot);
            dot.visible = false;
            boardSprites[i][j] = dot;
        }
    }
}

function dropBlock() {
    var blocks = storeBlocks();
    var canMoveFlag = true;
    if (blocks != []) {
        blocks.forEach(function (e) {
            if (e.i + 1 == boardHeight) {
                canMoveFlag = false;
                setFreeze(blocks);
                blocks = [];
            } else if (boardCoordinate[e.i + 1][e.j] == 1) {
                canMoveFlag = false;
            }
        }, this);
        if (canMoveFlag && blocks.length > 0) {
            blocks.forEach((e) => {
                boardCoordinate[e.i][e.j] = 0;
            })
            blocks.forEach((e) => {
                boardCoordinate[e.i + 1][e.j] = 2;
            })
        } else {
            setFreeze(blocks);
        }
        blocks = [];
        refreshBoard();
    }
}

function blockPos(i, j) {
    this.i = i;
    this.j = j;
    return this;
}

function setFreeze(freezeBlocks) {
    freezeBlocks.forEach(function (e) {
        boardCoordinate[e.i][e.j] = 1;
    }, this);
    checkRemoveByline();
}

function rightMove() {
    var blocks = storeBlocks();
    var canMoveFlag = true;
    if (blocks != []) {
        blocks.forEach(function (e) {
            if (e.j + 1 == boardWidth) {
                canMoveFlag = false;
            } else if (boardCoordinate[e.i][e.j + 1] == 1) {
                canMoveFlag = false;
            }
        }, this);
        if (canMoveFlag) {
            blocks.forEach((e) => {
                boardCoordinate[e.i][e.j] = 0;
            })
            blocks.forEach((e) => {
                boardCoordinate[e.i][e.j + 1] = 2;
            })
        }
        refreshBoard();
    }
}

function leftMove() {
    var blocks = storeBlocks();
    var canMoveFlag = true;
    if (blocks != []) {
        blocks.forEach(function (e) {
            if (e.j - 1 < 0) {
                canMoveFlag = false;
            } else if (boardCoordinate[e.i][e.j - 1] == 1) {
                canMoveFlag = false;
            }
        }, this);
        if (canMoveFlag) {
            blocks.forEach((e) => {
                boardCoordinate[e.i][e.j] = 0;
            })
            blocks.forEach((e) => {
                boardCoordinate[e.i][e.j - 1] = 2;
            })
        }
        refreshBoard();
    }
}

function storeBlocks() {
    var _blocks = [];
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (boardCoordinate[i][j] == 2) {//存储需要下降的Block
                var _block = new blockPos(i, j);
                _blocks.push(_block);
            }
        }
    }
    return _blocks;
}

function checkRemoveByline() {
    var lines = [];
    var emptyLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < boardHeight; i++) {
        if (sumArray(boardCoordinate[i]) == 10) {
            lines.push(i);
        }
    }
    var a = boardCoordinate;
    console.log(a);
    lines.forEach(function (e) {
        boardCoordinate.splice(e, 1);
        boardCoordinate.splice(0, 0, emptyLine.slice());
    }, this);
}
function sumArray(array) {
    var sum = 0;
    array.forEach(function (e) {
        sum += e;
    }, this);
    return sum;
}
function cunbeFactory() {
    var shape = [];
    var canSpawn = true;
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (boardCoordinate[i][j] == 2) {
                canSpawn = false;
            }
        }
    }
    if (canSpawn) {
        boardCoordinate[0][0] = 2;
        boardCoordinate[1][0] = 2;
        boardCoordinate[0][1] = 2;
        boardCoordinate[1][1] = 2;
    }
}

function cunbeRamdom() {

}