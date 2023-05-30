let N = 10;
let blockSize = 500 / N;
let level = 1;
let score = 0;
let allEmpty=true;
let steps = 0;
let time = 0;
let mainScore = 0;
let countUp;
let playername;
let gameCanvas;
let topList = [];
let audio;
let clickedField;
let index;
let row;
let col;

$(function () {
    gameCanvas = $('<div></div>');
    gameCanvas.appendTo('body');

    gameCanvas.attr('id', 'gameCanvas');
    gameCanvas.on('click', '.emptyField', clickOnField);
    gameCanvas.on('click', '.fullField', clickOnField);
});

$(function () {
    extraCanvas = $('<div></div>');
    extraCanvas.appendTo('body');
    extraCanvas.attr('id', 'extraCanvas');

});

document.addEventListener('DOMContentLoaded', function() {
    let toplistContainer = document.createElement('div');
    toplistContainer.setAttribute('id', 'toplistContainer');
    document.body.appendChild(toplistContainer);
});

function openTopList() {
    topList.sort(function(a, b) {
        return b.points - a.points;
    });
    let tableContent = '<table><tr><th>Név</th><th>Pontszám</th></tr>';
    for (let i = 0; i < topList.length; i++) {
        tableContent += '<tr><td>' + topList[i].name + '</td><td>' + topList[i].points + '</td></tr>';
    }
    tableContent += '</table>';
    document.getElementById('toplistContainer').innerHTML = tableContent;
    window.location.href = 'toplist.html';
}

$(function () {
    $('#toplistButton').click(openTopList);
});

function openRules() {
    window.location.href = 'rules.html';
}

function newGame() {
    topList.push({name: playername, points: mainScore});
    for (let i = 0; i<topList.length; i++) {
        console.log(topList[i].name + " " + topList[i].points);
    }
    playername = prompt('Add meg a neved: ');
    level = 1;
    levelStart = true;
    score = 0;
    steps=-1;
    mainScore = 0;
    drawLevel();
    timer();
}

function drawLevel() {
    alert("A(z) " + level + " palya elindult");
    gameCanvas.empty();
    steps = -1;
    score = 0;
    let timerDisplay = $('<div></div>');
    timerDisplay.attr('id', 'timerDisplay');
    timerDisplay.appendTo(extraCanvas);

    let stepC = $('<div></div>');
    stepC.attr('id', 'stepCounter');
    stepC.appendTo(extraCanvas);

    let scoreC = $('<div></div>');
    scoreC.attr('id', 'scoreCounter');
    scoreC.appendTo(extraCanvas);

    let mainSc = $('<div></div>');
    mainSc.attr('id', 'mainScoreCounter');
    mainSc.appendTo(extraCanvas);

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
                    if (i === 0 && j === 9 || i === 0 && j === 8 || i === 1 && j === 9) {
                        emptyField.removeClass('emptyField');
                        emptyField.addClass('fullField');
                    }

                    // if (Math.random() > 0.8) {
                    //     emptyField.removeClass('emptyField');
                    //     emptyField.addClass('fullField');
                    // }

                    break;
                }
                case 3: {
                    if (i === 0 && j === 9 || i === 0 && j === 8 || i === 1 && j === 9) {
                        emptyField.removeClass('emptyField');
                        emptyField.addClass('fullField');
                    }
                    // if (Math.random() > 0.7) {
                    //     emptyField.removeClass('emptyField');
                    //     emptyField.addClass('fullField');
                    // }

                    break;
                }
                case 4: {
                    if (i === 0 && j === 9 || i === 0 && j === 8 || i === 1 && j === 9) {
                        emptyField.removeClass('emptyField');
                        emptyField.addClass('fullField');
                    }
                    // if (Math.random() > 0.6) {
                    //     emptyField.removeClass('emptyField');
                    //     emptyField.addClass('fullField');
                    // }

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
    stepCounter();
    scoreCounter();
}

