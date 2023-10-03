# Import the dependencies.
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
# create an engine for the hawaii.sqllite database
engine = create_engine("sqlite:///Resources/Weather_data.db", echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
WeatherData = Base.classes.WeatherEvents

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################


@app.route("/api/v1.0/eatherdata")
def weatherdata():
    """Return jsonified data of all weather data in the database"""

    # Create our session (link) from Python to the DB
    session = Session(engine)

    # query for all the station data
    # results = session.query(WeatherData.EventId, WeatherData.Type, WeatherData.Severity, WeatherData.StartTime, WeatherData.EndTime, WeatherData.Precipitation, WeatherData.TimeZone, WeatherData.AirportCode, WeatherData.LocationLat, WeatherData.LocationLng, WeatherData.City, WeatherData.County, WeatherData.State, WeatherData.ZipCode).all()

    results = session.query(WeatherData.EventId, WeatherData.Type).all()

    session.close()

    all_weather = []
    # for eventid, type, severity, starttime, endtime, precipitation, timezone, airportcode, locationlat, locationlng, city, county, state, zipcode in results:
    for eventid, type in results:
        w_record = {}
        w_record["eventid"] = eventid
        w_record["type"] = type
        # w_record["severity"] = severity
        # w_record["starttime"] = starttime
        # w_record["endtime"] = endtime
        # w_record["precipitation"] = precipitation
        # w_record["timezone"] = timezone
        # w_record["airportcode"] = airportcode
        # w_record["lat"] = locationlat
        # w_record["lon"] = locationlng
        # w_record["city"] = city
        # w_record["county"] = county
        # w_record["state"] = state
        # w_record["zipcode"] = zipcode
  
        all_weather.append(w_record)

    return jsonify(all_weather)


if __name__ == '__main__':
    app.run(debug=True)
