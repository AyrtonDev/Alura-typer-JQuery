$("#change-phrase").click(randomPhrase);
$("#phrase-id-button").click(searchPhrase);

function randomPhrase() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", changeRandomPhrase)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function changeRandomPhrase(data) {
    var phrase = $(".phrase");
    var randomNum = Math.floor(Math.random() * data.length);
    phrase.text(data[randomNum].texto);
    updateTimer(data[randomNum].tempo);
    updatePhrase();
}

function searchPhrase() {
    $("#spinner").toggle();
    var phraseId = $("#phrase-id").val();
    var data = { id: phraseId};

    $.get("http://localhost:3000/frases",data,changePhrase)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function changePhrase(data) {
    var phrase = $(".phrase");
    phrase.text(data.texto);
    updateTimer(data.tempo);
    updatePhrase();
}