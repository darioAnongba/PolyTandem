const PUZZLE_W = 3;
const PUZZLE_H = 2;

const SET_N = 1;

const IMG_W = 205;
const IMG_H = 205;

const PUZZLE_HOVER_TINT = '#80dfff';


var _stage;
var _canvas;

var _imgs;
var _pieces;
var _puzzleWidth;
var _puzzleHeight;
var _pieceWidth;
var _pieceHeight;
var _currentPiece;
var _currentDropPiece;  

var _mouse;

function init_storyGame(){
    cleanupGames();
    console.log("Init story game!");
    _imgs = [];
    for (var i = 0; i < PUZZLE_W; i++) {
    	for (var j = 0; j < PUZZLE_H; j++) {
    		var img = new Image();
            //img.addEventListener('load',onImage,false);
            img.src = "../../../frontend/img/game2/story" + i + "-" + j + ".png";
            _imgs[i + j * PUZZLE_W] = img;
    	}
    }

    
    onImage();
    buildPieces();

    document.onmousedown = onPuzzleClick_storyGame;
    document.onmousemove = updatePuzzle_storyGame;
    document.onmouseup = pieceDropped;
}

function onImage(e){
    _pieceWidth = IMG_W;
    _pieceHeight = IMG_H;
    _puzzleWidth = IMG_W * PUZZLE_W;
    _puzzleHeight = IMG_H * PUZZLE_H;
    setCanvas();
    initPuzzle();
}

function setCanvas(){
    _canvas = document.getElementById('canvasStory');
    _canvas.style.width ='100%';
    _canvas.style.height='100%';
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";
}

function initPuzzle(){
    console.log("init story puzzle!");
    _pieces = [];
    _mouse = {x:0,y:0};
    _currentPiece = null;
    _currentDropPiece = null;
    for (var i = 0; i < PUZZLE_W; i++) {
        for (var j = 0; j < PUZZLE_H; j++) {
            _stage.drawImage(_imgs[i + j * PUZZLE_W], 0, 0, _pieceWidth, _pieceHeight, i * _pieceWidth, j * _pieceHeight, _pieceWidth, _pieceHeight);
        }
    }
    
    buildPieces();
    shufflePuzzle();
}
function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0; i < PUZZLE_W * PUZZLE_H; i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        piece.img = _imgs[i];
        piece.n = i;
        _pieces.push(piece);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
}

function shufflePuzzle(){
    _pieces = shuffleArray(_pieces);
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        //_stage.drawImage(piece.img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
        _stage.drawImage(piece.img, 0, 0, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(xPos, yPos, _pieceWidth,_pieceHeight);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
    
}
function onPuzzleClick_storyGame(e){
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _currentPiece = checkPieceClicked();
    if(_currentPiece != null){
        _stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,_pieceWidth,_pieceHeight);
        _stage.save();
        _stage.globalAlpha = .9;
        _stage.drawImage(_currentPiece.img, 0, 0, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
        _stage.restore();   
        document.onmousemove = updatePuzzle_storyGame;
        document.onmouseup = pieceDropped;        
    }
}

function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(_mouse.x < 25 || _mouse.y < 25 || _mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle_storyGame(e){
    _currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(piece == _currentPiece){
            continue;
        }
        //_stage.drawImage(peice.img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.drawImage(piece.img, 0, 0, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(_currentDropPiece == null){
            if(_mouse.x < 25 || _mouse.y < 25 || _mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
                //NOT OVER
            }
            else{
                _currentDropPiece = piece;
                _stage.save();
                _stage.globalAlpha = .4;
                _stage.fillStyle = PUZZLE_HOVER_TINT;
                _stage.fillRect(_currentDropPiece.xPos,_currentDropPiece.yPos,_pieceWidth, _pieceHeight);
                _stage.restore();
            }
        }
    }
    if(_currentPiece != null){
        _stage.save();
        _stage.globalAlpha = .6;
        _stage.drawImage(_currentPiece.img, 0, 0, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
        _stage.restore();
        _stage.strokeRect( _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth,_pieceHeight);
    }
    
}
function pieceDropped(e){
    document.onmousemove = null;
    document.onmouseup = null;
    if(_currentDropPiece != null){
        var tmp = {xPos:_currentPiece.xPos,yPos:_currentPiece.yPos};
        _currentPiece.xPos = _currentDropPiece.xPos;
        _currentPiece.yPos = _currentDropPiece.yPos;
        _currentDropPiece.xPos = tmp.xPos;
        _currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}
function resetPuzzleAndCheckWin(){
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var gameWin = true;
    var piece;
    console.log("leng:" +  PUZZLE_W * PUZZLE_H);
    for(var ii = 0; ii < PUZZLE_W * PUZZLE_H; ii++){
        piece = _pieces[ii];
        _stage.drawImage(piece.img,0, 0, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    console.log(gameWin);
    if(gameWin){
        $('#winModal').modal();
    }
}
function gameOver(){
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


/*
<body onload="init();">
    <canvas id="canvas"></canvas>
</body>
*/