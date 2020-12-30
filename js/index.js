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
const mapButton = document.getElementById("button-to-map")
mapButton.addEventListener("click", function () {
    window.location.href = "map.html"
})
function initDisplayListeners() {
    if (window.innerWidth < 768) {
        $("#statistics").addClass("order-first");
        $(".list-group-item").off('mouseenter mouseleave');
        $(".list-group-item .list-item-control").css("visibility", "visible")
    } else {
        $("#statistics").removeClass("order-first");
        $(".list-group-item .list-item-control").css("visibility", "hidden")
        $(".list-group-item").off('mouseenter mouseleave');
        $(".list-group-item").hover(function () {
            console.log("ok")
            if ($(".list-item-control", this).css("visibility") == "visible") {
                $(".list-item-control", this).css("visibility", "hidden")
            } else {
                $(".list-item-control", this).css("visibility", "visible")
            }

        })
    }
    window.addEventListener("resize", function (event) {
        if (window.innerWidth < 768) {
            $("#statistics").addClass("order-first");
            $(".list-group-item").off('mouseenter mouseleave');
            $(".list-group-item .list-item-control").css("visibility", "visible")
        } else {
            $("#statistics").removeClass("order-first");
            $(".list-group-item .list-item-control").css("visibility", "hidden")
            $(".list-group-item").off('mouseenter mouseleave');
            $(".list-group-item").hover(function () {
                console.log("ok")
                if ($(".list-item-control", this).css("visibility") == "visible") {
                    $(".list-item-control", this).css("visibility", "hidden")
                } else {
                    $(".list-item-control", this).css("visibility", "visible")
                }

            })
        }
    })
}



window.onload = () => {
    loadList()
    initDisplayListeners()
}