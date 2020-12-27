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
function createListElement(listDOM, indiviualElement, key) {
    const card = document.createElement("li")
    card.className = "list-group-item"

    const nameDiv = document.createElement("div")
    nameDiv.innerHTML = indiviualElement.name

    const distanceDiv = document.createElement("div")
    distanceDiv.innerHTML = "Distance: " + checkDistance(parseInt(indiviualElement.distance))

    const runningDate = new Date(parseInt(key))
    const dateDiv = document.createElement("div")
    dateDiv.style.color = "#b0b0b0";
    dateDiv.style.fontSize = "11px";
    dateDiv.innerHTML = `${runningDate.getDate()}/${runningDate.getMonth()}/${runningDate.getFullYear()}`

    card.appendChild(nameDiv)
    card.appendChild(distanceDiv)
    card.appendChild(dateDiv)
    listDOM.appendChild(card)
}
const mapButton = document.getElementById("button-to-map")
mapButton.addEventListener("click", function () {
    window.location.href = "map.html"
})
if (window.innerWidth < 768) {
    $("#statistics").addClass("order-first");
} else {
    $("#statistics").removeClass("order-first");
}
window.addEventListener("resize", function (event) {
    if (window.innerWidth < 768) {
        $("#statistics").addClass("order-first");
    } else {
        $("#statistics").removeClass("order-first");
    }
})


window.onload = () => {
    let stateString = localStorage.getItem("state")
    let state = JSON.parse(stateString)
    const listDOM = document.getElementById("listDOM")
    for (const [key, value] of Object.entries(state)) {
        createListElement(listDOM, value, key)
    }
}