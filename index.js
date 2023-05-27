let N = 10;
let blockSize = 500 / N;
let level = 1;
let levelFinished = false;


let images = [[]];
let img = new Image();
let allEmpty=true;

$(function () {
    gameCanvas = $('<div></div>');
    gameCanvas.appendTo('body');
    gameCanvas.attr('id', 'gameCanvas');
    gameCanvas.on('click', '.emptyField', clickOnField);
    gameCanvas.on('click', '.fullField', clickOnField);

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
                        emptyField.removeClass('emptyField');
                        emptyField.addClass('fullField');
                    }
                    break; }
                case 2: {
                    if (Math.random() > 0.8) {
                        emptyField.removeClass('emptyField');
                        emptyField.addClass('fullField');
                    }
                    break;
                }
                case 3: {
                    if (Math.random() > 0.7) {
                        emptyField.removeClass('emptyField');
                        emptyField.addClass('fullField');
                    }
                    break;
                }
                case 4: {
                    if (Math.random() > 0.6) {
                        emptyField.removeClass('emptyField');
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
    allEmpty = true;
}

function nextLevel() {
    if (levelFinished === false) {
        alert("Előbb fejezd be az aktuális pályát");
    } else {
        drawLevel();
    }

}

function clickOnField () {
    var audio = new Audio('click.wav'); // Hangfájl elérési útja
    audio.play();
    var clickedField = $(this);
    var index = gameCanvas.children().index(clickedField);
    var row = Math.floor(index / N); // sor indexe
    var col = index % N; // oszlop indexe
    console.log(row + " " + col);


    // Felül lévő mező
    if (row > 0) {
        var aboveIndex = (row - 1) * N + col;
        var aboveField = gameCanvas.children().eq(aboveIndex);
        switch (true) {

            case aboveField.hasClass('emptyField'):
                aboveField.removeClass('emptyField');
                aboveField.addClass('fullField');
                break;
            case aboveField.hasClass('fullField'):
                aboveField.removeClass('fullField');
                aboveField.addClass('emptyField');
                break;
        }
    }

    // Alatta lévő mező
    if (row < N - 1) {
        console.log("Bellow field check");
        var belowIndex = (row + 1) * N + col;
        var belowField = gameCanvas.children().eq(belowIndex);
        switch (true) {
            case belowField.hasClass('emptyField'):
                belowField.removeClass('emptyField');
                belowField.addClass('fullField');
                break;
            case belowField.hasClass('fullField'):
                belowField.removeClass('fullField');
                belowField.addClass('emptyField');
                break;
        }
    }

    // Bal oldali mező
    if (col > 0) {
        var leftIndex = row * N + (col - 1);
        var leftField = gameCanvas.children().eq(leftIndex);
        switch (true) {
            case leftField.hasClass('emptyField'):
                leftField.removeClass('emptyField');
                leftField.addClass('fullField');
                break;
            case leftField.hasClass('fullField'):
                leftField.removeClass('fullField');
                leftField.addClass('emptyField');
                break;
        }
    }

    // Jobb oldali mező
    if (col < N - 1) {
        var rightIndex = row * N + (col + 1);
        var rightField = gameCanvas.children().eq(rightIndex);
        switch (true) {
            case rightField.hasClass('emptyField'):
                rightField.removeClass('emptyField');
                rightField.addClass('fullField');
                break;
            case rightField.hasClass('fullField'):
                rightField.removeClass('fullField');
                rightField.addClass('emptyField');
                break;
        }
    }
    switch (true) {
        case clickedField.hasClass('emptyField'):
            clickedField.removeClass('emptyField');
            clickedField.addClass('fullField');
            break;
        case clickedField.hasClass('fullField'):
            clickedField.removeClass('fullField');
            clickedField.addClass('emptyField');
            break;
    }


    gameCanvas.children('.fullField').each(function () {
        console.log(allEmpty);
        if ($(this).hasClass('fullField')) {
            allEmpty = false;
            return false; // Kilépünk a ciklusból, ha találunk egy fullField mezőt
        }
    });

    if (allEmpty) {
        alert("Nyertél!");
        level++;
        if (level === 5) {
            alert("Végigvitted a játékot");
            window.location.href = 'toplist.html';
        } else {
            startGame();
        }
    }
    allEmpty = true;
}


