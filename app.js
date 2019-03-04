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

// $(".buttonDetail").on("click", function(){
// needed this coding to account for dynamically 
$(document).on("click", ".buttonDetail", function () {
    var foodItem = $(this).text();
    console.log(foodItem);
    // my api_key: Qp3FBK3aCd1alvqSLL708uYBW9KA4m2I
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Qp3FBK3aCd1alvqSLL708uYBW9KA4m2I&q=" + foodItem;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data
        for (var i=0; i<results.length; i++){
            var foodDiv = $("<div>")
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height.url);
            foodDiv.append(p);
            foodDiv.append(foodImage);
            $("#gifs-here").prepend(foodDiv);
        }
    })

})
