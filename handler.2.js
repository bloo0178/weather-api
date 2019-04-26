'use strict';
const conversionsHelper = require('./conversionsHelper');
const convert = new conversionsHelper();

/*module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};*/

module.exports.hello = async (event) => {

  var input = req.query.input;
  var initNum = convert.getNum(input);
  var initUnit = convert.getUnit(input);
  var returnNum = convert.convert(initNum, initUnit);
  var returnUnit = convert.getReturnUnit(initUnit);
  var toString = convert.getString(initNum, initUnit, returnNum, returnUnit);
  let result;

  if (initNum == "invalid" && initUnit == "invalid") {
    //res.json("invalid number and unit");
    result = "invalid number and unit";
  } else if (initNum == "invalid" && initUnit != "invalid") {
    //res.json("invalid number");
    result = "invalid number";
  } else if (initNum != "invalid" && initUnit == "invalid") {
    //res.json("invalid unit");
    result = "invalid unit";
  } else {
    /*res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString
    });*/
    result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }, null, 2)
  }
}
