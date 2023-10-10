# Project-3_WeatherEvents_JAN2016-DEC2022
This is UNC-CH-DA Group Project 3 for Group 4: A_Bourgeois, R_Pearce, R_Gutierrez, S_Bowman

## **INSTRUCTIONS (for running code)**
* Download the initial csv file from [US Weather Events (2016-2022)](https://www.kaggle.com/datasets/sobhanmoosavi/us-weather-events/data)
* Clone the repository to your local machine
* NOTE: The repository is too large to be uploaded to GitHub, but rather than create a smaller DB we wanted to show the process of cleaning and parsin ghte data
* Using the dB viewer of your choice (eg PGAdmin4, DB Browser for SQLite, etc) and the schema.sql file located in: (/~/Project-3_WeatherEvents_JAN2016-DEC2022/schema.sql):
    * create a DB called 'Weather_data.db' in the 'Resources' folder.
    * Note: alternateively you can update the db path in the flask app.py file if you would like to host the DB in another location.
    * run the portion of the schema to create a table called WeatherEvents
    * import the csv into the WeatherEvents table.
    * use remaining code in schema to remove rows with any null values
* Start the Flask instance by running the Python code in app.py, located in (/~//Projects/Project-3_WeatherEvents_JAN2016-DEC2022/app.py)
    * NOTE: you will want to make sure you are addressing a possible CORS Error by running, 'pip install flask-cors' in the proper environment in your terminal
    * the additional code has alrady been added to the proper files of the application
* Once your Flask instance is running, you can then use a program like 'Live Server' to open index.html found in (/~/Projects/Project-3_WeatherEvents_JAN2016-DEC2022/templates/index.html)
* The logic.js and style.css files are located in the /static/js/ and /static/css/ folders respectively.
* To interact with the storm data on the Dashboard change your data within the inital ranges shown in the selector boxes and click the 'Enter' button below the selectors.
    * NOTE: we sometimes encounter a bug when the page is initially loaded where you need to update a selector box and click enter twice before everything will subsequently update normally.

## **PROJECT PROPOSAL**
The aim of our project is to uncover trends in weather patterns recorded at airport weather stations from 2016-2022. We will examine relationships between types of weather events, severity, times of year they occurred, duration, and if they tend to recur at the same time year-after-year forming an annual or multi-year cyclic pattern for the nation as a whole as well as separate geographical locations. Findings will be displayed on an interactive dashboard with multiple views.

Link to Dataset: https://www.kaggle.com/datasets/sobhanmoosavi/us-weather-events/data 

![Alt text](<Screenshot 2023-10-02 at 8.28.05 PM.png>)

## **BACKGROUND**
Using the knowledge and techniques we have laerned thus far, create a small full-stack web application. Using aggreagted data from an api source, create a new database. Create a flask api endpoint, which can be called to query your database. Using the data supplied (in our case as a JSON object) from the api call, host an interactive web visulatization which can be used to answer questions and tell a story about the data.

## **MILESTONES**
* Project Ideation
* Data fetching/API Integration
* Data Analysis
* Testing
* Creating documentation
* Creating the presentation

## **PROCESS and NOTES**
* The team started by deciding to use a kaggle dataset which was used a part of a larger study about weather impact on traffic, which was being used by Lyft to create a traffic predictor model based on weather patterns.
* The original csv dataset included over 8.8 million records with 14 columns each.
* We used 'DB Browser for SQLite Version 3.12.2', along with the schema.sql (included in this repository), to: 
    * create the table
    * import the data into a SQLite database from the csv
    * and then remove any records with any column containing null data. This still left us with over 8.6 million records.
* We created the Flask API application. When we initillay queried the DB we found the database was just too large and decided to limit our project to just 'Severe Storm' data.
* Noticing that not all 'Severe' records were 'Storms', but all 'Storms' were 'Severe', we reduced our query of the DB to return just records of 'Storms'.
* After verifying we were able to return a JSON from the query, the team moved on to distributing the Scope of Work for different pieces of the interactive Dashboard.

**SCOPE OF WORK**
* Schema.sql to create tables for DB and do initial data cleaning - **A_Bourgeois**
    * NOTE: Due to the size of the DB each team member needed to create their own local copy of the SQLite DB - **A_Bourgeois, R_Pearce, R_Guttierez, S_Bowman**
* Base index.html and style.css files - **A_Bourgeois, R_Pearce, R_Guttierez, S_Bowman**
* Flask app.py to create API endpoint and DB querying - **A_Bourgeois, R_Pearce**
* Javascript input selectors, event handler code, custom functionsfor creating the data interactivity - **R_Pearce**
    * update html and css files as needed
* Meta data box showing aggreagte details for current selected data - **R_Pearce**
* Leaflet map using Google Map base layers, JSON grouping/handling, custom functions to create updateable markers based on currently filitered data - **A_Bourgeois**
    * update html and css files as needed
* Graphic visulaization showing storm data versus time, updated via current data selection - **R_Guttierez, R_Pearce**
* html and css updating to organize Dashboard - **A_Bourgeois, R_Pearce**
* Presentation:
    * Introduction to Project - **S_Bowman**
    * Discussion pieces of project and how it was created - **A_Bourgeois**
    * Project Data Analysis and Demo of interactive Map - **R_Guttierez**
    * Project Data Analysis and Demo of Timeline chart and Summary Statistics table, Conclusion - **R_Pearce**

## **DOCUMENTATION**
* STARTING THE APPLICATION: See INSTRUCTIONS section above.
* DESCRIPTION OF PAGE ITEMS:
    * Leaflet Map: This map displays a circular marker for each airport weather station. The color of the marker (see legend) represents the number of storms observed by the weather station during the currently selected parameters. The scale of the marker represents the average duration of all the storms during the currently selected parameters.
        * There are two available base layers for the map, Google Streetmap, and Googe Satellite, which can be selected using the layer box in the upper right portion of the map.
        * The map default loads with the entire data range. The map will update automatically when a new data range is selected. Note: see INSTRUCTIONS about possible bug first time new data is selected.
    * Input Selectors: The input selector boxes will default preloaded with the entire data range selected.
        * Updates to the lat, lon boxes can be updated using the selector arrows or manually entering the data.
        * The date inputs need to be entered manually and should be in the format "YYYY-MM"
        * Once all new range points are input click the 'Enter' button to update the visualizations. Note: see INSTRUCTIONS about possible bug first time new data is selected.
    * Bar graph represents the Year-Month ('YYYY-MM') versus Total # of Storms. It will display the data within the selected date range and lat/lon ranges.
        * This chart will auto-update when new input data is selected.
    * Summary Statistics displays the summary data for the selected date and lat/lon range.
        * This data will auto-update when new input data is selected.

## **REQUIREMENTS**
**Data and Delivery (25 points)**
* Data components used in the project are clearly documented. (5 points)
* The dataset contains at least 100 unique records. (5 points)
* A database is used to house the data (SQL, MongoDB, SQLite, etc.). (5 points)
* The project is powered by a Python Flask API and includes HTML/CSS, JavaScript, and the chosen database. (10 points)

**Back End (25 points)**
* The page created to showcase data visualizations runs without error. (7.5 points)
* A JavaScript library not shown in class is used in the project. (7.5 points)
* The project conforms to one of the following designs: (10 points)
    * A Leaflet or Plotly chart built from data gathered through web scraping.
    * A dashboard page with multiple charts that all reference the same data.

**Visualizations (25 points)**
* A minimum of three unique views present the data. (5 points)
* Multiple user-driven interactions (such as dropdowns, filters, or a zoom feature) are included on the final page. (5 points)
* The final page displays visualizations in a clear, digestable manner. (5 points)
* The data story is easy to interpret for users of all levels. (10 points)

**Group Presentation (25 points)**
* All group members speak during the presentation. (5 points)
* The content is relevant to the project. (5 points)
* The presentation maintains audience interest. (5 points)
* Content, transitions, and conclusions flow smoothly within any time restrictions. (10 points)

## **RESOURCES**
* to run the app directly from flask api call: https://blog.logrocket.com/build-interactive-charts-flask-d3js/#creating-html-file 
* using Google Maps for base layers: https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer 
* resolving CORS, cross origin errors when running flask and index.html: UNC-CH-DA Flask channel solution provided by Aubrey Leary
* function for array count: https://amiyasahu.github.io/count-object-key-value-pairs-in-json.html#:~:text=To%20count%20the%20number%20key,pairs%20in%20the%20json%20object.
* how to add and remove a marker feature layer to update upon event:
    * https://gis.stackexchange.com/questions/258929/add-layers-to-a-feature-group-with-a-function-loop 
    * https://gis.stackexchange.com/questions/169388/how-to-remove-marker-added-map-with-addto-function-in-leaflet