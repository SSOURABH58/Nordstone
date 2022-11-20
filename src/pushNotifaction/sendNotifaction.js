
export const sendPushNotification = async (registrationToken) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAAHy8xf3E:APA91bFQcYo1x8tzqnR8etmmP-XSjSs1hIpRw0r5j1274AbMwQnvQbf1gPNtLvDji56IyYrsSAPltPKgZNXe5EqHdYHrDYQCcXcb0UGht-X93hYqkxp37xn9CjnqfcNeP0FCj7paS8fW");

    var raw = JSON.stringify({
        "priority": "HIGH",
        "data": {},
        "notification": {
            "body": "its a notification",
            "title": "Notification arrived",
            "vibrate": 1,
            "sound": 1,
            "show_in_foreground": true
        },
        "to": registrationToken
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const delayedNotifications = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "token": token
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://nordstone-task.herokuapp.com/notify", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}