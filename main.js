
function load() {
    document.getElementById('run-api-1').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v0=1'
    document.getElementById('run-api-2').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v1=1'
    document.getElementById('run-api-3').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v5=No Car Standing'
    document.getElementById('left-street-light-btn').innerHTML = 'Turn Off'
    document.getElementById('right-street-light-btn').innerHTML = 'Turn Off'
    left_status = true
    right_status = true
}
function toggleLeft() {
    if (left_status) {
        left_status = false;
        document.getElementById('left-street-light-status').src = 'img/bulb_off.png'
        document.getElementById('run-api-1').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v0=1'
        document.getElementById('left-street-light-btn').innerHTML = 'Turn On'
    } else {
        left_status = true;
        document.getElementById('left-street-light-status').src = 'img/bulb_on.png'
        document.getElementById('run-api-1').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v0=0'
        document.getElementById('left-street-light-btn').innerHTML = 'Turn Off'
    }
}
function toggleRight() {
    if (right_status) {
        right_status = false;
        document.getElementById('right-street-light-status').src = 'img/bulb_off.png'
        document.getElementById('run-api-1').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v1=1'
        document.getElementById('right-street-light-btn').innerHTML = 'Turn On'
    } else {
        right_status = true;
        document.getElementById('right-street-light-status').src = 'img/bulb_on.png'
        document.getElementById('run-api-1').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v1=0'
        document.getElementById('right-street-light-btn').innerHTML = 'Turn Off'
    }
}
// document.getElementById('status').innerHTML = 'On';
// document.getElementById('switch').innerHTML = '<circle cx="150" cy="150" r="150"  fill="red" id="switch"></circle > ';
// document.getElementById('iframe').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v0=1';
// document.getElementById('diagram').src = 'circuit_on.png';
eml = window.prompt("Email ID")
setInterval(notify, 5000)
function notify() {
    request = new XMLHttpRequest();
    request.open('GET', 'https://blynk.cloud/external/api/get?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v5', false);
    request.send(null);
    carpark = request.responseText;
    if ((carpark != '') & (carpark != 'No Car Standing')) {
        firebase.auth().sendPasswordResetEmail(eml)
            .then(() => {
                document.getElementById('run-api-3').src = 'https://blynk.cloud/external/api/update?token=V7x28SbjavwU0O9dz32aNMgguwi9XHNw&v5=No Car Standing'
                alert("F-FAStag\n₹1500.00 deducted from your FAStag account: " + carpark + " for parking your vehicle in front of the XXX Hospital Gate.")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}
function notifyM() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var notification = new Notification("F-FAStag", { body: "₹1500.00 deducted from your FAStag account: MH 99 YZ 9999 for parking your vehicle in front of the XXX Hospital Gate.", icon: 'https://google.com' });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        });
    }
}

