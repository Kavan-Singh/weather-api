# weather-api
Option 2 for the weather api code challenge

Kavan Singh

## Prompt: 
Weather Application
Problem: 

When I travel I never know what to pack. Given some location I think the api limits to 5 days for free. It is fine to assume everyone is traveling for 5 days from today. Get the weather and suggest types of clothes to pack for each day. For example, if the weather is going to be 90 one day and 20 the next day. The traveler will need to pack shorts, tshirt and warm clothes.

    Use OpenWeatherMap API to get the weather. (https://openweathermap.org/api)
    Display Weather for each day and what types of items that are needed for the trip.

Option 1: build a react app to request the weather and display it to the user in their browser. def bonus points if you can make this look aesthetically pleasing, throw in some images, icons, etc..
    
Option 2: build a REST API using express.js where the user submits a zip code to a REST API endpoint, then the REST endpoint performs the API request to open weather app and returns what the user would need to wear. i.e. i could submit zip code 20001, it'll say its sunny and hot for one day and your API would return some JSON object that says the temperature for that day and what clothes to wear.


## My Choice: 
I went with option 2

## Features: 
The application uses JavaScript and HTML.

## Instructions to Run:
To run the application, clone the repo to your machine. In the terminal/command prompt, enter "rpm install" to add all the packages. Then enter "node app.js". Once the server is running, go to your browser and enter "localhost:3000" to open the page. Once the page is open, you can enter any zip code in the United States, and the application will tell you weather data for the next 5 days, including what clothes to pack for the trip. You can keep re-entering zipcodes if you want to see a different location as long as the location is in the United States.


## Difficulties I faced/How I attempted to resolve them:
One of the problems I came across was I could not print an error message if the user enters a invalid zipcode. Basically, the page does nothing if the user enters invalid zip. However, the user can re-type a valid zip and it will produce valid data the user can actually use. So the program catches the error so the program won't crash, but for some reason it just would not print the error message. 

I tried doing an if statement to check the response code to verify it is a 200 response code:

if (response.cod != 200)	{
	$("#city").text("Error: Invalid zipcode. Please enter a new zip!");
}

I would have followed up with emptying all previous data variables.

I later learned that you need to create a printError function and make an error call in the .ajax in order to show the invalid zip. So eventually I did get it.

Other than that, there were not many other difficulties and the project was a fun experience to work on!
