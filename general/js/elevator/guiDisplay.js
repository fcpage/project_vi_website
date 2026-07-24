import {getCookie, setCookie} from "../util/cookieFunctions.mjs";

const prefix = "../../resources/references/imgs/gui/";    //base relative url prefix
const lit = "lit.png";  //illuminated suffix
const unlit = "unlit.png";  //de-luminated suffix
const elementNames = ['REQUEST', 'CURRENT', 'PREVIOUS', 'DIRECTION', 'DOORS', 'CF3', 'CF2', 'CF1', 'F3D', 'F2U', 'F2D', 'F1U']; //all the names
const elementIDs = ['REQUEST', 'CURRENT', 'PREVIOUS', 'DIRECTION', 'DOORS', '3', '2', '1', 'down', 'up', 'down', 'up']; //all the IDs
let elements = [];  //a place to hang my hat
export const ele = Object.freeze({
    REQUEST: 0,
    CURRENT: 1,
    PREVIOUS: 2,
    DIRECTION: 3,
    DOORS: 4,
    CF3: 5,
    CF2: 6,
    CF1: 7,
    F3D: 8,
    F2U: 9,
    F2D: 10,
    F1U: 11,
    DOORTAL: 12,
    LEFT: 13,
    RIGHT: 14
})

class guiElement {  //a class to keep all the elements consistent, and a method to modify their contents
    constructor(name) { //build an object
        this.name = name;   //name it
    }

    modify(element, name) { //function to change the state of a button or text element
        if (!name) {    //there should be a name
            console.log('error');   //something is wrong
        } else if (name.length < 5) { //if the id is not a status field
            if (element.state === false) {  //if off
                element.handle.src = prefix + element.id + lit;     //off->on
            } else {    //if on
                element.handle.src = prefix + element.id + unlit;   //on->off
            } element.state = !element.state; //toggle
        } else {    //if text field
            element.id = element.handle.innerHTML = element.id;    //set gui status text - id is used for status text if not a car or floor element
        } console.log("Name: " + element.name + " - ID: " + element.id + " - Status: " + element.state);    //report on console
    }
}

export function initElements() {   //initialize all the elements
    console.log("GUI initializing"); //start report

    //for the buttons and text
    for (let i = 0; i < elementNames.length; i++) { //for each element
        elements[i] = new guiElement(elementNames[i]);  //create and name
        elements[i].state = false;                      //initialize off
        elements[i].id = elementIDs[i];                 //ID, please
        elements[i].handle = document.getElementById(elementNames[i]);      //thaaaat's where I left my keys
        elements[i].handle.addEventListener('click', () => {   //add a click listener
            elements[i].modify(elements[i], elements[i].name);});
    }

    //for the elevator doors
    document.addEventListener("DOMContentLoaded", () => {   //wait for the iframe to load
        elements[ele['DOORTAL']] = (document.getElementById("doorMechanic").contentWindow || //doortal: door-portal
            document.getElementById("doorMechanic").contentDocument);   //get the iframe element
        elements[ele['DOORTAL']].addEventListener("DOMContentLoaded", () => {    //wait for the page inside the iframe to load
            elements[ele['LEFT']] = elements[ele['DOORTAL']].document.getElementById("leftDoor");     //get the left door element
            elements[ele['RIGHT']] = elements[ele['DOORTAL']].document.getElementById('rightDoor');}) //get the right door element
        elements[ele['DOORTAL']].addEventListener("click", () => {     //function to check the door states in the db and to change gui door states
            elements[ele['LEFT']].classList.toggle("closed");    //toggle left door closed
            elements[ele['LEFT']].classList.toggle("open");      //toggle left door open
            elements[ele['RIGHT']].classList.toggle("closed");   //toggle right door closed
            elements[ele['RIGHT']].classList.toggle("open");     //toggle right door open
            setCookie('doors', elements[ele['LEFT']].classList.value);    //set an inter-script cookie
            console.log("Door Cookie: " + getCookie('doors'));})})

    console.log("Initialization complete");    //report on console
    return elements;    //return the elements array to the outer scope
}