$("#score-button").click(showScore);
$("#sync-button").click(syncScore);

function insertScore() {
    var tableBody = $(".score").find("tbody");
    var user = $("#users").val();
    var numWords = $("#word-counter").text();

    var line = newLine(user, numWords);
    line.find(".remove-button").click(removeLine);

    tableBody.prepend(line);
    $(".score").slideDown(500);
    scrollScore();
}

function scrollScore() {
    var position = $(".score").offset().top;
    $("body").animate(
        {
            scrollTop: position+"30px"
        }, 1000);
}

function newLine(user, numWords) {
    var line = $("<tr>")
    var columnUser = $("<td>").text(user);
    var columnWords = $("<td>").text(numWords);
    var columnRemove = $("<td>");

    var link = $("<a>").addClass("remove-button").attr("href","#");
    var icon = $("<i>").addClass("small").addClass("material-icons").text("delete")

    link.append(icon);

    columnRemove.append(link);

    line.append(columnUser);
    line.append(columnWords);
    line.append(columnRemove);

    return line;
}

function removeLine() {
    event.preventDefault();
    var line = $(this).parent().parent()
    line.fadeOut(1000);
    setTimeout(function() {
        line.remove();
    },1000);
}

function showScore() {
    $(".score").stop().slideToggle(600);
}

function syncScore() {
    var placar = [];
    var lines = $("tbody>tr");
    lines.each(function() {
        var user = $(this).find("td:nth-child(1)").text();
        var points = $(this).find("td:nth-child(2)").text();
        var scoreUser = {
            usuario: user,
            pontos: points
        };

        placar.push(scoreUser);
    });
    var dados = {
        placar: placar
    };
    $.post("http://localhost:3000/placar",dados,function() {
        console.log("Salvou o placar no servidor");
        $('.tooltip').tooltipster("open").tooltipster("content", "Sucesso ao sincronizar");;
    })
    .fail(function() {
        $('.tooltip').tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    })
    .always(function() {
        setTimeout(function() {
            $('.tooltip').tooltipster("close");
        }, 1500);
    });
}

function updateScore() {
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function() {
            var line = newLine(this.user, this.points);
            line.find(".remove-button").click(removeLine);
            $("tbody").append(line)
        });
    });
}