// viewMap.js is a striped down version of map.js
// This is because viewMap.js do not need all the features in map,js

function setMap(map, lineList, markerList) {
    // loads searches correct route data from local storage
    // then loads the markers and polylines onto the map

    const queryString = window.location.search;
    const key = new URLSearchParams(queryString).get("key")
    const state = JSON.parse(localStorage.getItem("state"))
    const chosenMapState = state[key]
    lineList.push(...chosenMapState.lineList)
    for (const [key, value] of Object.entries(lineList)) {
        let marker = new google.maps.Marker({
            position: value,
            map: map,
        });
        markerList.push(marker)

    }
    $("#pathName").val(`Duplicate of ${chosenMapState.name}`)
    drawLine(lineList, map)

    // Set map center to the first marker's coordinates
    map.setCenter(lineList[0])
}
function initListeners(pathHistory, lineList, markerList) {
    const savebutton = document.getElementById("saveButton");
    //$('#saveButton').replaceWith($('#saveButton').clone());
    savebutton.addEventListener("click", function (event) {
        event.preventDefault();
        let passed = true;
        // Check if distance is valid
        if ($("#metric").val().length >= 1 && $("#imperial").val().length >= 1) {
            $("#metric").addClass("is-valid").removeClass("is-invalid")
            $("#imperial").addClass("is-valid").removeClass("is-invalid")
            passed = passed && true
        } else {
            $("#metric").addClass("is-invalid").removeClass("is-valid")
            $("#imperial").addClass("is-invalid").removeClass("is-valid")
            passed = passed && false
        }
        // Check if name is valid
        if ($("#pathName").val().length >= 1) {
            $("#pathName").addClass("is-valid").removeClass("is-invalid")
            passed = passed && true
        } else {
            $("#pathName").addClass("is-invalid").removeClass("is-valid")
            passed = passed && false
        }
        // Check if hr is valid (is integer)
        if ($("#hr").val() != "") {
            if (!isNaN(parseInt($("#hr").val()))) {
                $("#hr").addClass("is-valid").removeClass("is-invalid")
                $("#hr").val(parseInt($("#hr").val()))
                passed = passed && true
            } else {
                $("#hr").addClass("is-invalid").removeClass("is-valid")
                passed = passed && false
            }
        } else {
            $("#hr").removeClass("is-invalid").removeClass("is-valid")
            passed = passed && true
        }

        // Check if min is valid (is integer)
        if ($("#min").val() != "") {
            if (!isNaN(parseInt($("#min").val()))) {
                $("#min").addClass("is-valid").removeClass("is-invalid")
                $("#min").val(parseInt($("#min").val()))
                passed = passed && true
            } else {
                $("#min").addClass("is-invalid").removeClass("is-valid")
                passed = passed && false
            }
        } else {
            $("#min").removeClass("is-invalid").removeClass("is-valid")
            passed = passed && true
        }

        // Check if sec is valid (is integer)
        if ($("#sec").val() != "") {
            if (!isNaN(parseInt($("#sec").val()))) {
                $("#sec").addClass("is-valid").removeClass("is-invalid")
                $("#sec").val(parseInt($("#sec").val()))
                passed = passed && true
            } else {
                $("#sec").addClass("is-invalid").removeClass("is-valid")
                passed = passed && false
            }
        } else {
            $("#sec").removeClass("is-invalid").removeClass("is-valid")
            passed = passed && true
        }

        if (passed) {
            var timeHr = 0;
            var timeMin = 0;
            var timeSec = 0;
            // Checks if time is empty, IF NULL then 0.
            // IF not NULL, then time will be converted to seconds
            if ($("#hr").val() != "") {
                var timeHr = parseInt($("#hr").val()) * 60 * 60
            }
            if ($("#min").val() != "") {
                var timeMin = parseInt($("#min").val()) * 60
            }
            if ($("#sec").val() != "") {
                var timeSec = parseInt($("#sec").val())
            }
            let totalTime = timeHr + timeMin + timeSec
            let originalState = localStorage.getItem("state");
            // Time spent running is stored in seconds
            let arr = {
                name: $("#pathName").val(),
                distance: $("#distance").attr("distance"),
                lineList: lineList,
                timeInSec: totalTime,
            }
            let newState = {
                [`${Date.now()}`]: arr,
                ...JSON.parse(originalState),

            }
            setUserData(newState)
        }


    })
    $('#staticBackdrop').on('hide.bs.modal', function () {
        $("#pathName").removeClass("is-invalid").removeClass("is-valid")
        $("#pathName").val("")
        $("#metric").removeClass("is-invalid").removeClass("is-valid")
        $("#imperial").removeClass("is-invalid").removeClass("is-valid")
    })
}



function getDistanceFromLatLonInKm(mk1, mk2) {
    // Uses havasine formula to get distance
    var R = 6371; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}
function deg2rad(deg) {
    // converts degrees to radian
    return deg * (Math.PI / 180)
}
function backButton(div) {
    // Sets up the back button to be placed on the map

    const button = document.createElement("div");
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.backgroundColor = "#fff";
    button.style.border = "2px solid #fff";
    button.style.borderRadius = "3px";
    button.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    button.style.cursor = "pointer";
    button.style.margin = "5px"
    button.style.marginBottom = "10px";
    button.style.textAlign = "center";
    div.appendChild(button);
    // Set CSS for the control interior.
    const icon = document.createElement("img");
    icon.src = "src/arrow-left-short.svg"
    icon.style.display = "inline";
    button.appendChild(icon)

    const text = document.createElement("div");
    text.style.display = "inline";
    text.style.color = "rgb(25,25,25)";
    text.style.fontFamily = "Roboto,Arial,sans-serif";
    text.style.fontSize = "15px";
    text.style.lineHeight = "38px";
    text.style.paddingRight = "5px";
    text.innerHTML = "Back";
    button.appendChild(text);
    button.addEventListener("click", function () {
        window.location.href = "index.html"
    })

}

