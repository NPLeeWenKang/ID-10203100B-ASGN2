function checkDistance(distance) {
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
function loadList() {
    let stateString = localStorage.getItem("state");
    if (stateString != null) {
        let state = JSON.parse(stateString);
        const listDOM = document.getElementById("listDOM");
        listDOM.innerHTML = "" //Clears  all children nodes
        for (const [key, value] of Object.entries(state)) {
            createListElement(listDOM, value, key);
        }
        editButtonListener();
    }


}
function loadChart(dateData, tempData) {
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

function createListElement(listDOM, indiviualElement, key) {
    const card = document.createElement("li");
    card.className = "list-group-item";
    card.id = key;

    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = indiviualElement.name;

    const distanceDiv = document.createElement("div");
    distanceDiv.innerHTML = "Distance: " + checkDistance(parseFloat(indiviualElement.distance));

    const timeTakenDiv = document.createElement("div");
    if (indiviualElement.timeInSec > 0) {
        const time = convertSecondsTo_Hr_Min_Sec(indiviualElement.timeInSec)
        const speed = ((parseFloat(indiviualElement.distance) / indiviualElement.timeInSec) * 60 * 60).toFixed(2)
        timeTakenDiv.innerHTML = `Time taken: ${time.timeHr}hr ${time.timeMin}min ${time.timeSec}s (${speed}km/h)`;
    } else {
        timeTakenDiv.innerHTML = "Time taken: N/A";
    }


    const runningDate = new Date(parseInt(key));
    const dateDiv = document.createElement("div");
    dateDiv.style.color = "#b0b0b0";
    dateDiv.style.fontSize = "11px";
    dateDiv.innerHTML = `${runningDate.getDate()}/${runningDate.getMonth() + 1}/${runningDate.getFullYear()}`;

    const controlDiv = document.createElement("div");
    controlDiv.classList.add("list-item-control");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "src/binoculars-fill.svg";
    const deleteText = document.createElement("p");
    deleteText.innerHTML = "Edit";
    deleteText.style.margin = "0";
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-secondary");
    deleteBtn.id = key;
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(deleteText);

    const attribute1 = document.createAttribute("data-bs-toggle");
    attribute1.value = "modal"
    const attribute2 = document.createAttribute("data-bs-target");
    attribute2.value = "#staticBackdrop"
    deleteBtn.setAttributeNode(attribute1);
    deleteBtn.setAttributeNode(attribute2);

    controlDiv.appendChild(deleteBtn);

    card.appendChild(nameDiv);
    card.appendChild(distanceDiv);
    card.appendChild(timeTakenDiv);
    card.appendChild(dateDiv);
    card.appendChild(controlDiv);
    listDOM.prepend(card);
}
const mapButton = document.getElementById("button-to-map");
mapButton.addEventListener("click", function () {
    window.location.href = "map.html";
})
function createDateString_DMY(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "Mar", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const myDate = new Date(date * 1000);
    return `${myDate.getDate()} ${month[myDate.getMonth()]} ${myDate.getFullYear()}`;
}
function createDateString_DMD(date) {

    var month = ["Jan", "Feb", "Mar", "Apr", "Mar", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const myDate = new Date(date * 1000);
    return `${day[myDate.getDay()]}, ${month[myDate.getMonth()]} ${myDate.getDate()}`;
}
function createDailyListNode(dailyForecast, data) {
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
    method: "POST",
    url: "https://ipapi.co/json",
    error: (function () {
        alert("AJAX error (https://ipapi.co/json)")
    }),
}).done(function (ipResult) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${ipResult.latitude}&lon=${ipResult.longitude}&appid=eea225520939f59f9dcd0ea6046d512b&exclude=current,minutely,alerts&units=metric`
    }).done(function (weatherResult) {
        console.log(weatherResult);
        initHourly(weatherResult);
        initDaily(weatherResult);
    })
})

function initDisplayListeners() {
    if (window.innerWidth < 768) {
        $("#statistics").css("display", "none");
        $("#weather-link").css("display", "");
        $(".list-group-item").off('mouseenter mouseleave');
        $(".list-group-item .list-item-control").css("visibility", "visible");
    } else {
        $("#statistics").css("display", "");
        $("#weather-link").css("display", "none");
        $(".list-group-item .list-item-control").css("visibility", "hidden");
        $(".list-group-item").off('mouseenter mouseleave');
        $(".list-group-item").hover(function () {
            if ($(".list-item-control", this).css("visibility") == "visible") {
                $(".list-item-control", this).css("visibility", "hidden");
            } else {
                $(".list-item-control", this).css("visibility", "visible");
            }

        })
    }
    window.addEventListener("resize", function (event) {
        if (window.innerWidth < 768) {
            $("#statistics").css("display", "none");
            $("#weather-link").css("display", "");
            $(".list-group-item").off('mouseenter mouseleave');
            $(".list-group-item .list-item-control").css("visibility", "visible");
        } else {
            $("#statistics").css("display", "");
            $("#weather-link").css("display", "none");
            $(".list-group-item .list-item-control").css("visibility", "hidden");
            $(".list-group-item").off('mouseenter mouseleave');
            $(".list-group-item").hover(function () {
                if ($(".list-item-control", this).css("visibility") == "visible") {
                    $(".list-item-control", this).css("visibility", "hidden");
                } else {
                    $(".list-item-control", this).css("visibility", "visible");
                }

            })
        }
    })
}
function findTotalDist(distanceList) {
    var total_dist = 0;
    distanceList.forEach(dist => {
        total_dist += dist;
    });
    return total_dist;
}
function findTotalTime(timeList) {
    var total_time = 0;
    timeList.forEach(time => {
        total_time += time;
    });
    return total_time / 60;
}
function findFastestSpeed(state) {
    const speedList = [];
    for (const [key, value] of Object.entries(state)) {
        if (value.timeInSec != 0) {
            speedList.push(parseFloat(value.distance) / (value.timeInSec / 60 / 60))
        }
    }
    return Math.max.apply(null, speedList)
}
function loadBadgesAndStats() {
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
        if (findTotalTime(timeList) == 0) {
            const dateNow = new Date()
            const oldDate = new Date(parseInt(dateList[0]))
            const dateDif = dateNow.getFullYear() - oldDate.getFullYear()
            $("#acc-lifespan").attr("data-bs-content", `Account age: ${dateDif} years`)
        }
        // Table Stats
        console.log(timeList)
        if (findTotalTime(timeList) != 0) {
            $("#avg-run-time").text(`${(findTotalTime(timeList) / timeList.length).toFixed(2)}min`)
        }
        $("#total-dist").text(`${findTotalDist(distanceList).toFixed(2)}km`)
        if (findTotalTime(timeList) != 0) {
            $("#total-run-time").text(`${(findTotalTime(timeList).toFixed(2))}h`)
        }

    }

}
function initModalListener() {
    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", function () {
        console.log("ok")
        const key = this.getAttribute("key")
        console.log(key)
        const state = JSON.parse(localStorage.getItem("state"));
        delete state[`${key}`];
        localStorage.setItem("state", JSON.stringify(state));
        loadList();
        loadBadgesAndStats();
    })

    const saveButton = document.getElementById("save")
    saveButton.addEventListener("click", function (event) {
        event.preventDefault();
        const key = this.getAttribute("key")
        const state = JSON.parse(localStorage.getItem("state"));
        state[key] = {
            distance: state[key].distance,
            name: $("#name").val(),
            lineList: state[key].lineList,
            timeInSec: state[key].timeInSec,
        }
        localStorage.setItem("state", JSON.stringify(state));
        updateUserData(state)
        loadList();
        loadBadgesAndStats();
    })

    const viewButton = document.getElementById("view")
    viewButton.addEventListener("click", function (event) {
        console.log("view")
        window.location.href = `viewMap.html?key=${this.getAttribute("key")}`;
    })
}
function editButtonListener() {
    let stateString = localStorage.getItem("state");
    let state = JSON.parse(stateString);
    const editButton = document.getElementsByClassName("list-group-item");
    for (var i = 0; i < editButton.length; i++) {
        editButton[i].addEventListener("click", function () {
            $("#distance").val(state[this.id].distance);
            $("#name").val(state[this.id].name);
            $("#time").val(state[this.id].timeInSec);
            $("#delete").attr("key", this.id);
            $("#save").attr("key", this.id);
            $("#view").attr("key", this.id);
        })
    }
}
initModalListener();
initDisplayListeners();
// Firebase Database
function getUserData(userId) {
    firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
        if (snapshot.val() != null) {
            localStorage.setItem("state", JSON.stringify(snapshot.val().state))
        }
        loadList();
        editButtonListener();
        loadBadgesAndStats();
        $("#row-wrapper").css("display", "")
    });
}
function updateUserData(newState) {
    var user = firebase.auth().currentUser;
    console.log(newState)
    firebase.database().ref('users/' + user.uid).set({
        state: newState
    });
}
var firebaseConfig = {
    apiKey: "AIzaSyAD4mXK15auf09DWDS0lgstTYJ_07hhDeI",
    authDomain: "wired-apex-298001.firebaseapp.com",
    databaseURL: "https://wired-apex-298001-default-rtdb.firebaseio.com",
    projectId: "wired-apex-298001",
    storageBucket: "wired-apex-298001.appspot.com",
    messagingSenderId: "474498507020",
    appId: "1:474498507020:web:b517e6139a985f82832929",
    measurementId: "G-0FBKY5Y04J"
};

firebase.initializeApp(firebaseConfig);
var googleProvider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
firebase.auth().onAuthStateChanged(((user) => {
    if (user) {
        console.log(user.uid)
        getUserData(user.uid);
        $('#login-modal').modal("hide");
    } else {
        $('#login-modal').modal("show")
        const loginBtn = document.getElementById("login");
        loginBtn.addEventListener("click", function () {
            firebase.auth().signInWithRedirect(googleProvider)
        })
    }
}))