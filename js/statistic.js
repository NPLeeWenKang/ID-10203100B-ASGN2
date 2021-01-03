function checkDistance(distance) {
    distanceInKm = (distance).toFixed(2)
    if (distanceInKm >= 1) {
        distanceInMile = (distance / 1.609).toFixed(2);
        return `${distanceInKm} km (${distanceInMile} mi)`

    } else {
        distanceInM = (distance * 1000).toFixed(2);
        distanceinFt = (distance * 3281).toFixed(2);
        return `${distanceInM} m (${distanceinFt} ft)`
    }
}
function loadList() {
    console.log("loading")
    let stateString = localStorage.getItem("state")
    let state = JSON.parse(stateString)
    const listDOM = document.getElementById("listDOM")
    listDOM.innerHTML = "" //Clears  all children nodes
    for (const [key, value] of Object.entries(state)) {
        createListElement(listDOM, value, key)
    }
}
function loadDateListNode(dateData) {

}
function loadChart(dateData, tempData) {
    const ctx = document.getElementById("myChart")
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
    const card = document.createElement("li")
    card.className = "list-group-item"
    card.id = key

    const nameDiv = document.createElement("div")
    nameDiv.innerHTML = indiviualElement.name

    const distanceDiv = document.createElement("div")
    distanceDiv.innerHTML = "Distance: " + checkDistance(parseFloat(indiviualElement.distance))

    const runningDate = new Date(parseInt(key))
    const dateDiv = document.createElement("div")
    dateDiv.style.color = "#b0b0b0";
    dateDiv.style.fontSize = "11px";
    dateDiv.innerHTML = `${runningDate.getDate()}/${runningDate.getMonth()}/${runningDate.getFullYear()}`

    const controlDiv = document.createElement("div")
    controlDiv.classList.add("list-item-control")
    const viewIcon = document.createElement("img")
    viewIcon.src = "src/map.svg"
    const viewText = document.createElement("p")
    viewText.innerHTML = "View"
    viewText.style.margin = "0"
    const viewBtn = document.createElement("button")
    viewBtn.type = "button"
    viewBtn.classList.add("btn")
    viewBtn.classList.add("btn-primary")
    viewBtn.id = key
    viewBtn.appendChild(viewIcon)
    viewBtn.appendChild(viewText)

    const deleteIcon = document.createElement("img")
    deleteIcon.src = "src/trash.svg"
    const deleteText = document.createElement("p")
    deleteText.innerHTML = "Delete"
    deleteText.style.margin = "0"
    const deleteBtn = document.createElement("button")
    deleteBtn.type = "button"
    deleteBtn.classList.add("btn")
    deleteBtn.classList.add("btn-primary")
    deleteBtn.id = key
    deleteBtn.appendChild(deleteIcon)
    deleteBtn.appendChild(deleteText)

    controlDiv.appendChild(viewBtn)
    controlDiv.appendChild(deleteBtn)

    viewBtn.addEventListener("click", function (event) {
        window.location.href = `viewMap.html?key=${this.id}`
    })

    deleteBtn.addEventListener("click", function (event) {
        console.log("Delete")
        const state = JSON.parse(localStorage.getItem("state"))
        delete state[`${this.id}`]
        localStorage.setItem("state", JSON.stringify(state))
        loadList()
    })

    card.appendChild(nameDiv)
    card.appendChild(distanceDiv)
    card.appendChild(dateDiv)
    card.appendChild(controlDiv)
    listDOM.appendChild(card)
}
function createDateString_DMY(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "Mar", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const myDate = new Date(date * 1000)
    return `${myDate.getDate()} ${month[myDate.getMonth()]} ${myDate.getFullYear()}`
}
function createDateString_DMD(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "Mar", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const myDate = new Date(date * 1000)
    return `${day[myDate.getDay()]}, ${month[myDate.getMonth()]} ${myDate.getDate()}`
}
function createDailyListNode(dailyForecast, data) {
    const parentDiv = document.createElement("div")
    parentDiv.className = "row g-0 d-flex align-items-center"
    const dateDiv = document.createElement("div")
    dateDiv.className = "dateDiv col-4 col-md-4"
    dateDiv.innerHTML = createDateString_DMD(data.dt)


    const secondDiv = document.createElement("div")
    secondDiv.className = "col-8 col-md-8 d-flex justify-content-between align-items-center"

    const iconPlusTemp = document.createElement("span")
    iconPlusTemp.className = "iconPlusTemp d-flex justify-content-between align-items-center"
    iconPlusTemp.style.marginRight = "5px"
    const img = document.createElement("img")
    img.src = "http://openweathermap.org/img/wn/" + `${data.weather[0].icon}@2x.png`
    img.style.width = "30px"
    img.style.height = "30px"
    iconPlusTemp.appendChild(img)
    const tempText = document.createElement("span")
    tempText.style.fontSize = "13px"
    tempText.innerHTML = `${Math.floor(data.temp.max)} / ${Math.floor(data.temp.min)}\u00B0C`
    iconPlusTemp.appendChild(tempText)
    secondDiv.appendChild(iconPlusTemp)


    const weatherText = document.createElement("span")
    weatherText.className = "weatherText"
    weatherText.innerHTML = data.weather[0].description
    weatherText.style.fontSize = "12px"
    secondDiv.appendChild(weatherText)



    parentDiv.appendChild(dateDiv)
    parentDiv.appendChild(secondDiv)

    dailyForecast.appendChild(parentDiv)
}
function initHourly(weatherResult) {
    const tempData = []
    const dateData = []
    for (var i = 0; i <= 12; i++) {
        const element = weatherResult.hourly[i]
        tempData.push(element.temp)
        const date = new Date(element.dt * 1000)
        if (date.getHours() > 12) {
            dateData.push(`${date.getHours() - 12} pm`)
        } else {
            if (date.getHours() == 0) {
                dateData.push(`12 am`)
            } else {
                dateData.push(`${date.getHours()} am`)
            }
        }

    }
    loadChart(dateData, tempData)
}
function initDaily(weatherResult) {
    const data = []
    const dailyForecast = document.getElementById("daily-forecast")
    for (var i = 0; i <= 7; i++) {
        const element = weatherResult.daily[i]
        data.push(element)
        createDailyListNode(dailyForecast, element)
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
        console.log(weatherResult)
        initHourly(weatherResult)
        initDaily(weatherResult)
    })
})