function clickOnField() {
    stepCounter();
    scoreCounter();
    audio = new Audio('click.wav');
    audio.play();
    clickedField = $(this);
    console.log(clickedField);
    index = gameCanvas.children().index(clickedField);
    console.log(index);
    row = Math.floor(index / N);
    console.log(row);
    col = index % N;
    console.log(col);

    var allEmpty = true; // AllEmpty változó helyesen inicializálva

    // Felül lévő mező
    if (row > 0) {
        var aboveIndex = (row - 1) * N + col;
        var aboveField = gameCanvas.children().eq(aboveIndex);
        if (aboveField.hasClass('emptyField')) {
            aboveField.removeClass('emptyField');
            aboveField.addClass('fullField');
        } else {
            aboveField.removeClass('fullField');
            aboveField.addClass('emptyField');
        }
    }

    // Alatta lévő mező
    if (row < N - 1) {
        console.log("sgfdasg");
        var belowIndex = (row + 1) * N + col;
        var belowField = gameCanvas.children().eq(belowIndex);
        if (belowField.hasClass('emptyField')) {
            belowField.removeClass('emptyField');
            belowField.addClass('fullField');
        } else {
            belowField.removeClass('fullField');
            belowField.addClass('emptyField');
        }
    }

    // Bal oldali mező
    if (col > 0) {
        var leftIndex = row * N + (col - 1);
        var leftField = gameCanvas.children().eq(leftIndex);
        if (leftField.hasClass('emptyField')) {
            leftField.removeClass('emptyField');
            leftField.addClass('fullField');
        } else {
            leftField.removeClass('fullField');
            leftField.addClass('emptyField');
        }
    }

    // Jobb oldali mező
    if (col < N - 1) {
        var rightIndex = row * N + (col + 1);
        var rightField = gameCanvas.children().eq(rightIndex);
        if (rightField.hasClass('emptyField')) {
            rightField.removeClass('emptyField');
            rightField.addClass('fullField');
        } else {
            rightField.removeClass('fullField');
            rightField.addClass('emptyField');
        }
    }

    // Kattintott mező cseréje
    if (clickedField.hasClass('emptyField')) {
        clickedField.removeClass('emptyField');
        clickedField.addClass('fullField');
    } else {
        clickedField.removeClass('fullField');
        clickedField.addClass('emptyField');
    }

    gameCanvas.children('.fullField').each(function() {
        if ($(this).hasClass('fullField')) {
            allEmpty = false;
            return false;
        }
    });

    if (allEmpty) {
        mainScore += score;
        alert(
            'Nyertél! A pontszámod: ' +
            score +
            ', ' +
            steps +
            ' lépésből oldottad meg a pályát'
        );
        level++;
        if (level === 5) {
            alert('Végigvitted a játékot');
            topList.push({name: playername, points: mainScore});
            gameCanvas.off('click');
            for (let i = 0; i<topList.length; i++) {
                console.log(topList[i].name + " " + topList[i].points);
            }
        } else {
            drawLevel();
        }
    }
}

function timer () {
    clearInterval(countUp);
    let timerDisplay = $('#timerDisplay');

    countUp = setInterval(function() {
            timerDisplay.fadeOut(500, function() {
                timerDisplay.text("Eltelt idő: " + time);
                timerDisplay.fadeIn(500);
            });
            time++;

    }, 1000);
}

function stepCounter () {

    let stepCounterDisplay = $('#stepCounter');
    steps++;
    stepCounterDisplay.text("Lépések száma: " + steps);
    scoreCounter();
}

function scoreCounter () {
    let scoreCounterDisplay = $('#scoreCounter');
    scoreCounterDisplay.text("Jelenlegi pontjaid: "+ score);
    let mainScoreDisplay = $('#mainScoreCounter');
    mainScoreDisplay.text("Összes pontjaid: "+ mainScore);
    switch (level) {
        case 1: {
            score = 1000 / steps * level;
            break; }
        case 2: {
            score = 10000 / steps * level;
            break; }
        case 3: {
            score = 100000 / steps * level;
            break; }
        case 4: {
            score = 1000000 / steps * level;
            break; }
    }
}
//TODO toplista névbeírással

