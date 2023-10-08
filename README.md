# Project-3_WeatherEvents_JAN2016-DEC2022
This is UNC-CH-DA Group Project 3 for Group 4: A_Bourgeois, R_Pearce, R_Gutierrez, S_Bowman


## **PROJECT PROPOSAL**
The aim of our project is to uncover trends in weather patterns recorded at airport weather stations from 2016-2022. We will examine relationships between types of weather events, severity, times of year they occurred, duration, and if they tend to recur at the same time year-after-year forming an annual or multi-year cyclic pattern for the nation as a whole as well as separate geographical locations. Findings will be displayed on an interactive dashboard with multiple views.

Link to Dataset: https://www.kaggle.com/datasets/sobhanmoosavi/us-weather-events/data 

![Alt text](<Screenshot 2023-10-02 at 8.28.05 PM.png>)

## **BACKGROUND**
Using the knowledge and techniques we have laerned thus far, create a small full-stack web application. Using aggreagted data from an api source, create a new database. Create a flask api site, which you can call and query your database. Using the data supplied (in our case as a JSON object) from the api call, host an interactive web visulatization which can be used to answer questions and tell a story about the data.

## **MILESTONES**
* Project Ideation
* Data fetching/API Integration
* Data Analysis
* Testing
* Creating documentation
* Creating the presentation

## **PROCESS and NOTES**
* Started by deciding to use a kaggle dataset which was used a part of a larger study about weather impact on traffic, which was being used by Lyft to create a traffic predictor model based on weather patterns.
* The original csv data set included over 8.8 million records with 14 columns each.
* We imported the data into a SQLite database and used 'DB Browser for SQLite Version 3.12.2' to remove any records with any column containing null data. This still left us with over 8.6 million records.
* We created the Flask api application. When we initillay queried the DB we found the data was just too large and decided to limit our project to just 'Severe Storm' data.
* Noticing that not all 'Severe' records were 'Storms', but all 'Storms' were 'Severe', we reduced our query to the DB to return just records of 'Storms'.


## **RESOURCES**
* to run the app directly from flask api call: https://blog.logrocket.com/build-interactive-charts-flask-d3js/#creating-html-file 
* using Google Maps for base layers: https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer 
* resolving CORS, cross origin errors when running flask and index.html: UNC-CH-DA Flask channel solution provided by Aubrey Leary
* function for array count: https://amiyasahu.github.io/count-object-key-value-pairs-in-json.html#:~:text=To%20count%20the%20number%20key,pairs%20in%20the%20json%20object.
