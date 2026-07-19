export class dbComThread {
    constructor() { //make sure orders in each file all agree - db and C++ too
        this.index = null;
        this.date = null;
        this.time = null;
        this.sender = 0x1000;
        this.receiver = 0x100;
        this.currentFloor = null;
        this.previousFloor = null;
        this.requestFloor = null;
        this.queued = 1;
        this.served = 0;
        this.doors = 0;
        return this;
    }

    init() {
        fetch("../../php/elevator/dbInit.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"}})
        .then(response => {
            if (!response.ok) {
                console.error("Error Status: " + response.status);
                console.error("Error Message: " + response.statusText);
                return false;
            } else {
                console.log("Database loaded");}})
        .catch(error => {
            console.error("Error:", error)
            return false;});
    }

    mostRecentIndex() {
        fetch("../../php/elevator/mostRecentIndex.php", {
            method: "POST",
            body: JSON.stringify(this)})
        .then(response => {
            if (!response.ok) {
                console.error("Error Status: " + response.status);
                console.error("Error Message: " + response.statusText);
                return false;
            } else {
                console.log("Send Successed");}})
        .then(data => {
            console.log("Success:", data);
            this.index = Number(data);})
        .catch(error => {
            console.error("Error:", error)
            return false;});
        return this.index;
    }

    nextIndex() {
        return Number(this.mostRecentIndex()) + 1;
    }

    scan(index) {    //database is an entire object, not a string. commit makes changes if true
        let queryObject = this;

        if (index) {
            queryObject.index = index;  //scan a particular index if passed
        } else {
            queryObject.index = this.mostRecentIndex(); //else scan the most recent entry
        }

        queryObject = this.receiveData(queryObject);
        this.currentFloor = queryObject.currentFloor;
        this.previousFloor = queryObject.previousFloor;
        this.requestFloor = queryObject.requestFloor;
        this.doors = queryObject.doors;
    }

    modify(index){
        let editObject = dbComThread;
        editObject.index = index;

    }

    sendData(payload) {
        let timestamp = new Date();
        payload.date = timestamp.getFullYear().toString() + "/" + timestamp.getDate().toString() + "/" + timestamp.getDay().toString();
        payload.time = timestamp.getHours().toString() + "/" + timestamp.getMinutes().toString() + "/" + timestamp.getSeconds().toString();
        fetch("../../php/elevator/dbIn.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    console.error("Error Status: " + response.status);
                    console.error("Error Message: " + response.statusText);
                    return false;
                } else {
                    console.log("Send Successed");
                }
            })
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => {
                console.error("Error:", error)
                return false;
            });
    }

    receiveData(database) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/elevator/dbOut.php", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const packet = xhr.responseText;
                if (packet !== (String(false)) || 'undefined') {
                    let data = JSON.parse(packet, (key, value) => {
                        (Array.isArray(value) && value.every(Array.isArray)) ? new Map(value) : value = null;});
                    for (let i = 0; i < database.indices.length; i++) {
                        this.indices[i] = data[i];
                    }
                } else {
                    console.error("Error Status: " + xhr.status);
                    console.error("Error Message: " + xhr.statusText);
                    return false;
                }
            } else {
                console.error("Error validating session. Error: ", xhr.status);
                return false;
            }
        }
        xhr.send();
        return database;
    }
}