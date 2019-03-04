var topics = ["hamburger", "strawberry", "broccoli", "ice cream", "bread", "milk", "zucchini", "carrots", "ketchup", "jelly", "almonds", "chips", "potato", "chicken"]
//intitially renders the food buttons from array above when page is loaded
renderButtons();

//function to add array of food topics to DOM
function renderButtons() {
    $("#food-input").val("");
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("class", "buttonDetail");
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
    };
}
//click listener event for when submit button is clicked to add a food
$("#add-food").on("click", function (event) {
    event.preventDefault();
    var food = $("#food-input").val().trim();
    topics.push(food);
    renderButtons();
})

//on click event to add still GIFs to page
// needed this coding to account for dynamically 
$(document).on("click", ".buttonDetail", function () {
    $("#gifs-here").empty();
    var foodItem = $(this).text();
    console.log(foodItem);
    // my api_key: Qp3FBK3aCd1alvqSLL708uYBW9KA4m2I
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Qp3FBK3aCd1alvqSLL708uYBW9KA4m2I&limit=10&q=" + foodItem;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data
        for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div>")
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height_still.url);
            foodImage.attr("data-animate", results[i].images.fixed_height.url);
            foodImage.attr("data-still", results[i].images.fixed_height_still.url);
            foodImage.attr("data-state", "still");
            foodDiv.attr("class", "gifDetail");
            foodDiv.append(p);
            foodDiv.append(foodImage);
            $("#gifs-here").prepend(foodDiv);
        }
        $("img").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } 
            if (state === "animate"){
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        })


    })

})
