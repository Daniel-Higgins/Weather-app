# Weather-app
Node.js application
(Still under construction)


Application is a basic Node.js application with a MySql database. Users create accounts and provide parameters Name, Email, 
Password, and Age. All contraints are entered into the database with a random integer assigned to each user as a user_id. 

When a user account is created the program will send a confirmation email to the user with the provided email.

Users can search the weather in a given city provided the city exists. When a user types in a city, the information is 
retrieved via json request from a weather API (openweathermap.org). The user is given a response of the temputurate and 
possibly wind based on the windspeed value returned. 
