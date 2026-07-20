import {dbComThread} from "./guiData.js";
import {ele, initElements} from "./guiDisplay.js";

//initialization
let elements = initElements();           //initialize the gui elements
let queueLength = 10;                //how far back do we go?
let db = new dbComThread;       //instantiate a database access object
let edit = new dbComThread;     //AND ANOTHER ONE
db.init();                                   //initialize the database connection

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

function doorLogger() {
    edit.doors = elements[ele['LEFT']].classList.value; //record the door state in the database access object
    edit.modify(edit, edit.index, edit.doors);          //change it in the database
    console.log("Door State: " + edit.doors);           //report on the console
}

function doorChecker() {

}