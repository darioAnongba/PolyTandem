const PUZZLE_W = 3;
const PUZZLE_H = 2;

const SET_N = 1;

const IMG_W = 255;
const IMG_H = 255;

const PUZZLE_HOVER_TINT = '#80dfff';

var answer;

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

function init_imgGame(ans){

    delete window.foo;
    delete window.cleanup;

	answer = ans;
    _imgs = [];
    for (var i = 0; i < PUZZLE_W; i++) {
    	for (var j = 0; j < PUZZLE_H; j++) {
    		var img = new Image();
            img.addEventListener('load',onImage,false);
            var path = (SET_N + "/g1_" + (i + j * PUZZLE_W) + ".png");
            img.src = "../../../frontend/img/game1/set" + path;
            _imgs[i + j * PUZZLE_W] = img;
    	}
    }

    document.onmousedown = onPuzzleClick_imgGame;
    document.onmousemove = updatePuzzle_imgGame;
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
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";
}
function initPuzzle(){
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
    for(i = 0;i < PUZZLE_W * PUZZLE_H;i++){
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
function onPuzzleClick_imgGame(e){
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _currentPiece = checkPieceClicked();
    if(_currentPiece.n != null){
        checkWin(_currentPiece.n);
    }
}

function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle_imgGame(e){
	if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
	_stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        //_stage.drawImage(peice.img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.drawImage(piece.img, 0, 0, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        
        if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
            //NOT OVER
        }
        else{
            _stage.save();
            _stage.globalAlpha = .4;
            _stage.fillStyle = PUZZLE_HOVER_TINT;
            _stage.fillRect(piece.xPos,piece.yPos,_pieceWidth, _pieceHeight);
            _stage.restore();
        }
    }		    
}

function checkWin(ans){
    
    if(ans == answer){
    	//alert("WINNER!");
    }else{
		//alert("LOSER!");
    }
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/*
<body onload="init(1);">
    <canvas id="canvas"></canvas>
</body>
*/