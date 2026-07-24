import {dbComThread} from "./guiData.js";
import {ele, initElements} from "./guiDisplay.js";

//initialization
let elements = initElements();           //initialize the gui elements
let queueLength = 10;                //how far back do we go?
let doors = new dbComThread();  //instantiate a database access object
let calls = new dbComThread();     //AND ANOTHER ONE
//doors.init('doors');                                   //initialize the database connection
//doors.init('calls');                                   //initialize the database connection
//setTimeout(doorMonitor, 1000);

/*while(1) {  //the database monitor loop

    let queryObj = db.scan(db.mostRecentIndex());  //check the most recent row of the database
    edit = queryObj;
    if (db !== queryObj) {      //if the db is not up to date with the most recent row
        db = queryObj;          //update db
    }

    for (let i= 0; i < queueLength; i++) {
        let query = db.scan(db.priorIndex(i));      //check one line of the database

        if (db !== query) {
            edit.currentFloor = query.currentFloor;       //pass the db current floor to this object
            edit.previousFloor = query.previousFloor;     //pass the db previous floor to this object
            edit.requestFloor = query.requestFloor;       //pass the db request floor to this object
            edit.doors = query.doors;                     //pass the db door status to this object
            break
        }
    }
}*/

function doorMonitor (){

}

function doorLogger() {
    //doorLogger
    edit.doors = elements[ele['LEFT']].classList.value; //record the door state in the database access object
    edit.modify(edit, edit.index, edit.doors);          //change it in the database
    console.log("Door State: " + edit.doors);           //report on the console

    //door
}