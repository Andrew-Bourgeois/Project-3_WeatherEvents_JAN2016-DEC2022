
-- This is the table of the data for Project 3 - US Weather Events 2016-2022
CREATE TABLE IF NOT EXISTS weather_1622 (
	Eventid	VARCHAR(10) NOT NULL,
	Type VARCHAR(15) NOT NULL,
	Severity VARCHAR(10) NOT NULL,
	Start_time DATE NOT NULL,
	End_time DATE NOT NULL,
	Precipitation NUMERIC(10, 2) NOT NULL,
	Timezone VARCHAR(20) NOT NULL,
	Airport_code VARCHAR(8) NOT NULL,
	Lat NUMERIC(10, 4) NOT NULL,
	Lon NUMERIC(10, 4) NOT NULL,
	City VARCHAR(25),
	County VARCHAR(25),
	State VARCHAR(3),
	ZipCode INT,
 PRIMARY KEY(Eventid)
);

-- Remove records with NULL values
DELETE FROM weather_1622
WHERE not (weather_1622 is NOT NULL);

-- Verify table creation
SELECT COUNT(Eventid) FROM weather_1622;