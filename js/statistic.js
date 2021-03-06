// statistic.js is a striped down version of index.js
// This is because statistic.js do not need all the features in index,js

function checkDistance(distance) {
    // Converts distance data into the correct display type
    distanceInKm = (distance).toFixed(2);
    if (distanceInKm >= 1) {
        distanceInMile = (distance / 1.609).toFixed(2);
        return `${distanceInKm} km (${distanceInMile} mi)`;

    } else {
        distanceInM = (distance * 1000).toFixed(2);
        distanceinFt = (distance * 3281).toFixed(2);
        return `${distanceInM} m (${distanceinFt} ft)`;
    }
}
function convertSecondsTo_Hr_Min_Sec(time) {
    //Converts seconds to hour_min_sec
    var timeHr = Math.floor(time / 60 / 60)
    time -= timeHr * 60 * 60
    var timeMin = Math.floor(time / 60)
    time -= timeMin * 60
    var timeSec = time
    return {
        timeHr: timeHr,
        timeMin: timeMin,
        timeSec: timeSec,
    }
}

function loadChart(dateData, tempData) {
    // loads the ChartJS chart
    // Uses OpenWeatherMap API's hourly temperatures to make the map
    const ctx = document.getElementById("myChart");
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateData,
            datasets: [{
                label: "Temperature",
                backgroundColor: "rgba(255,0,0,0.1)",
                borderColor: "rgba(255,0,0,1)",
                data: tempData
            }]
        },
        options: {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: `${new Date().getDate()} ${month[new Date().getMonth()]} ${new Date().getFullYear()}`
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label += '\u00B0C';
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: Math.floor(Math.min.apply(null, tempData) - 0.5),
                        max: Math.ceil(Math.max.apply(null, tempData) + 0.5),
                    },
                    afterTickToLabelConversion: function (q) {
                        for (var tick in q.ticks) {
                            q.ticks[tick] += '\u00B0C';
                        }
                    }
                }]
            },
        }
    });
}



