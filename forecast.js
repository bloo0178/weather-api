const axios = require("axios");
const moment = require("moment");

const getForecast = async (lat, lon, units, APIkey) => {
  const forecastData = await axios
    // This will return a max of 40 objects with the free API. Cuts off the final data point on the last day.
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?` +
        `lat=${lat}&lon=${lon}&APPID=${APIkey}&units=${units}&cnt=50`
    )
    .then(res => {
      const data = res.data.list;
      // minDate-maxDate is used as the baseline to ensure displayed forecast doesn't exceed a 4-day window.
      // Add 1 to minDate because free version of API only shows 3 hours from current day.
      var minDate = moment()
        .add(1, "days")
        .format("YYYY-MM-DD");
      var maxDate = moment()
        .add(4, "days")
        .format("YYYY-MM-DD");

      var newData = [];

      data.forEach(elem => {
        let elemDate = moment(elem.dt_txt, "YYYY-MM-DD HH:mm:ss").format(
          "YYYY-MM-DD"
        );
        let elemTime = moment(elem.dt_txt, "YYYY-MM-DD HH:mm:ss").format("ha");
        // Only show forecast for 4 days after today. This checks dataset to see if value is today or earlier.
        // if (moment(elemDate).isSameOrBefore(minDate)) return;
        if (moment(elemDate).isBefore(minDate)) return;
        // This checks dataset to see if value is after 4 days from now.
        if (moment(elemDate).isAfter(maxDate)) return;
        let temp = {
          date: elemDate,
          times: [
            {
              time: elemTime,
              temp: elem.main.temp,
              description: elem.weather[0].main,
              icon: `http://openweathermap.org/img/w/${
                elem.weather[0].icon
              }.png` //not using currently
            }
          ]
        };
        if (!newData.some(x => x.date === elemDate)) {
          newData.push(temp);
        } else {
          for (let i = 0; i < newData.length; i++) {
            if (newData[i].date === elemDate) {
              newData[i].times.push(temp.times[0]);
              i += newData.length;
            }
          }
        }
      });
      return newData;
    })
    .catch(err => {
      return err;
    });

  return forecastData;
};

module.exports = getForecast;
