import {eatCookie, setCookie} from "../util/cookieFunctions.mjs";

export class dbComThread {  //database access object and associated methods
    constructor(name) { //make sure all index orders agree - PHP, SQL and C++ too
        switch (name) {
            case "elevatorNetwork":
                this.index = null;
                this.date = null;           //not yet defined
                this.time = null;           //not yet defined
                this.currentFloor = null;
                this.floorRequest1 = null;
                this.floorRequest2 = null;
                this.floorRequest3 = null;
                this.carRequestFloor1 = null;
                this.carRequestFloor2 = null;
                this.carRequestFloor3 = null;
                this.doors = "closed";
                this.table = name;
                break;
            case "guiRequests":
                this.date = null;           //not yet defined
                this.time = null;           //not yet defined
                this.floor = null;
                this.remote = 0;
                this.table = name;
                break;
            case "accessAttempts":
                this.index = null;
                this.date = null;           //not yet defined
                this.time = null;           //not yet defined
                this.user = null;
                this.authorization = null;
                this.authentication = null;
                this.table = name;
                break;
            case "loginRegistry":
                this.index = null;
                this.username = null;
                this.password = null;
                this.authorization = false;
                this.accepted = false;
                this.table = name;
                break;
            default:
                break;
        }

        return this;                //return the database access object.
    }

    scan(index) {    //database is an entire object, not a string. commit makes changes if true
        let queryObject = new dbComThread();   //copy this database access object to a blank dummy object
        if (index) {queryObject.index = index;              //if an index was supplied, scan a particular index if passed
        } else {queryObject.index = null;}                  //if no index was supplied, scan the most recent entry
        queryObject = this.receiveData(queryObject);        //fetch data from the database according to the query object's index
        return queryObject;
    }

    modify(db, index, edit){    //function to edit one element of the database
        let editObject = dbComThread;   //instantiate an editor object
        editObject.index = index;       //choose the index to edit
        //FINISH WRITING FUNCTION
    }

    sendData(payload, table) { //function to send data into the database
        let timestamp = new Date(); //generate time object
        payload.date = timestamp.getFullYear().toString() + "/" + timestamp.getDate().toString() + "/" + timestamp.getDay().toString(); //generate date
        payload.time = timestamp.getHours().toString() + "/" + timestamp.getMinutes().toString() + "/" + timestamp.getSeconds().toString(); //generate timestamp
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            if (xhr.status === 200) {console.log("Send Successed");}    //You bet your ass it worked, Marty!
            else { console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;}
            xhr.send(JSON.stringify({
                action: "write",
                table: table,
                data: payload}));} //put it in a JSON string and send the line to the database
    }

    receiveData() { //function to retrieve data from the base
        const xhr = new XMLHttpRequest();   //lettuce do an XHR
        xhr.open("POST", "../../php/databaseHandler.php", true); //ground control to php database reader
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {  //so this is how it's gonna go when it loads
            if (xhr.status === 200) {   //It works! I finally built something that works!!
                const packet = xhr.responseText;    //capture the data package
                if (packet !== (String(false)) || 'undefined') {    //AND THERE IS EVEN STUFF IN THE PACKET
                    let data = JSON.parse(packet, (key, value) => { //parse it!
                        (Array.isArray(value) && value.every(Array.isArray)) ? new Map(value) : value = null;});    //if it's an array of arrays (typical Jason move)
                    for (let i = 0; i < this.indices.length - 1; i++) { //iterate through however many indices there are in the database
                        this.indices[i] = data[i];}}  //and assign the data to this database access object, at the same index
                else {    //error handling
                    console.error("Error Status: " + xhr.status);
                    console.error("Error Message: " + xhr.statusText);
                    return false;}}
            else {    //even more error handling
                console.error("Error validating session. Error: ", xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;}
        }
        xhr.send(JSON.stringify({
            action: "read",
            table: this.table,})); //send the request
        return this;    //It works! I finally built something that works!!
    }
}