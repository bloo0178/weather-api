const getCurrent = require('../currentWeather');
require("dotenv").config();

let lat = 41.0262417;
let lon = -73.62819639999998;
let api_key = process.env.WEATHER_API_KEY;
let units = "imperial";

let result;

describe("Current Weather Tests", () => {
	beforeAll(async () => {
		result = await getCurrent(lat, lon, units, api_key);
	});

	test("test connection to OpenWeatherMap", () => {
		//console.dir(result);
        expect(result).toHaveProperty("date");
	});

	test("API returns correct object", () => {
		expect(result).toHaveProperty("date");
        expect(result).toHaveProperty("temp");
        expect(result).toHaveProperty("icon");
        expect(result).toHaveProperty("description");
	});
});