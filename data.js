import { aqi, co, o3, pm10, pm25, no2, so2 } from './main.js'
console.log('AQI:', aqi);

const iaqiData = {
    "stats": {
        "o3": o3,
        "co": co,
        "pm10": pm10,
        "pm25": pm25,
        "no2": no2,
        "so2": so2,
    },
    
    "aqi": aqi,
}

// if (apiFetched === true) {
//     o3Div.style.width = iaqiData.stats.o3 + '%';
//     coDiv.style.width = iaqiData.stats.co + '%';
//     pm10Div.style.width = iaqiData.stats.pm10 + '%';
//     pm25Div.style.width = iaqiData.stats.pm25 + '%';
//     no2Div.style.width = iaqiData.stats.no2 + '%';
//     so2Div.style.width = iaqiData.stats.so2 + '%';
// }

// let statDivs = document.querySelectorAll("#iaqi_stats div");
// if (apiFetched == true) {
//     console.log('Running if statement');
//     for (let i = 0; i < statDivs.length; i++) {
//         let statValue = iaqiData.aqi;
//         statDivs[i].style.width = statValue + "%"
//     }
// }
