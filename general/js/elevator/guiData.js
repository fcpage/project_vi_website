import {eatCookie, getCookie, setCookie} from "../util/cookieFunctions.mjs";

export class dbComThread {  //database access object and associated methods
    constructor(name) { //make sure all index orders agree - PHP, SQL and C++ too
        this.name = name;
        switch (name) {
            case 'elevatorNetwork':
                this.name = name;
                this.table = "elevatorNetwork";             //default
                break;
            case 'guiRequests':
                this.name = name;
                this.remote = 0;    //default
                this.table = "guiRequests";  //default
                break;
            case 'stateHistory':
                this.name = name;
                this.table = "stateHistory";             //default
                break;
            default:
                break;
        }

        return this;                //return the database access object.
    }

    scan(index = 0, limit = 1) {    //database is an entire object, not a string. commit makes changes if true
        this.index = index;              //if an index was supplied, scan a particular index
        this.limit = limit;              //if a limit was supplied, scan back a particular number of rows
        return this.receiveData(index);  //fetch data from the database according to the query object's index
    }

    modify(index, target, data) {    //function to edit one element of the database
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Entry modified.");
            }    //You bet your ass it worked, Marty!
            else {
                console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;
            }
            xhr.send(JSON.stringify([
                ["action", "modify"],
                ["table", this.table],
                ["index", index],
                ["target", target],
                ["data", data]
            ]));
        } //put it in a JSON string and send the line to the database
    }

    delete(index) {    //function to delete one row of the database
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Row deleted.");
            }    //You bet your ass it worked, Marty!
            else {
                console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;
            }
            xhr.send(JSON.stringify({
                action: "delete",
                table: this.table,
                index: index,
            }));
        } //put it in a JSON string and send the line to the database
    }

    sendData(floor) { //function to send data into the database
        let timestamp = new Date(); //generate time object
        this.date = timestamp.getFullYear().toString() + "-" + (timestamp.getMonth() + 1).toString() + "-" + timestamp.getDate().toString(); //generate date
        this.time = timestamp.getHours().toString() + ":" + timestamp.getMinutes().toString() + ":" + timestamp.getSeconds().toString(); //generate timestamp
        this.floor = floor;

        if (getCookie("username") === "Maintenance") {
            const mode = getCookie("mode");
            if (mode === "OVERRIDE") {
                this.remote = "2";
            } else if (mode === "SABBATH") {
                this.remote = "3";
            } else {
                this.remote = "1";
            }
        } else {
            this.remote = "0";
        }

        let payload = JSON.stringify({
            action: "write",
            table: this.table,
            date: this.date,
            time: this.time,
            floor: this.floor,
            remote: this.remote
        });

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/elevator/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Send Successed");   //You bet your ass it worked, Marty! SUSHI!!!!
                const packet = xhr.responseText;
                if (packet !== (String(false)) || 'undefined') {
                    console.log(xhr.responseText);
                }   //AND THERE IS EVEN STUFF IN THE PACKET
                else {    //error handling
                    console.error("Error Status: " + xhr.status);
                    console.error("Error Message: " + xhr.statusText);
                }
            } else {
                console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;
            }
        }
        xhr.send(payload);//put it in a JSON string and send the line to the database
    }

    async receiveData(index = 0, limit = 1) { //function to retrieve data from the base
        const xhr = new XMLHttpRequest();   //lettuce do an XHR
        xhr.open("POST", "../../php/elevator/databaseHandler.php", true); //ground control to php database reader
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {  //so this is how it's gonna go when it loads
            if (xhr.status === 200 && xhr.status < 300) {   //It works! I finally built something that works!!
                const packet = JSON.parse(xhr.responseText);    //capture the data package
                if (packet !== (String(false)) || 'undefined') {    //AND THERE IS EVEN STUFF IN THE PACKET
                    const snap = packet[0]; //and assign the data to this database access object, at the same index

                    setCookie("DATE", snap.date);
                    setCookie("TIME", snap.time);
                    setCookie("CURRENT", snap.currentFloor);
                    setCookie("FLOOR1", !!(snap.carRequestFloor1 || snap.floorRequest1));
                    setCookie("FLOOR2", !!(snap.carRequestFloor2 || snap.floorRequest2));
                    setCookie("FLOOR3", !!(snap.carRequestFloor3 || snap.floorRequest3));
                    setCookie("REQUESTS", [getCookie("FLOOR1"),
                        getCookie("FLOOR2"), getCookie("FLOOR3")]);
                    if (snap.doors === '1') {
                        setCookie("DOORS", "open");
                    } else {
                        setCookie("DOORS", "closed");
                    } return snap;

                } else {    //error handling
                    console.error("Error Status: " + xhr.status);
                    console.error("Error Message: " + xhr.statusText);
                    return false;
                }
            } else {    //even more error handling
                console.error("Error validating session. Error: ", xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;
            }
        }
        xhr.send(JSON.stringify({
            action: "read",
            table: this.table,
            index: index,
            limit: limit
        })); //send the request

        return this;    //It works! I finally built something that works!!
    }

    log() {
        if (getCookie("username") === "Maintenance") {
            const mode = getCookie("mode");
            if (mode === "OVERRIDE") { this.remote = "2";
            } else if (mode === "SABBATH") { this.remote = "3";
            } else {this.remote = "1";}
        } else {this.remote = "0";}

        let f = [];
        for (let i = 0; i < 3; i++) {
            if (getCookie("FLOOR" + (i +1)) === "true") {
                f[i] = 1;
            } else if (getCookie("FLOOR" + (i +1)) !== "true") {
                f[i] = 0;
            }
        }

        let payload = JSON.stringify({
            action: "write",
            table: "stateHistory",
            date: getCookie("DATE"),
            time: getCookie("TIME"),
            currentFloor: getCookie("CURRENT"),
            floorRequest1: f[0],
            floorRequest2: f[1],
            floorRequest3: f[2],
            doors: getCookie("DOORS"),
            remote: this.remote
        });

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/elevator/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("State Logged");   //You bet your ass it worked, Marty! SUSHI!!!!
                if (xhr.responseText !== (String(false)) || 'undefined') {
                    //console.log(xhr.responseText);
                }   //AND THERE IS EVEN STUFF IN THE PACKET
                else {    //error handling
                    console.error("Error Status: " + xhr.status);
                    console.error("Error Message: " + xhr.statusText);
                }
            } else {
                console.log("Don't worry, it's just a duplicate time entry -FP")
                console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;
            }
        }
        xhr.send(payload);//put it in a JSON string and send the line to the database
    }
    register(username, auth) {
        let payload = JSON.stringify({
            action: "write",
            table: "loginRegistry",
            username: username,
            password: "12345678",
            authorization: auth
        });

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/elevator/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("New user registered");   //You bet your ass it worked, Marty! SUSHI!!!!
                if (xhr.responseText !== (String(false)) || 'undefined') {
                    //console.log(xhr.responseText);
                }   //AND THERE IS EVEN STUFF IN THE PACKET
                else {    //error handling
                    console.error("Error Status: " + xhr.status);
                    console.error("Error Message: " + xhr.statusText);
                }
            } else {
                console.log("Don't worry, it's just a duplicate time entry -FP")
                console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;
            }
        }
        xhr.send(payload);//put it in a JSON string and send the line to the database
    }
}