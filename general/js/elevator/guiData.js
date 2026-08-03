export class dbComThread {  //database access object and associated methods
    constructor(name) { //make sure all index orders agree - PHP, SQL and C++ too
        switch (name) { //variable constructor depending on which table is selected
            case "elevatorNetwork":
                this.index = null;
                this.date = null;
                this.time = null;
                this.currentFloor = null;
                this.floorRequest1 = null;
                this.floorRequest2 = null;
                this.floorRequest3 = null;
                this.carRequestFloor1 = null;
                this.carRequestFloor2 = null;
                this.carRequestFloor3 = null;
                this.doors = "closed";          //default
                this.table = name;              //default
                break;
            case "guiRequests":
                this.date = null;
                this.time = null;
                this.floor = null;
                this.remote = 0;    //default
                this.table = name;  //default
                break;
            case "accessAttempts":
                this.index = null;
                this.date = null;
                this.time = null;
                this.user = null;
                this.authorization = null;
                this.authentication = null;
                this.table = name;              //default
                break;
            case "loginRegistry":
                this.index = null;
                this.username = null;
                this.password = null;
                this.authorization = false; //default
                this.accepted = false;      //default
                this.table = name;          //default
                break;
            default:
                break;
        }

        return this;                //return the database access object.
    }

    init(name) {    //function to initialize the database
        fetch("../../php/elevator/dbInit.php", {    //poke the php initializer
            method: "POST", //post-it note
            body: JSON.stringify({name: name})})
        .then(response => {
            if (!response.ok) { //error checking
                console.error("Error Status: " + response.status);
                console.error("Error Message: " + response.statusText);
            } else {    //if all good
                console.log("Database loaded");}})
        .catch(error => {console.error("Error:", error)});   //more error checking
    }

    mostRecentIndex() { //fetch the most recent index
        fetch("../../php/elevator/mostRecentIndex.php", {   //poke the php counterpart
            method: "POST", //use snail mail
            body: JSON.stringify(this)})    //send this database access object to the php
        .then(response => {
            if (!response.ok) { //error checking
                console.error("Error Status: " + response.status);
                console.error("Error Message: " + response.statusText);
            } else {    //if all good
                console.log("Send Successed");}}) //mmmmmm sushi
        .then(data => { //do something with the data that the php sent back
            console.log("Success:", data);  //report to the console
            this.index = Number(data);})    //make sure that the data is a number, then store it in the index field of this database access object
        .catch(error => {console.error("Error:", error)});  //more error checking
        return this.index;  //return the index
    }

    nextIndex() {   //function to generate a new index
        return Number(this.mostRecentIndex()) + 1;  //get the most recent index, add one, make sure it's a number, and return the index
    }

    priorIndex(n) {   //function to generate a new index
        return Number(this.mostRecentIndex()) - n;  //get the most recent index, add one, make sure it's a number, and return the index
    }

    scan(index) {    //database is an entire object, not a string. commit makes changes if true
        let queryObject = new dbComThread(); //copy this database access object to a blank dummy object
        
        if (index) {    //if an index was supplied
            queryObject.index = index;  //scan a particular index if passed
        } else {        //if no index was supplied
            queryObject.index = this.mostRecentIndex(); //else scan the most recent entry
        }

        queryObject = this.receiveData(queryObject);        //fetch data from the database according to the query object's index
        return queryObject;
    }

    modify(db, index, edit){    //function to edit one element of the database
        let editObject = dbComThread;   //instantiate an editor object
        editObject.index = index;       //choose the index to edit
        //FINISH WRITING FUNCTION
    }

    sendData(payload) { //function to send data into the database
        let timestamp = new Date(); //generate time object
        payload.date = timestamp.getFullYear().toString() + "/" + timestamp.getDate().toString() + "/" + timestamp.getDay().toString(); //generate date
        payload.time = timestamp.getHours().toString() + "/" + timestamp.getMinutes().toString() + "/" + timestamp.getSeconds().toString(); //generate timestamp
        fetch("../../php/elevator/dbIn.php", {  //send the line to the database
            method: "POST", //using post
            body: JSON.stringify(payload)})   //and put it in a JSON string
            .then(response => { //response
                if (!response.ok) { //error handling
                    console.error("Error Status: " + response.status);
                    console.error("Error Message: " + response.statusText);
                } else {    //You bet your ass it worked, Marty!
                    console.log("Send Successed");}})
            .catch(error => {   //more error handling
                console.error("Error:", error)});
    }

    receiveData(database) { //function to retrieve data from the base
        if (database) {    //if a particular database access object was supplied, do nothing, use that object
        } else {        //if no database access object was supplied
            database = this; //use this database access object
        }

        const xhr = new XMLHttpRequest();   //lettuce do an XHR this time
        xhr.open("POST", "../../php/elevator/dbOut.php", true); //ground control to php database reader
        xhr.onload = function () {  //so this is how it's gonna go when it loads
            if (xhr.status === 200) {   //It works! I finally built something that works!!
                const packet = xhr.responseText;    //capture the data package
                if (packet !== (String(false)) || 'undefined') {    //AND THERE IS EVEN STUFF IN THE PACKET
                    let data = JSON.parse(packet, (key, value) => { //parse it!
                        (Array.isArray(value) && value.every(Array.isArray)) ? new Map(value) : value = null;});    //if it's an array of arrays (typical Jason move)
                    for (let i = 0; i < database.indices.length; i++) { //iterate through however many indices there are in the database
                        this.indices[i] = data[i];  //and assign the data to this database access object, at the same index
                    }
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
        xhr.send(); //send the request
        return database;    //It works! I finally built something that works!!
    }
}