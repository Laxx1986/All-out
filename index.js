let N = 10;
let blockSize = 500 / N;
let level = 1;
let levelFinished = false;


let images = [[]];
let img = new Image();

$(function () {
    gameCanvas = $('<div></div>');
    gameCanvas.appendTo('body');
    gameCanvas.attr('id', 'gameCanvas');

});

function openTopList() {
    window.location.href = 'toplist.html';
}

function openRules() {
    window.location.href = 'rules.html';
}

function startGame() {
    alert("A(z) " + level + " palya elindult");
    levelStart = true;
    drawLevel();
}

function drawLevel() {
    for(let i=0; i<N; i++) {
        for (let j=0; j<N; j++) {

            var emptyField = $('<div></div>');
            emptyField.addClass('emptyField');
            switch (level) {
                case 1: {
                    if (i === 0 && j === 9 || i === 0 && j === 8 || i === 1 && j === 9) {
                        emptyField.addClass('fullField');
                    }
                    break; }
                case 2: {
                    if (Math.random() > 0.8) {
                        emptyField.addClass('fullField');
                    }
                    break;
                }
                case 3: {
                    if (Math.random() > 0.7) {
                        emptyField.addClass('fullField');
                    }
                    break;
                }
                case 4: {
                    if (Math.random() > 0.6) {
                        emptyField.addClass('fullField');
                    }
                    break;
                }
            }


            emptyField.css({
                width: blockSize,
                height: blockSize,
                top: i*blockSize,
                left: j*blockSize
            });

            emptyField.appendTo(gameCanvas);
        }
    }
}

function nextLevel() {
    if (levelFinished === false) {
        alert("Előbb fejezd be az aktuális pályát");
    } else {
        drawLevel();
    }

}

function clickOnField () {
    //TODO megírni a klikkelési eseményt
    //TODO megírni a pályaléptetési feltételt.
    //TODO nextLevel-t meghívni
}


