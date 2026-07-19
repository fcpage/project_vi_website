import {dbComThread} from "./guiData.js";

let doortal;
let leftDoor;
let rightDoor;
let doorState = false;
document.addEventListener("DOMContentLoaded", () => {
    doortal = (document.getElementById("doorMechanic").contentWindow || //doortal: door-portal
        document.getElementById("doorMechanic").contentDocument);
    doortal.addEventListener("DOMContentLoaded", () => {
        leftDoor = doortal.document.getElementById("leftDoor");
        rightDoor = doortal.document.getElementById('rightDoor');})
    doortal.addEventListener("click", () => {
        if (leftDoor.classList.contains("closed")) {
            leftDoor.classList.toggle("closed");
            rightDoor.classList.toggle("closed");
            leftDoor.classList.toggle("open");
            rightDoor.classList.toggle("open");
            console.log(leftDoor.classList);
        } else if (leftDoor.classList.contains("open")) {
            leftDoor.classList.toggle("open");
            rightDoor.classList.toggle("open");
            leftDoor.classList.toggle("closed");
            rightDoor.classList.toggle("closed");
            console.log(leftDoor.classList);
        }})
})

const prefix = "../../resources/references/imgs/gui/";    //base relative url prefix
const lit = "lit.png";  //illuminated suffix
const unlit = "unlit.png";  //de-luminated suffix
const elementNames = ['REQUEST', 'CURRENT', 'PREVIOUS', 'DIRECTION', 'DOORS', 'CF3', 'CF2', 'CF1', 'F3D', 'F2U', 'F2D', 'F1U']; //all the names
const elementIDs = ['REQUEST', 'CURRENT', 'PREVIOUS', 'DIRECTION', 'DOORS', '3', '2', '1', 'down', 'up', 'down', 'up']; //all the IDs
let elements = [];  //a place to hang my hat

class guiElement {  //a class to keep all the elements consistent, and a method to modify their contents
    constructor(name) { //build an object
        this.name = name;   //name it
    }

    modify(element, name) {
        if (!name) {    //there should be a name
            console.log('error');   //something is wrong
        } else if (name.length < 5) { //if the id is not a status field
            if (element.state === false) {
                element.handle.src = prefix + element.id + lit;     //off->on
            } else {
                element.handle.src = prefix + element.id + unlit;   //on->off
            } element.state = !element.state; //toggle
        } else {
            element.id = element.handle.innerHTML = element.id;    //set gui status text - id is used for status text if not a car or floor element
        } console.log("Name: " + element.name + " - ID: " + element.id + " - Status: " + element.state);    //report
    }
}

function initElements() {console.log("GUI initializing"); //start report     //initialize all the elements
    for (let i = 0; i < elementNames.length; i++) { //for each element
        elements[i] = new guiElement(elementNames[i]); //create and name
        elements[i].state = false;  //initialize off
        elements[i].id = elementIDs[i]; //ID, please
        elements[i].handle = document.getElementById(elementNames[i]);  //that's where I left my keys
        elements[i].handle.addEventListener('click', () => {elements[i].modify(elements[i], elements[i].name)});    //add a click listener
    } console.log("Initialization complete");    //end report
    return elements;
}

function doors() {  //function to check the door states in the db and to change gui door states
   if (doorState === true) {
       leftDoor.class = "doors open";
       rightDoor.class = "doors open";
       db.doors = "open";
   } else if (doorState === false) {
       leftDoor.class = "doors closed";
       rightDoor.class = "doors closed";
       db.doors = "closed";
   }

   lastDoorState = doorState;
   if (db.doors === "closed") {        //are the doors supposed to be closed?
       doorState = false;              //close the doors or keep them shut
   } else if (db.doors === "open") {   //are the doors supposed to be open?
       doorState = true;               //open the doors or keep them shut
   }

   if (doorState !== lastDoorState) {
       if (doorState === true) {
           leftDoor.class = "doors open";
           rightDoor.class = "doors open";
           db.doors = "open";
       } else if (doorState === false) {
           leftDoor.class = "doors closed";
           rightDoor.class = "doors closed";
           db.doors = "closed";
       }
       db.modify(db, db.index);
   }
}

let db = new dbComThread;
db.init();
elements = initElements();
let lastDoorState = db.doors;