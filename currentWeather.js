const axios = require("axios");
const moment = require("moment");

const getCurrent = async (lat, lon, units, APIkey) => {
  const currentWeather = await axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?` +
        `lat=${lat}&lon=${lon}&APPID=${APIkey}&units=${units}`
    )
    .then(res => {
      let currentWeather = {
        date: moment.unix(res.data.dt).format("ddd MMM D"),
        temp: res.data.main.temp,
        icon: res.data.weather[0].icon,
        description: res.data.weather[0].main
      };
      return currentWeather;
    })
    .catch(err => {
      return err;
    });
  return currentWeather;
};

module.exports = getCurrent;
