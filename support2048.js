documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}

// function getNumberBackgroundColor(number) {
//     switch (number) {
//         case 2:
//             return "#eee4da";
//             break;
//         case 4:
//             return "#ede0c8";

//             break;
//         case 8:
//             return "#f2b179";
//             break;
//         case 16:
//             return "#f59563";
//             break;
//         case 32:
//             return "#f67c5f"
//             break;
//         case 64:
//             return "#f65e3b";
//             break;
//         case 128:
//             return "#edcc61";
//             break;
//         case 256:
//             return "#9c0";
//             break;
//         case 512:
//             return "#33b5e5";
//             break;
//         case 1024:
//             return "#09c";
//             break;
//         case 2048:
//             return "#a6c";
//             break;
//         case 4096:
//             return "#93c";
//             break;
//     }
//     return "black";
// }

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "url(./image/1.jpg)";
            break;
        case 4:
            return "url(./image/2.jpg)";
            break;
        case 8:
            return "url(./image/3.jpg)";
            break;
        case 16:
            return "url(./image/4.jpg)";
            break;
        case 32:
            return "url(./image/5.jpg)";
            break;
        case 64:
            return "url(./image/6.jpg)";
            break;
        case 128:
            return "url(./image/7.jpg)";
            break;
        case 256:
            return "url(./image/8.jpg)";
            break;
        case 512:
            return "url(./image/9.jpg)";
            break;
        case 1024:
            return "url(./image/10.jpg)";
            break;
        // case 2048:
        //     return "url(http://www.imooc.com/activity/2048/117139/pics/11.jpg)";
        //     break;
    }
}

function getNumberColor(number) {
    if (number <= 4)
        return "#776e65";

    return "white";
}

function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;
    return true;
}

function canMoveLeft(board) {

    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0)
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;
        }
    return false;
}


function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--)
            if (board[i][j] != 0)
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                    return true;

    return false;
}

function canMoveUp(board) {

    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0)
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
    return false;

}

function canMoveDown(board) {
    for (i = 2; i >= 0; i--)
        for (j = 0; j < 4; j++)
            if (board[i][j] != 0)
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0)
            return false;
    }
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}

function nomove(board) {
    if (canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board))
        return false;
    return true;
}
