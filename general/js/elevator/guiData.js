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

    scan(index = 0, limit = 1) {    //database is an entire object, not a string. commit makes changes if true
        this.index = index;              //if an index was supplied, scan a particular index
        this.limit = limit;              //if a limit was supplied, scan back a particular number of rows
        return this.receiveData(index);  //fetch data from the database according to the query object's index
    }

    modify(index, target, data){    //function to edit one element of the database
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/databaseHandler.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            if (xhr.status === 200) {console.log("Entry modified.");}    //You bet your ass it worked, Marty!
            else { console.error("Error Status: " + xhr.status);
                console.error("Error Message: " + xhr.statusText);
                return false;}
            xhr.send(JSON.stringify({
                action: "modify",
                table: this.table,
                index: index,
                target: target,
                data: data}));} //put it in a JSON string and send the line to the database
    }

    sendData() { //function to send data into the database
        let timestamp = new Date(); //generate time object
        this.date = timestamp.getFullYear().toString() + "/" + timestamp.getDate().toString() + "/" + timestamp.getDay().toString(); //generate date
        this.time = timestamp.getHours().toString() + "/" + timestamp.getMinutes().toString() + "/" + timestamp.getSeconds().toString(); //generate timestamp
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
                table: this.table,
                data: this}));} //put it in a JSON string and send the line to the database
    }

    receiveData(index = 0, limit = 1) { //function to retrieve data from the base
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
            table: this.table,
            index: index,
            limit: limit})); //send the request
        return this;    //It works! I finally built something that works!!
    }
}