function submitButton(div) {
    // Sets up the back button to be placed on the map

    const button = document.createElement("div");
    const attribute1 = document.createAttribute("data-bs-toggle");
    attribute1.value = "modal"
    const attribute2 = document.createAttribute("data-bs-target");
    attribute2.value = "#staticBackdrop"
    button.setAttributeNode(attribute1);
    button.setAttributeNode(attribute2);
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.backgroundColor = "#fff";
    button.style.border = "2px solid #fff";
    button.style.borderRadius = "3px";
    button.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    button.style.cursor = "pointer";
    button.style.margin = "5px"
    button.style.marginBottom = "10px";
    button.style.textAlign = "center";
    div.appendChild(button);



    // Set CSS for the control interior.
    const text = document.createElement("div");
    text.style.display = "inline";
    text.style.color = "rgb(25,25,25)";
    text.style.fontFamily = "Roboto,Arial,sans-serif";
    text.style.fontSize = "15px";
    text.style.lineHeight = "38px";
    text.style.paddingLeft = "5px";
    text.innerHTML = "Duplicate";
    button.appendChild(text);

    const icon = document.createElement("img");
    icon.src = "src/arrow-right-short.svg"
    icon.style.display = "inline";
    button.appendChild(icon)

}
function distanceDisplay(div, markerList) {
    div.style.width = "100%"
    div.style.display = "flex";
    div.style.justifyContent = "center"
    const displayBox = document.createElement("div");
    displayBox.style.backgroundColor = "#fff";
    displayBox.style.border = "2px solid #fff";
    displayBox.style.borderRadius = "3px";
    displayBox.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    displayBox.style.margin = "5px"
    displayBox.style.marginBottom = "10px";
    displayBox.style.textAlign = "center";
    div.appendChild(displayBox);
    // Set CSS for instruction
    const instructionDisplay = document.createElement("div");
    instructionDisplay.style.color = "#b0b0b0";
    instructionDisplay.style.fontFamily = "Roboto,Arial,sans-serif";
    instructionDisplay.style.textAlign = "left";
    instructionDisplay.style.fontSize = "11px";
    instructionDisplay.style.marginBottom = "5px"
    instructionDisplay.style.paddingLeft = "5px";
    instructionDisplay.style.paddingRight = "5px";
    instructionDisplay.innerHTML = "Click on the map to add your path.";
    displayBox.appendChild(instructionDisplay);
    // Set CSS for distance
    const distanceText = document.createElement("div");
    distanceText.className = "distanceDisplay";
    distanceText.style.color = "rgb(25,25,25)";
    distanceText.style.fontFamily = "Roboto,Arial,sans-serif";
    distanceText.style.textAlign = "left";
    distanceText.style.fontSize = "12px";
    distanceText.style.paddingLeft = "5px";
    distanceText.style.paddingRight = "5px";
    distanceText.innerHTML = calculateDistance(markerList);
    displayBox.appendChild(distanceText);

}
function calculateDistance(markerList) {
    // Each marker contains {lat: , Long: }
    // Using a list of markers, finds the distance and display the final (total) distance on the map

    var distance = 0;
    for (let i = 0; i < markerList.length; i++) {
        if (markerList[i] == markerList[markerList.length - 1]) {
            break;
        }
        let point1 = markerList[i];
        let point2 = markerList[i + 1];
        distance += getDistanceFromLatLonInKm(point1, point2)
        distanceInKm = (distance).toFixed(2)
        // Determines if distance shoule be displayed in KM or M
        if (distanceInKm >= 1) {
            distanceInMile = (distance / 1.609).toFixed(2);
            $("#distance").attr("distance", `${distance}`)
            $("#metric").val(`${distanceInKm} km`)
            $("#imperial").val(`${distanceInMile} mile`)
            return `Total Distance: ${distanceInKm} km (${distanceInMile} mi)`


        } else {
            distanceInM = (distance * 1000).toFixed(2);
            distanceinFt = (distance * 3281).toFixed(2);
            $("#distance").attr("distance", `${distance}`)
            $("#metric").val(`${distanceInM} m`)
            $("#imperial").val(`${distanceinFt} ft`)
            return `Total Distance: ${distanceInM} m (${distanceinFt} ft)`

        }

    }
}
function drawLine(lineList, map) {
    // Draws a polyline onto the map
    // https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    const flightPath = new google.maps.Polyline({
        path: lineList,
        geodesic: true,
        strokeColor: "rgba(000,000,000,0.3)",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    flightPath.setMap(map);
}


const lineList = []
function initMap() {
    // It is a callback, so that after the <script> tag is run, this function will run.
    const myLatlng = { lat: 0, lng: 0 };
    const markerList = []

    const pathHistory = []
    initListeners(pathHistory, lineList, markerList);


    //Creates map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: myLatlng,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
    });

    // Sets up the buttons on the map
    setMap(map, lineList, markerList)
    const backDiv = document.createElement("div");
    backButton(backDiv);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(backDiv);

    const submitDiv = document.createElement("div");
    submitButton(submitDiv);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(submitDiv);

    const display = document.createElement("div");
    distanceDisplay(display, markerList);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(display);


}

function setUserData(newState) {
    // Saves route to the database
    var user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid).set({
        state: newState
    }, (error) => {
        if (error) {
            console.alert(error);
        } else {
            window.location.href = "index.html"
        }
    });

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
var database = firebase.database();

// Checks if the user is logged in. If not,
// then send user back to index.html
firebase.auth().onAuthStateChanged(((user) => {
    if (!user) {
        window.location.href = "index.html"
    }
}))
