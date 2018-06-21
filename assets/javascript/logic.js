$(document).ready(function () {
    var topics = ["Aaron Rodgers", "Tom Brady", "Russell Wilson", "Drew Brees"];

    function displayImg() {

        $("#gifs-appear-here").empty();
        var player = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var j = 0; j < limit; j++) {

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#gifs-appear-here").append(displayDiv);
            }
        });
    }

    function renderButtons() {

        $("#addButton").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "btn btn-secondary");
            newButton.attr("id", "input")
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#addButton").append(newButton);
        }
    }

    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $("#addPlayer").on("click", function () {

        var input = $("#playerField").val().trim();
        $("#playerField").html();
        topics.push(input);

        renderButtons();

        return false;
    })

    renderButtons();
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});
