var board = new Array();
var hasConflicted = new Array();
var score = 0;
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var Win = false;

sessionStorage.setItem('score', 0);

$(document).ready(function() {
    prepareForMobile();
    newgame();

});

function prepareForMobile() {

    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }


    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);



}

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++)
            board[i][j] = 0;
        hasConflicted[i][j] = false;
    }
    updateBoardView();
}

function updateBoardView() {

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 0.5 * cellSideLength);
                theNumberCell.css('left', getPosLeft(i, j) + 0.5 * cellSideLength);
            } else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css("background", getNumberBackgroundColor(board[i][j]));
                //  theNumberCell.css("color", getNumberColor(board[i][j]));
                //theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    $(".number-cell").css('line-height', cellSideLength + 'px');
    $(".number-cell").css('font-size', 0.6 * cellSideLength + 'px');
}

function generateOneNumber() {
    if (nospace(board))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0
    while (times < 50) {
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }

    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}
$(document).keydown(function(event) {

    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {

                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;

        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
    }
})
document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX;

    startY = event.touches[0].pageY;

});
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
})
document.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].pageX;

    endY = event.changedTouches[0].pageY;
    var DX = endX - startX;
    var DY = endY - startY;
   if (Math.abs(DX) < 0.3 * documentWidth && Math.abs(DY) < 0.3 * documentWidth)
       return;
   if (Math.abs(DX) > Math.abs(DY)) {
       if (DX > 0) {
           //move right
           if (moveRight()) {
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
           }
       } else {
           //move left;
           if (moveLeft()) {

               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
           }
       }

   } else {
       if (DY > 0) {
           //move down
           if (moveDown()) {
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
           }
       } else {
           //move up
           if (moveUp()) {
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
           }
       }

   }

});

function isgameover() {
    if (nospace(board) && nomove(board))
        gameover();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 1024)
                win();

}

function gameover() {

    sessionStorage.setItem('score', score);
    $('.fail').show();

}

function win() {
    Win = true;
    $('.success').show();
}

function moveLeft() {
    if (Win)
        return false;
    if (!canMoveLeft(board))
        return false;
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move;
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        hasConflicted[i][k] = true;
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }

        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (Win)
        return false;
    if (!canMoveRight(board))
        return false;
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] == true;
                        score += board[i][k];
                        updateScore(score);
                        continue;

                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (Win)
        return false;
    if (!canMoveUp(board))
        return false
    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (Win)
        return false;
    if (!canMoveDown(board))
        return false;
    for (var i = 2; i >= 0; i--)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}
