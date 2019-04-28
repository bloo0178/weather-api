const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const getCurrent = require("./currentWeather");
const forecast = require("./forecast");
const app = express();

require("dotenv").config();

app.use(bodyParser.json({ strict: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/getweather", async function(req, res) {
  let units = req.query.units;
  let lat = req.query.lat;
  let lon = req.query.lon;

  try {
    const result = await getCurrent(
      lat,
      lon,
      units,
      process.env.WEATHER_API_KEY
    );
    res.json({
      result: result
    });
  } catch (error) {
    res.json({
      error: error,
      lat: lat,
      lon: lon,
      units: units
    });
  }
});

app.get("/forecast", async function(req, res) {
  let units = req.query.units;
  let lat = req.query.lat;
  let lon = req.query.lon;

  try {
    const result = await forecast(lat, lon, units, process.env.WEATHER_API_KEY);
    // http://api.openweathermap.org/data/2.5/weather?lat=41.0262417&lon=-73.62819639999998&APPID=undefined&units=imperial%27,
    res.json({
      result: result
    });
  } catch (error) {
    res.json({
      error: error,
      lat: lat,
      lon: lon,
      units: units
    });
  }
});

module.exports.handler = serverless(app);
