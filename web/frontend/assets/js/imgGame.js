const PUZZLE_W_imgGame = 3;
const PUZZLE_H_imgGame = 2;

const SET_N_imgGame = 1;

const IMG_W_imgGame = 255;
const IMG_H_imgGame = 255;

const PUZZLE_HOVER_TINT_imgGame = '#80dfff';

var answer_imgGame;

var _stage_imgGame;
var _canvas_imgGame;

var _imgs_imgGame;
var _pieces_imgGame;
var _puzzleWidth_imgGame;
var _puzzleHeight_imgGame;
var _pieceWidth_imgGame;
var _pieceHeight_imgGame;
var _currentPiece_imgGame;
var _currentDropPiece_imgGame;  

var _mouse_imgGame;



function cleanupGames(){
    document.onmousemove = null;
    document.onmousedown = null;
    document.onmouseup = null;

    _pieces_imgGame = [];
    _pieces = []
}

function init_imgGame(ans){
    cleanupGames();

    console.log("Init img game!");
	answer_imgGame = ans;
    _imgs_imgGame = [];
    for (var i = 0; i < PUZZLE_W_imgGame; i++) {
    	for (var j = 0; j < PUZZLE_H_imgGame; j++) {
    		var img = new Image();
            //img.addEventListener('load',onImage,false);
            var path = (SET_N_imgGame + "/g1_" + (i + j * PUZZLE_W_imgGame) + ".png");
            img.src = "../../../frontend/img/game1/set" + path;
            _imgs_imgGame[i + j * PUZZLE_W_imgGame] = img;
    	}
    }

    onImage_imgGame();

    document.onmousedown = onPuzzleClick_imgGame;
    document.onmousemove = updatePuzzle_imgGame;
}
function onImage_imgGame(e){
    _pieceWidth_imgGame = IMG_W_imgGame;
    _pieceHeight_imgGame = IMG_H_imgGame;
    _puzzleWidth_imgGame = IMG_W_imgGame * PUZZLE_W_imgGame;
    _puzzleHeight_imgGame = IMG_H_imgGame * PUZZLE_H_imgGame;
    setCanvas_imgGame();
    initPuzzle_imgGame();
}

function setCanvas_imgGame(){
    _canvas_imgGame = document.getElementById('canvasIMG');
    
    _canvas_imgGame.style.width ='100%';
    _canvas_imgGame.style.height='100%';
    _stage_imgGame = _canvas_imgGame.getContext('2d');
    _canvas_imgGame.width = _puzzleWidth_imgGame;
    _canvas_imgGame.height = _puzzleHeight_imgGame;
    _canvas_imgGame.style.border = "1px solid black";
}

function initPuzzle_imgGame(){
    _pieces_imgGame = [];
    _mouse_imgGame = {x:0,y:0};
    _currentPiece_imgGame = null;
    _currentDropPiece_imgGame = null;
    for (var i = 0; i < PUZZLE_W_imgGame; i++) {
    	for (var j = 0; j < PUZZLE_H_imgGame; j++) {
    		_stage_imgGame.drawImage(_imgs_imgGame[i + j * PUZZLE_W_imgGame], 0, 0, _pieceWidth_imgGame, _pieceHeight_imgGame, i * _pieceWidth_imgGame, j * _pieceHeight_imgGame, _pieceWidth_imgGame, _pieceHeight_imgGame);
    	}
    }
    
    buildPieces_imgGame();
    shufflePuzzle_imgGame();
}

