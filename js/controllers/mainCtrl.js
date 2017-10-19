app.controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.cells = angular.copy(cells);
    $scope.checkedCells = 9;
    $scope.rowOne = [$scope.cells[0], $scope.cells[1], $scope.cells[2]];
    $scope.rowTwo = [$scope.cells[3], $scope.cells[4], $scope.cells[5]];
    $scope.rowThree = [$scope.cells[6], $scope.cells[7], $scope.cells[8]];
    $scope.nought = gamePiecesArray[0];
    $scope.cross = gamePiecesArray[1];
    $scope.userPiece = null;
    $scope.computerPiece = null;
    $scope.winner = null;
    $scope.userWinner = false;
    $scope.computerWinner = false;
    $scope.whoWon = null;
    $scope.modalShown = false;

    function gameStart() {
        $scope.randomNum = Math.floor((Math.random() * 2));
        if ($scope.randomNum === 0) {
            $scope.userPiece = $scope.cross;
            $scope.computerPiece = $scope.nought;
        } else {
            $scope.userPiece = $scope.nought;
            $scope.computerPiece = $scope.cross;
        }
    }
    gameStart();

    function winnerCheck(cellOne, cellTwo, cellThree, cellContent) {
        if (cellOne.content === cellContent && cellTwo.content === cellContent && cellThree.content === cellContent) {
            return true;
        }
        return false;
    }

    function watcher(playerPiece) {
        var winnerExists = true;
        switch (winnerExists) {
            case winnerCheck($scope.cells[0], $scope.cells[1], $scope.cells[2], playerPiece):
            case winnerCheck($scope.cells[3], $scope.cells[4], $scope.cells[5], playerPiece):
            case winnerCheck($scope.cells[6], $scope.cells[7], $scope.cells[8], playerPiece):
            case winnerCheck($scope.cells[0], $scope.cells[3], $scope.cells[6], playerPiece):
            case winnerCheck($scope.cells[1], $scope.cells[4], $scope.cells[7], playerPiece):
            case winnerCheck($scope.cells[2], $scope.cells[5], $scope.cells[8], playerPiece):
            case winnerCheck($scope.cells[0], $scope.cells[4], $scope.cells[8], playerPiece):
            case winnerCheck($scope.cells[2], $scope.cells[4], $scope.cells[6], playerPiece):
                winnerExists = true;
                break;

            default:
                winnerExists = false;
        }
        return winnerExists;
    }

    function returnComputerSelection() {
        var tempCellAraay = angular.copy($scope.cells);
        randomNumForComputer = Math.floor((Math.random() * tempCellAraay.length));
        while (tempCellAraay[randomNumForComputer].checked) {
            tempCellAraay.splice(randomNumForComputer, 1);
            randomNumForComputer = Math.floor((Math.random() * tempCellAraay.length));
        }

        function findInCellsArray(cell) {
            return cell.name === tempCellAraay[randomNumForComputer].name;
        }
        return $scope.cells.find(findInCellsArray);
    }

    function computerTurn() {
        $timeout(function() {
            var computerSelection = returnComputerSelection();
            $scope.assignPlayerSelection(computerSelection, $scope.computerPiece);
        }, 700);
    }

    function resetBoard() {
        $scope.cells = angular.copy(cells);
        $scope.rowOne = [$scope.cells[0], $scope.cells[1], $scope.cells[2]];
        $scope.rowTwo = [$scope.cells[3], $scope.cells[4], $scope.cells[5]];
        $scope.rowThree = [$scope.cells[6], $scope.cells[7], $scope.cells[8]];
    }

    $scope.assignPlayerSelection = function(cell, piece) {
        if (cell.checked === false && !$scope.modalShown) {
            if (piece === $scope.userPiece) {
                cell.content = $scope.userPiece;
                cell.checked = true;
                $scope.checkedCells --;
                $scope.userWinner = watcher($scope.userPiece);
                if ($scope.userWinner) {
                    $scope.whoWon = "won";
                    $scope.checkedCells = 9;
                    $scope.toggleModal();
                } else if($scope.checkedCells > 0) {
                    computerTurn();
                }
                else{
                  $scope.whoWon = "are tied";
                  $scope.checkedCells = 9;
                  $scope.toggleModal();
                }
            } else {
                cell.content = $scope.computerPiece;
                cell.checked = true;
                $scope.checkedCells --;
                $scope.computerWinner = watcher($scope.computerPiece);
                if ($scope.computerWinner) {
                    $scope.whoWon = "Lost";
                    $scope.checkedCells = 9;
                    $scope.toggleModal();
                }
            }
        }
    }

    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
        resetBoard();
    };


}]);
