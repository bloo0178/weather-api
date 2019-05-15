const getForecast = require("../forecast");
require("dotenv").config();

// http://api.openweathermap.org/data/2.5/weather?lat=41.0262417&lon=-73.62819639999998&APPID=undefined&units=imperial%27,

let lat = 41.0262417;
let lon = -73.62819639999998;
let api_key = process.env.WEATHER_API_KEY;
let units = "imperial";

let result;

describe("Forecast Tests", () => {
	beforeAll(async () => {
		result = await getForecast(lat, lon, units, api_key);
	});

	test("test connection to OpenWeatherMap", () => {
		//console.dir(result);
		expect(result).toHaveLength(4);
	});

	test("API returns correct object", () => {
		expect(result[0]).toHaveProperty("date");
		expect(result[0]).toHaveProperty("times");
	});
});
