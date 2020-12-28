// var firebaseConfig = {
//     apiKey: "AIzaSyAD4mXK15auf09DWDS0lgstTYJ_07hhDeI",
//     authDomain: "wired-apex-298001.firebaseapp.com",
//     projectId: "wired-apex-298001",
//     storageBucket: "wired-apex-298001.appspot.com",
//     messagingSenderId: "474498507020",
//     appId: "1:474498507020:web:b517e6139a985f82832929",
//     measurementId: "G-0FBKY5Y04J"
// };
// firebase.initializeApp(firebaseConfig);
// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().onAuthStateChanged(((user) => {
//     if (user) {
//         console.log(user.uid)
//     } else {
//         firebase.auth().signInWithRedirect(provider).then((result) => {
//             console.log(result)
//         });
//     }
// }))

// $(document).ready(function () {
//     var param = { lastName: "Doe", firstName: "John" };
//     var randome = Math.floor((Math.random() * 100000000) + 1)
//     $.ajax({
//         url: "https://wired-apex-298001-default-rtdb.firebaseio.com/user/97554689.json",
//         type: "get",
//         success: function (result) {
//             console.log(result)
//         },
//         error: function (error) {
//             alert("error: " + error);
//         }
//     });
// });
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
        if (passed) {
            let originalState = localStorage.getItem("state");
            let arr = {
                name: $("#pathName").val(),
                distance: $("#distance").attr("distance"),
                lineList: lineList,
            }
            let newState = {
                [`${Date.now()}`]: arr,
                ...JSON.parse(originalState),

            }
            localStorage.setItem('state', JSON.stringify(newState))
            window.location.href = "index.html"
        }
        // if ($("#pathName").val().length >= 1) {
        //     $("#pathName").addClass("is-valid").removeClass("is-invalid")
        //     $("#metric").addClass("is-valid").removeClass("is-invalid")
        //     $("#imperial").addClass("is-valid").removeClass("is-invalid")
        //     let originalState = localStorage.getItem("state");
        //     let arr = {
        //         name: $("#pathName").val(),
        //         distance: $("#distance").attr("distance"),
        //         lineList: lineList,
        //     }
        //     let newState = {
        //         ...JSON.parse(originalState),
        //         [`${Date.now()}`]: arr,
        //     }
        //     localStorage.setItem('state', JSON.stringify(newState))
        //     // //window.location.href = "../index.html"
        // } else {
        //     $("#pathName").addClass("is-invalid").removeClass("is-valid")
        //     $("#metric").addClass("is-invalid").removeClass("is-valid")
        //     $("#imperial").addClass("is-invalid").removeClass("is-valid")
        //     console.log($("#distance").attr("distance"))
        // }

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
function resetButton(div, map, text, pathHistory, lineList, markerList) {
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
    controlText.innerHTML = text;
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
function submitButton(div, map, text, pathHistory, lineList, markerList) {
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
    controlText.innerHTML = text;
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
            $(".distanceDisplay ").text(`Total Distance: ${distanceInKm} km (${distanceInMile} mi)`)
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
    resetButton(resetDiv, map, "Reset", pathHistory, lineList, markerList);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(resetDiv);

    const submitDiv = document.createElement("div");
    submitButton(submitDiv, map, "Submit", pathHistory, lineList, markerList);
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

        // if (list.length == 2) {
        //     var service = new google.maps.DistanceMatrixService();
        //     service.getDistanceMatrix(
        //         {
        //             origins: [list[0]],
        //             destinations: [list[1]],
        //         }, function (result, status) {
        //             console.log(result);
        //         });
        //     // $.ajax({
        //     //     method: "GET",
        //     //     dataType: "json",
        //     //     contentType: "text/plain",
        //     //     url: "https://maps.googleapis.com/maps/api/distancematrix/json",
        //     //     headers: {},
        //     //     data: { origins: "1.4321913911362303, 103.78751998122362", destinations: "1.4313172639890452, 103.78433888133196|1.4339932718107122, 103.78351544316439", },
        //     // }).done(function (result) {
        //     //     console.log(result)
        //     // })
        //     $('#length').text(getDistanceFromLatLonInKm(list[0].lat, list[0].lng, list[1].lat, list[1].lng))
        //     console.log(getDistanceFromLatLonInKm(list[0].lat, list[0].lng, list[1].lat, list[1].lng))
        //}
    })

}
