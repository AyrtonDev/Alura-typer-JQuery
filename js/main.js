var startTime = $("#typing-time").text();
var field = $(".typing-field");

$(() => {
    updatePhrase();
    startCounter();
    initBookmarker()
    startTimer();
    $("#restart-button").click(restartGame);
    updateScore();
    $("#users").selectize({
        create: true,
        sortField: "text"
    });
    $('.tooltip').tooltipster({
        trigger: "custom"
    });
})

function updatePhrase() {
    var phrase = $(".phrase").text();
    var numWords = phrase.split(" ").length;
    var phraseSize = $("#phrase-size");
    phraseSize.text(numWords)
}

function updateTimer(tempo) {
    startTime = tempo;
    $("#typing-time").text(tempo)
}

function startCounter() {
    field.on("input", function() {
        var content = field.val();
        $("#character-counter").text(content.length);

        var qtyWords = content.split(/\S+/);
        $("#word-counter").text(qtyWords.length - 1);
    });
}

function initBookmarker() {
    field.on("input",function() {
        var phrase = $(".phrase").text();
        var typed = field.val();
        var comparable = phrase.substr(0, typed.length);

        if (typed == comparable) {
            field.addClass("green-border");
            field.removeClass("red-border");
        }else{
            field.addClass("red-border");
            field.removeClass("green-border");
        }
    });
}

function startTimer() {
    field.one("focus", function() {
        var timeLeft = $("#typing-time").text();
        var timerID = setInterval(() => {
            timeLeft--;
            $("#typing-time").text(timeLeft);
            if (timeLeft < 1){
                clearInterval(timerID);
                endGame();
            }
        }, 1000);
    });
}

function endGame() {
    field.attr("disabled", true);
    field.toggleClass("disabled-field");
    insertScore();
}

function restartGame() {
    field.attr("disabled", false);
    field.val("");
    $("#word-counter").text(0);
    $("#character-counter").text(0);
    $("#typing-time").text(startTime);
    startTimer();
    field.toggleClass("disabled-field");
    field.removeClass("green-border");
    field.removeClass("red-border");
}