function buildPieces_imgGame(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < PUZZLE_W_imgGame * PUZZLE_H_imgGame;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        piece.img = _imgs_imgGame[i];
        piece.n = i;
        _pieces_imgGame.push(piece);
        xPos += _pieceWidth_imgGame;
        if(xPos >= _puzzleWidth_imgGame){
            xPos = 0;
            yPos += _pieceHeight_imgGame;
        }
    }
}
function shufflePuzzle_imgGame(){
    _pieces_imgGame = shuffleArray(_pieces_imgGame);
    _stage_imgGame.clearRect(0,0,_puzzleWidth_imgGame,_puzzleHeight_imgGame);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < _pieces_imgGame.length;i++){
        piece = _pieces_imgGame[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        //_stage_imgGame.drawImage(piece.img, piece.sx, piece.sy, _pieceWidth_imgGame, _pieceHeight_imgGame, xPos, yPos, _pieceWidth_imgGame, _pieceHeight_imgGame);
        _stage_imgGame.drawImage(piece.img, 0, 0, _pieceWidth_imgGame, _pieceHeight_imgGame, xPos, yPos, _pieceWidth_imgGame, _pieceHeight_imgGame);
        _stage_imgGame.strokeRect(xPos, yPos, _pieceWidth_imgGame,_pieceHeight_imgGame);
        xPos += _pieceWidth_imgGame;
        if(xPos >= _puzzleWidth_imgGame){
            xPos = 0;
            yPos += _pieceHeight_imgGame;
        }
    }
    
}
function onPuzzleClick_imgGame(e){
    if(e.layerX || e.layerX == 0){
        _mouse_imgGame.x = e.layerX - _canvas_imgGame.offsetLeft;
        _mouse_imgGame.y = e.layerY - _canvas_imgGame.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse_imgGame.x = e.offsetX - _canvas_imgGame.offsetLeft;
        _mouse_imgGame.y = e.offsetY - _canvas_imgGame.offsetTop;
    }
    _currentPiece_imgGame = checkPieceClicked_imgGame();
    if(_currentPiece_imgGame != null){
        checkWin_imgGame(_currentPiece_imgGame.n);
    }
}

function checkPieceClicked_imgGame(){
    var i;
    var piece;
    for(i = 0;i < _pieces_imgGame.length;i++){
        piece = _pieces_imgGame[i];
        if(_mouse_imgGame.x < 25 || _mouse_imgGame.y < 25 || _mouse_imgGame.x < piece.xPos || _mouse_imgGame.x > (piece.xPos + _pieceWidth_imgGame) || _mouse_imgGame.y < piece.yPos || _mouse_imgGame.y > (piece.yPos + _pieceHeight_imgGame)){
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
        _mouse_imgGame.x = e.layerX - _canvas_imgGame.offsetLeft;
        _mouse_imgGame.y = e.layerY - _canvas_imgGame.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse_imgGame.x = e.offsetX - _canvas_imgGame.offsetLeft;
        _mouse_imgGame.y = e.offsetY - _canvas_imgGame.offsetTop;
    }
	_stage_imgGame.clearRect(0,0,_puzzleWidth_imgGame,_puzzleHeight_imgGame);
    for(var i = 0;i < _pieces_imgGame.length;i++){
        piece = _pieces_imgGame[i];
        //_stage_imgGame.drawImage(peice.img, piece.sx, piece.sy, _pieceWidth_imgGame, _pieceHeight_imgGame, piece.xPos, piece.yPos, _pieceWidth_imgGame, _pieceHeight_imgGame);
        _stage_imgGame.drawImage(piece.img, 0, 0, _pieceWidth_imgGame, _pieceHeight_imgGame, piece.xPos, piece.yPos, _pieceWidth_imgGame, _pieceHeight_imgGame);
        
        _stage_imgGame.strokeRect(piece.xPos, piece.yPos, _pieceWidth_imgGame,_pieceHeight_imgGame);
        
        if(_mouse_imgGame.x < 25 || _mouse_imgGame.y < 25 || _mouse_imgGame.x < piece.xPos || _mouse_imgGame.x > (piece.xPos + _pieceWidth_imgGame) || _mouse_imgGame.y < piece.yPos || _mouse_imgGame.y > (piece.yPos + _pieceHeight_imgGame)){
            //NOT OVER
        }
        else{
            console.log(_mouse_imgGame.x + " -- " + _mouse_imgGame.y)
            _stage_imgGame.save();
            _stage_imgGame.globalAlpha = .4;
            _stage_imgGame.fillStyle = PUZZLE_HOVER_TINT_imgGame;
            _stage_imgGame.fillRect(piece.xPos,piece.yPos,_pieceWidth_imgGame, _pieceHeight_imgGame);
            _stage_imgGame.restore();
        }
    }		    
}

function checkWin_imgGame(ans){
    if(ans == answer_imgGame){
    	$('#winModal').modal();
    }else{
        $('#loseModal').modal();
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