//"use strict";

//variable - - - - - - - - - - - - - - - - - -
const board = document.getElementById("puzzleSpace");
const boardHeight = 200;
const boardWidth = 300;
const puzzleImage = document.getElementById("fullImage");
let puzzleArray = [[], [], [], []];
// - - - - - - - - - - - - - - - - - - - - - - 

//button functions - - - - - - - - - - - - - -
    function playGame(play, title) {
        document.getElementById("top").innerHTML = title;
        document.getElementById("games").setAttribute("class", "hide");
        document.getElementById(play).setAttribute("class", "see");
    }

    function goBack(game) {
        document.getElementById("top").innerHTML = "Puzzles and Games";
        document.getElementById("games").setAttribute("class", "see");
        document.getElementById(game).setAttribute("class", "hide");
        if (game === "puzzle") {
            while (board.hasChildNodes()) {
                board.removeChild(board.firstChild);
            }
            board.appendChild(puzzleImage);
        }
    }

    function startPuzzle() {
        puzzleImage.remove();
        makePuzzle();
    }
// - - - - - - - - - - - - - - - - - - - - - -

//puzzle functions - - - - - - - - - - - - - -
    function arrayShuffle(array) {
        let k1, temp;
        for (let k = array.length - 1; k <= 1; --k) {
            k1 = Math.floor((k + 1) * Math.random());
            temp = array[k];
            array[k] = array[k1];
            array[k1] = temp;
        } 
        return array;
    } 

    function makePiece(id = false, val1 = 0, val2 = 0) {
        let pieceDiv = document.createElement("div");
        pieceDiv.setAttribute("class", "puzzlePiece");
        board.appendChild(pieceDiv);
        if (id) {
            pieceDiv.setAttribute("id", `${val1}${val2}`);
        }
    }

    function makeSlot(id = false, num1, num2) {
        let pieceSlot = document.createElement("div");
        pieceSlot.setAttribute("class", "puzzleSlot");
        dropSpace.appendChild(pieceSlot);
        if (id) {
            pieceSlot.setAttribute("id", `a${num1}${num2}`);
        }
    }

    function makeSpace() {
        let dropSpace = document.createElement("div");
        dropSpace.setAttribute("id", "dropSpace");
        board.appendChild(dropSpace);
        let o = 0
        while (o < 4) {
            let j = 0
            while (j < 4) {
                makeSlot(true, o, j);
                j++
            }
            o++
        }
    }

    function makePuzzle() {
        makeSpace();
        let k = 0;
        while (k < 4) {
            let i = 0;
            while (i < 4) {
                makePiece(true, k, i);
                puzzleArray[k].push(i);
                let currentPiece = document.getElementById(`${k}${i}`);
                currentPiece.style.backgroundPosition = 25 * i + "% " + 25 * k + "%";
                currentPiece.addEventListener("mousedown", (function(event) {
                                                                let shiftX = event.clientX - currentPiece.getBoundingClientRect().left;
                                                                let shiftY = event.clientY - currentPiece.getBoundingClientRect().top;

                                                                currentPiece.style.position = "absolute";
                                                                currentPiece.style.zIndex = 1000;

                                                                function moveAt(pageX, pageY) {
                                                                    currentPiece.style.left = pageX - shiftX + 'px';
                                                                    currentPiece.style.top = pageY - shiftY + 'px';
                                                                }

                                                                moveAt(event.pageX, event.pageY);

                                                                function dropPiece(space) {
                                                                    space.style.background = 'url("../images/stockSnap_6K9RMTD3B3.jpg")';
                                                                    space.style.backgroundSize = "450px 312px";
                                                                    space.style.backgroundPosition = currentPiece.style.backgroundPosition;

                                                                    document.removeEventListener('mousemove', onMouseMove);
                                                                    currentPiece.removeEventListener('mousedown', this);
                                                                    currentPiece.onmouseup = null;
                                                                    currentPiece.remove();
                                                                }
                                                                                            
                                                                function onMouseMove(event) {
                                                                    moveAt(event.pageX, event.pageY);

                                                                    currentPiece.hidden = true;
                                                                    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                                                                    currentPiece.hidden = false;

                                                                    if (!elemBelow) return;
                                                                    if (!elemBelow.hasAttribute("id")) return;
                                                                    
                                                                    let spaceId = elemBelow.getAttribute("id");
                                                                    let pieceId = currentPiece.getAttribute("id");
                                                                    let compareId = spaceId.slice(1);

                                                                    if (pieceId === compareId) {
                                                                        currentPiece.addEventListener('mouseup', dropPiece(elemBelow));
                                                                    }
                                                                }
                                                                                            
                                                                document.addEventListener('mousemove', onMouseMove);
                                                                
                                                                currentPiece.ondragstart = function() {
                                                                    return false;
                                                                }
                                                            })) //drag and drop function
                i++;
            } //while i
            k++;
        } //while k
    }
// - - - - - - - - - - - - - - - - - - - - - -