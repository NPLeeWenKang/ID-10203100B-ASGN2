
function initListeners(pathHistory, lineList, markerList) {
    const savebutton = document.getElementById("saveButton");
    //$('#saveButton').replaceWith($('#saveButton').clone());
    savebutton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(event.target)
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
    var R = 6371; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
function resetButton(div, pathHistory, lineList, markerList) {
    const submitButton = document.createElement("div");
    submitButton.style.display = "flex";
    submitButton.style.justifyContent = "center";
    submitButton.style.alignItems = "center";
    submitButton.style.backgroundColor = "#fff";
    submitButton.style.border = "2px solid #fff";
    submitButton.style.borderRadius = "3px";
    submitButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    submitButton.style.cursor = "pointer";
    submitButton.style.margin = "5px"
    submitButton.style.marginBottom = "10px";
    submitButton.style.textAlign = "center";
    div.appendChild(submitButton);
    // Set CSS for the control interior.
    const resetButton = document.createElement("img");
    resetButton.src = "src/arrow-counterclockwise.svg"
    resetButton.style.display = "inline";
    submitButton.appendChild(resetButton)
    const controlText = document.createElement("div");
    controlText.style.display = "inline";
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "15px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "Reset";
    submitButton.appendChild(controlText);
    submitButton.addEventListener("click", function () {
        markerList.forEach(element => {
            element.setMap(null);
        });
        pathHistory[0].setMap(null);
        markerList.splice(0, markerList.length)
        lineList.splice(0, lineList.length)
        pathHistory.splice(0, pathHistory.length)
        $(".distanceDisplay ").text(`Total Distance: `)
        $("#metric").removeClass("is-invalid").removeClass("is-valid")
        $("#imperial").removeClass("is-invalid").removeClass("is-valid")
        $("#metric").val("")
        $("#imperial").val("")
        $("#pathName").removeClass("is-invalid").removeClass("is-valid")
        $("#pathName").val("")
        //console.log(markerList)
        //console.log(pathHistory)
        //console.log("ok");
    })

}
function backButton(div) {
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
    const submitButton = document.createElement("div");
    const attribute1 = document.createAttribute("data-bs-toggle");
    attribute1.value = "modal"
    const attribute2 = document.createAttribute("data-bs-target");
    attribute2.value = "#staticBackdrop"
    submitButton.setAttributeNode(attribute1);
    submitButton.setAttributeNode(attribute2);
    submitButton.style.display = "flex";
    submitButton.style.justifyContent = "center";
    submitButton.style.alignItems = "center";
    submitButton.style.backgroundColor = "#fff";
    submitButton.style.border = "2px solid #fff";
    submitButton.style.borderRadius = "3px";
    submitButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    submitButton.style.cursor = "pointer";
    submitButton.style.margin = "5px"
    submitButton.style.marginBottom = "10px";
    submitButton.style.textAlign = "center";
    div.appendChild(submitButton);
    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.display = "inline";
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "15px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.innerHTML = "Submit";
    submitButton.appendChild(controlText);
    const resetButton = document.createElement("img");
    resetButton.src = "src/arrow-right-short.svg"
    resetButton.style.display = "inline";
    submitButton.appendChild(resetButton)
}
function distanceDisplay(div) {
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
    distanceText.innerHTML = "Total Distance:";
    displayBox.appendChild(distanceText);

}
function calculateDistance(markerList) {
    var distance = 0;
    for (let i = 0; i < markerList.length; i++) {
        if (markerList[i] == markerList[markerList.length - 1]) {
            break;
        }
        let point1 = markerList[i];
        let point2 = markerList[i + 1];
        distance += getDistanceFromLatLonInKm(point1, point2)
        console.log(distance)
        distanceInKm = (distance).toFixed(2)
        if (distanceInKm >= 1) {
            distanceInMile = (distance / 1.609).toFixed(2);
            console.log($(".distanceDisplay").text())
            $(".distanceDisplay").text(`Total Distance: ${distanceInKm} km (${distanceInMile} mi)`)
            $("#distance").attr("distance", `${distance}`)
            $("#metric").val(`${distanceInKm} km`)
            $("#imperial").val(`${distanceInMile} mile`)

        } else {
            distanceInM = (distance * 1000).toFixed(2);
            distanceinFt = (distance * 3281).toFixed(2);
            $(".distanceDisplay ").text(`Total Distance: ${distanceInM} m (${distanceinFt} ft)`)
            $("#distance").attr("distance", `${distance}`)
            $("#metric").val(`${distanceInM} m`)
            $("#imperial").val(`${distanceinFt} ft`)
        }

    }
}
function drawLine(pathHistory, lineList, map) {
    const flightPath = new google.maps.Polyline({
        path: lineList,
        geodesic: true,
        strokeColor: "rgba(000,000,000,0.3)",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    if (pathHistory.length == 1) {
        pathHistory[0].setMap(null)
        pathHistory.splice(0, 1)
    }
    pathHistory.push(flightPath)
    flightPath.setMap(map);
}
function setCenterMap(map) {
    $.ajax({
        method: "POST",
        url: "https://ipapi.co/json",
        error: (function () {
            alert("AJAX error (https://ipapi.co/json)")
        }),
    }).done(function (result) {
        console.log(result)
        map.setCenter({ lat: result.latitude, lng: result.longitude })
    })
}

function gm_authFailure(err) {
    console.log(window.google.maps.disabled)
};

function initMap() {
    const myLatlng = { lat: 0, lng: 0 };
    const markerList = []
    const lineList = []
    const pathHistory = []
    initListeners(pathHistory, lineList, markerList);
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: myLatlng,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
    });
    setCenterMap(map)

    const resetDiv = document.createElement("div");
    backButton(resetDiv);
    resetButton(resetDiv, pathHistory, lineList, markerList);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(resetDiv);

    const submitDiv = document.createElement("div");
    submitButton(submitDiv);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(submitDiv);

    const display = document.createElement("div");
    distanceDisplay(display);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(display);
    map.addListener("click", (mapsMouseEvent) => {
        let marker = new google.maps.Marker({
            position: mapsMouseEvent.latLng.toJSON(),
            map: map,
        });
        markerList.push(marker)

        lineList.push(mapsMouseEvent.latLng.toJSON())
        marker.addListener('click', () => {
            if (markerList.indexOf(marker) == 0 && markerList.length > 2) {
                markerList.push(markerList[0])
                lineList.push(lineList[0])
                drawLine(pathHistory, lineList, map)
            } else {
                const index = markerList.indexOf(marker)
                marker.setMap(null)
                markerList.splice(index, 1)
                lineList.splice(index, 1)
                drawLine(pathHistory, lineList, map)
            }

        })
        console.log("marker: ", markerList.length)
        console.log("line: ", lineList.length)
        console.log("path:", pathHistory.length)
        drawLine(pathHistory, lineList, map)
        calculateDistance(markerList)
    })

}

// Firebase
function setUserData(newState) {
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
    if (!user) {
        window.location.href = "index.html"
    }
}))