function createDateString_DMY(date) {
    // convert date to dd/mm/yyyy format (10/1/2021)
    var month = ["Jan", "Feb", "Mar", "Apr", "Mar", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const myDate = new Date(date * 1000);
    return `${myDate.getDate()} ${month[myDate.getMonth()]} ${myDate.getFullYear()}`;
}
function createDateString_DMD(date) {
    // convert date to dddd, mmmm dd format (Sun, Dec 8)
    var month = ["Jan", "Feb", "Mar", "Apr", "Mar", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const myDate = new Date(date * 1000);
    return `${day[myDate.getDay()]}, ${month[myDate.getMonth()]} ${myDate.getDate()}`;
}
function createDailyListNode(dailyForecast, data) {
    // Loads the daily weather forecast
    const parentDiv = document.createElement("div");
    parentDiv.className = "row g-0 d-flex align-items-center";
    const dateDiv = document.createElement("div");
    dateDiv.className = "dateDiv col-4 col-md-4";
    dateDiv.innerHTML = createDateString_DMD(data.dt);


    const secondDiv = document.createElement("div");
    secondDiv.className = "col-8 col-md-8 d-flex justify-content-between align-items-center";

    const iconPlusTemp = document.createElement("span");
    iconPlusTemp.className = "iconPlusTemp d-flex justify-content-between align-items-center";
    iconPlusTemp.style.marginRight = "5px";
    const img = document.createElement("img");
    img.src = "http://openweathermap.org/img/wn/" + `${data.weather[0].icon}@2x.png`;
    img.style.width = "30px";
    img.style.height = "30px";
    iconPlusTemp.appendChild(img);
    const tempText = document.createElement("span");
    tempText.style.fontSize = "13px";
    tempText.innerHTML = `${Math.floor(data.temp.max)} / ${Math.floor(data.temp.min)}\u00B0C`;
    iconPlusTemp.appendChild(tempText);
    secondDiv.appendChild(iconPlusTemp);


    const weatherText = document.createElement("span");
    weatherText.className = "weatherText";
    weatherText.innerHTML = data.weather[0].description;
    weatherText.style.fontSize = "12px";
    secondDiv.appendChild(weatherText);


    parentDiv.appendChild(dateDiv);
    parentDiv.appendChild(secondDiv);

    dailyForecast.appendChild(parentDiv);
}
function initHourly(weatherResult) {
    // Prepares the data for loadChart()
    const tempData = [];
    const dateData = [];
    for (var i = 0; i <= 12; i++) {
        const element = weatherResult.hourly[i];
        tempData.push(element.temp);
        const date = new Date(element.dt * 1000);
        if (date.getHours() > 12) {
            dateData.push(`${date.getHours() - 12} pm`);
        } else {
            if (date.getHours() == 0) {
                dateData.push(`12 am`);
            } else {
                dateData.push(`${date.getHours()} am`);
            }
        }

    }
    loadChart(dateData, tempData);
}
function initDaily(weatherResult) {
    // Prepares the data for createDailyListNode()
    const dailyForecast = document.getElementById("daily-forecast");
    $("#daily-forecast h5").append(`<span> ${weatherResult.timezone}</span>`)
    $("#daily-forecast span").css("fontSize", "14px")
    $("#daily-forecast span").css("color", "#b0b0b0")
    for (var i = 0; i <= 7; i++) {
        const element = weatherResult.daily[i];
        createDailyListNode(dailyForecast, element);
    }

}
$.ajax({
    // Requests from IPapi
    method: "POST",
    url: "https://ipapi.co/json",
    error: (function () {
        alert("AJAX error (https://ipapi.co/json)")
    }),
}).done(function (ipResult) {
    // Using the Lat Long from IPapi, search for weather data at that coordinate
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${ipResult.latitude}&lon=${ipResult.longitude}&appid=eea225520939f59f9dcd0ea6046d512b&exclude=current,minutely,alerts&units=metric`
    }).done(function (weatherResult) {
        initHourly(weatherResult);
        initDaily(weatherResult);
    })
})

function findTotalDist(distanceList) {
    // Finds total distance in a list of distances
    var total_dist = 0;
    distanceList.forEach(dist => {
        total_dist += dist;
    });
    return total_dist;
}
function findTotalTime(timeList) {
    // Finds total time from a list of time
    var total_time = 0;
    timeList.forEach(time => {
        total_time += time;
    });
    return total_time;
}
function findFastestSpeed(state) {
    // Finds fastest run
    const speedList = [];
    for (const [key, value] of Object.entries(state)) {
        if (value.timeInSec != 0) {
            speedList.push(parseFloat(value.distance) / (value.timeInSec / 60 / 60))
        }
    }
    return Math.max.apply(null, speedList)
}
function loadBadgesAndStats() {
    // loads the statistics + badges portion of the website
    let stateString = localStorage.getItem("state");
    if (stateString != null) {
        let state = JSON.parse(stateString);
        const distanceList = []
        const timeList = []
        const dateList = []
        for (const [key, value] of Object.entries(state)) {
            distanceList.push(parseFloat(value.distance))
            dateList.push(key)
            if (value.timeInSec != 0) {
                timeList.push(parseInt(value.timeInSec))
            }

        }
        // Badges
        $("#highest-dist").attr("data-bs-content", `Longest distance ran: ${Math.max.apply(null, distanceList).toFixed(2)} km (${(Math.max.apply(null, distanceList) / 1.609).toFixed(2)} mi)`)
        $("#amt-runs").attr("data-bs-content", `Number of runs: ${distanceList.length}`)
        if (findTotalTime(timeList) != 0) {
            $("#fastest-run").attr("data-bs-content", `Fastest run ${(findFastestSpeed(state)).toFixed(2)}km/h`)
        }
        if (findTotalTime(timeList) != 0) {
            const dateNow = new Date()
            const oldDate = new Date(parseInt(dateList[0]))
            const dateDif = dateNow.getFullYear() - oldDate.getFullYear()
            $("#acc-lifespan").attr("data-bs-content", `Account age: ${dateDif} years`)
        }

        // Table Stats
        if (findTotalTime(timeList) != 0) {
            $("#avg-run-time").text(`${((findTotalTime(timeList) / 60) / timeList.length).toFixed(2)}min`)
        }
        $("#total-dist").text(`${findTotalDist(distanceList).toFixed(2)}km`)
        if (findTotalTime(timeList) != 0) {
            $("#total-run-time").text(`${((findTotalTime(timeList) / 60 / 60).toFixed(2))}h`)
        }

    }

}

window.onload = () => {
    loadBadgesAndStats();
}
var firebaseConfig = {
    apiKey: "AIzaSyDH03bcj0upYdfOpz6ENZeB0lNiKWAiXBE",
    authDomain: "idassign2.firebaseapp.com",
    projectId: "idassign2",
    storageBucket: "idassign2.appspot.com",
    messagingSenderId: "994984281517",
    appId: "1:994984281517:web:2845ebc0007c29563f8d24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Checks if the user is logged in. If not,
// then send user back to index.html
firebase.auth().onAuthStateChanged(((user) => {
    if (!user) {
        window.location.href = "index.html"
    }
}))