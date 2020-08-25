$(document).ready(function () {
  let zipcode = "";

  const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
  const apiKey = "39f8b0f7ad947fc8b5a6b1a510b40cdb&units=imperial";


  // Error message function if the user enters a invalid zip: Empty's out all tables and removes tables
  const printError = function (req, status, err) {
      console.log("Something went wrong", status, err);

      $("#resultsDiv").empty();
      $("#date_1").empty();
      $("#temp_1").empty();
      $("#clothes_1").empty();
      $("#weather_1").empty();

      $("#date_2").empty();
      $("#temp_2").empty();
      $("#clothes_2").empty();
      $("#weather_2").empty();

      $("#date_3").empty();
      $("#temp_3").empty();
      $("#clothes_3").empty();
      $("#weather_3").empty();

      $("#date_4").empty();
      $("#temp_4").empty();
      $("#clothes_4").empty();
      $("#weather_4").empty();

      $("#date_5").empty();
      $("#temp_5").empty();
      $("#clothes_5").empty();
      $("#weather_5").empty();

      $("#city").empty();

      $("#wholeTable").hide();
      $("#titleTable").hide();

      // Print statment for error
      $("#resultsDiv").html(
        "Please enter a valid zipcode in the United States."
      );

      $("#zip-input").val("");
    };

  // Based on the temp, we decide what type of clothes the user should pacl
  function whatClothes(temp) {
      if (temp >= 75)  {
        return "You should pack shorts, a t-shirt, a hat, or clothing for warm weather.";
      } else if (temp < 75 && temp >= 60) {
        return "You should pack light jeans and a light shirt. It will be relatively warm, but may get cooler later in the evening.";
      } else if (temp < 60 && temp >= 45) {
        return "You should pack warmer clothes to prepare for cooler weather, such as jeans, a sweater and perhaps even a light jacket.";
      } else if (temp < 45 && temp >= 30) {
        return "You should pack heavy clothes such as sweat pants, and maybe even a beanie and a scarf.";
      } else  {
        return "It is way to cold to go out. I would advise against it. But if you must, I would wear heavy sweat pants, a heavy sweatshirt, and you must wear a beanie and scarf.";
      }
  }

  // Based on precipitation, we can decide if the user needs a raincoat or snow gear
  function isRain(sky)  {
      if (sky == "Rain") {
        return " In addition, prepare for rain. Keep a rain jacket or umbrella.";
      } else if (sky == "Snow")  {
        return " In addition, prepare for snow. Have a pair of snow boots ready.";
      } else  {
        return "";
      }
  }

  // If it is windy, the user can prepare for rain
  function isWindy(speed)  {
      if (speed > 25) {
        return " You must prepare for strong winds and keep a wind-breaker.";
      } else {
        return "";
      }
  }

  var weatherData = []; // array for the 5 days data. Will contain JSON data

  const getWeather = (event) => {
    event.preventDefault();

    zipcode = $("#zip-input").val().trim();

    if (zipcode === "") {
      return false;
    }

    let apiUrl = baseUrl + zipcode + ",us&appid=" + apiKey;  // Combine the API url with the zip and API ID

    // Run the GET request to get the weather day for the zip
    $.ajax({
      url: apiUrl,
      method: "GET",
      error: printError,
    }).then(function (response) {
      // Shows the tables
      $("#titleTable").show();
      $("#wholeTable").show();

      weatherData = [];  // each time a new zip is entered, the previous weather data needs to be cleared out
      

      for (var i = 0; i < response.list.length; i = i + 8)  { // add 8 to each itteration because the API returns data for every 3 hours, and we want it for ever 24 hours.
        // The next 4 lines use the functions above to decide what type of clothes the user needs to pack
        var wear = whatClothes(response.list[i].main.temp);       
        var percepitation = isRain(response.list[i].weather[0].main);
        var windy = isWindy(response.list[0].wind.speed);
        var clothesToWear = wear + percepitation + windy; // final string for clothes to pack for that day

        // For each day, add weather dat such as date, temp, city, weather description, type of clouds, wind, and clothes as a JSON object
        var thisDay = {
        date : response.list[i].dt_txt.slice(0, 11),
        city : response.city.name,
        country : response.city.country,
        temp : response.list[i].main.temp,
        sky  : response.list[i].weather[0].main,
        description : "Expect to see some " + response.list[i].weather[0].description,
        wind : response.list[0].wind.speed,
        clothes : clothesToWear
        }

        weatherData.push(thisDay); // Add the specific days JSON data to the array of 5 days.
      }
      
      $("#city").text("The is the 5 day forecast for: " + weatherData[0].city + ", " + weatherData[0].country);

      // Day 1 Data to print
      $("#date_1").text(weatherData[0].date);
      $("#temp_1").text(weatherData[0].temp);
      $("#clothes_1").text(weatherData[0].clothes);
      $("#weather_1").text(weatherData[0].description);

      // Day 2 Data to print
      $("#date_2").text(weatherData[1].date);
      $("#temp_2").text(weatherData[1].temp);
      $("#clothes_2").text(weatherData[1].clothes);
      $("#weather_2").text(weatherData[1].description);

      // Day 3 Data to print
      $("#date_3").text(weatherData[2].date);
      $("#temp_3").text(weatherData[2].temp);
      $("#clothes_3").text(weatherData[2].clothes);
      $("#weather_3").text(weatherData[2].description);

      // Day 4 Data to print
      $("#date_4").text(weatherData[3].date);
      $("#temp_4").text(weatherData[3].temp);
      $("#clothes_4").text(weatherData[3].clothes);
      $("#weather_4").text(weatherData[3].description);

      // Day 5 Data to print
      $("#date_5").text(weatherData[4].date);
      $("#temp_5").text(weatherData[4].temp);
      $("#clothes_5").text(weatherData[4].clothes);
      $("#weather_5").text(weatherData[4].description);

      $("#resultsDiv").empty();
      $("#zip-input").val("");

    })
    .catch(err => {
      response.redirect('/error');
    });
  };

  $("#user-form").on("submit", getWeather);   // Starts when the user clicks the "Get Weather" button.
});
