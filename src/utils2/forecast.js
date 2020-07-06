const request = require('request');
const chalk = require('chalk');

const forecast = (lat, long, callback)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=520b3ab24b152a2a6378231620bdac1b&units=metric&lang=pt`;

    request({ url, json:true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to web service!!', undefined);
        }else if(body.cod == 400){
            callback('Unable to find location. Try another search.', undefined);
        }else {
            callback(undefined, `It's currently ${body.main.temp} degrees. The wind speed is currently ${body.wind.speed} Mph. The humidity is ${body.main.humidity} %. The minimun temperature is ${body.main.temp_min}, and the maximum temperature is ${body.main.temp_max}`)            
        }
    });
};


module.exports = forecast;