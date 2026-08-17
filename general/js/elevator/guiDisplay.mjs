import {eatCookie, getCookie, setCookie} from "../util/cookieFunctions.mjs";
import {dbComThread} from "./guiData.js";

let range = 11;
if (getCookie("username") === "Maintenance") {range = 13;}

const user = getCookie("user");
const prefix = "../../resources/imgs/gui/";    //base relative url prefix
const lit = "lit.png";  //illuminated suffix
const unlit = "unlit.png";  //de-luminated suffix

const elementNames = [ //all the names
    'CF3', 'CF2', 'CF1', 'F3D', 'F2U', 'F2D', 'F1U',
    'DATE', 'TIME', 'CURRENT', 'REQUESTS', 'DOORS',
    'OVERRIDE', 'SABBATH'];

const elementIDs = [//all the IDs
    '3', '2', '1', 'down', 'up', 'down', 'up',
    'DATE', 'TIME', 'CURRENT', 'REQUESTS',  'DOORS',
    user, user];

const display = ['DATE', 'TIME', 'REQUESTS', 'DOORS'];

export const ele = Object.freeze({  //some other tags for easy access
    CF3: 0, CF2: 1, CF1: 2, F3D: 3, F2U: 4, F2D: 5, F1U: 6,
    DATE: 7, TIME: 8, CURRENT: 9, REQUESTS: 10, DOORS: 11,
    OVERRIDE: 12, SABBATH: 13,
    DOORTAL: 14, LEFT: 15, RIGHT: 16
});

console.log("Initializing GUI"); //start report
let elements = [];  //a place to hang my hat
let dbRequest = new dbComThread('guiRequests');                    //Establish a com thread to send requests
let dbListen = new dbComThread('elevatorNetwork');          //Establish a com thread to listen to the elevator
let dbLog = new dbComThread('stateHistory');
await dbListen.receiveData();
await initElements();
dbLog.log();

class guiElement {  //a class to keep all the elements consistent, and a method to modify their contents
    constructor() { //build an object
    }
}

export async function initElements() {   //initialize all the elements
    //setInterval(refresh, 1500); //poll the monitor thread every 1.5 seconds
    //setInterval(dbLog.log, 1000); //poll the monitor thread every second
    await refresh;
    document.addEventListener("DOMContentLoaded", () => {   //wait for the HTML to load
        for (let i = 0; i < range; i++) {                 //for each element
            elements[i] = new guiElement();                     //create it
            elements[i].name = elementNames[i];                 //name it
            elements[i].id = elementIDs[i];                     //ID, please
            elements[i].handle = document.getElementById(elementNames[i]);      //thaaaat's where I left my keys

            for (let j = 1; j <= 3; j++) {
                if (elements[i].name.includes(String(j))) { //buttons
                    elements[i].call = String(j);
                    elements[i].state = false;                          //initialize off
                    elements[i].cookie = false;
                    setCookie(elements[i].name, elements[i].cookie);
                    elements[i].handle.addEventListener('click', () => {   //add a click listener
                        if (!elements[i].state && (getCookie('CURRENT') !== elements[i].call)) {
                            elements[i].state = true;
                            setCookie("FLOOR" + elements[i].call, true);
                            elements[i] = modify(elements[i], elements[i].name, elements[i].state, elements[i].id);
                            dbRequest.sendData(elements[i].call);    //db interaction works
                            refresh();
                        } else if (getCookie('CURRENT') === elements[i].call) {
                            elements[i].state = false;
                            setCookie("FLOOR" + elements[i].call, false);
                            elements[i] = modify(elements[i], elements[i].name, elements[i].state, elements[i].id);
                            refresh();
                        }
                    });
                }
            }

            if (elements[i].name.length >= 4) {
                switch (elements[i].name) {
                    case "DATE":
                        elements[i].id = getCookie('DATE');
                        break;
                    case "TIME":
                        elements[i].id = getCookie('TIME');
                        break;
                    case "CURRENT":
                        elements[i].id = getCookie('CURRENT');
                        break;
                    case "REQUESTS":
                        elements[i].id = getCookie('REQUESTS');
                        break;
                    default:
                        break;

                }

                modify(elements[i], elements[i].name, elements[i].state, elements[i].id);
                elements[i].handle.addEventListener('click', () => {   //add a click listener
                    refresh();
                    //modify(elements[i], elements[i].name, null, elements[i].id);
                });
            }
        }
    });

    document.addEventListener("DOMContentLoaded", () => {   //wait for the HTML to load
        if (user === "Maintenance") { //maintenance toggles
            elements[ele['OVERRIDE']].handle.addEventListener('click', () => {   //add a click listener
                modify(elements[ele['OVERRIDE']], elements[ele['OVERRIDE']].name, elements[ele['OVERRIDE']].state, elements[ele['OVERRIDE']].id);
                setCookie("OVERRIDE", elements[ele['OVERRIDE']].state);
                console.log("Override cookie: " + getCookie("OVERRIDE"));
            });

            elements[ele['SABBATH']].handle.addEventListener('click', () => {   //add a click listener
                modify(elements[ele['SABBATH']], elements[ele['SABBATH']].name, elements[ele['SABBATH']].state, elements[ele['SABBATH']].id);
                setCookie("SABBATH", elements[ele['SABBATH']].state);
                console.log("Override cookie: " + getCookie('SABBATH'));
            });
        }
    });

    document.addEventListener("DOMContentLoaded", () => {   //wait for the HTML to load
        elements[ele['DOORTAL']] = (document.getElementById("doorMechanic").contentWindow || //doortal: door-portal
            document.getElementById("doorMechanic").contentDocument);   //get the iframe element
        elements[ele['DOORTAL']].addEventListener("DOMContentLoaded", () => {    //wait for the page inside the iframe to load
            elements[ele['LEFT']] = elements[ele['DOORTAL']].document.getElementById('LEFT');       //get the left door element
            elements[ele['RIGHT']] = elements[ele['DOORTAL']].document.getElementById('RIGHT');     //get the right door element
            elements[ele['DOORTAL']].addEventListener("click", () => {     //function to check the door states in the db and to change gui door states
                refresh();
            });setCookie('doors', "open");    //set an inter-script cookie
        });
    });
    console.log(elements);
    console.log("GUI Initialized"); //start report
    return elements;    //return the elements array to the outer scope
}

function modify(element, name, state, id) { //function to change the state of a butt
    if (/\d/.test(name)) { //if the id is not a status field
        if (state) { setCookie(element.name, true);
            element.handle.src = prefix + element.id + lit;}         //off->on
        else { eatCookie(element.name);
            element.handle.src = prefix + element.id + unlit;}   //on->off
    } else {
        if (name === ("OVERRIDE" || "SABBATH")){
            if (element.state) {element.id = "ACTIVE";}
            else {element.id = "INACTIVE";}
        } else {
            elements[ele[name]].handle.innerHTML = id; //set gui status text - id is used for status text if not a car or FLOOR element
        }
    } return element;
}

async function refresh() {
    await dbListen.receiveData();
    elements[ele['DATE']] = modify(elements[ele['DATE']], 'DATE', null, getCookie("DATE"));
    elements[ele['TIME']] = modify(elements[ele['TIME']], 'TIME', null, getCookie("TIME"));
    elements[ele['CURRENT']] = modify(elements[ele['CURRENT']], 'CURRENT', null, getCookie("CURRENT"));
    elements[ele['REQUESTS']] = modify(elements[ele['REQUESTS']], 'REQUESTS', null, getCookie("REQUESTS"));

    if (getCookie("CURRENT") === '1') {
        elements[ele['CF1']] = modify(elements[ele['CF1']], 'CF1', false, elements[ele['CF1']].id);
        elements[ele['F1U']] = modify(elements[ele['F1U']], 'F1U', false, elements[ele['F1U']].id);
        eatCookie("FLOOR1");
    } if (getCookie("CURRENT") === '2') {
        elements[ele['CF2']] = modify(elements[ele['CF2']], 'CF2', false, elements[ele['CF2']].id);
        elements[ele['F2U']] = modify(elements[ele['F2U']], 'F2U', false, elements[ele['F2U']].id);
        elements[ele['F2D']] = modify(elements[ele['F2D']], 'F2D', false, elements[ele['F2D']].id);
        eatCookie("FLOOR2");
    } if (getCookie("CURRENT") === '3') {
        elements[ele['CF3']] = modify(elements[ele['CF3']], 'CF3', false, elements[ele['CF3']].id);
        elements[ele['F3D']] = modify(elements[ele['F3D']], 'F3D', false, elements[ele['F3D']].id);
        eatCookie("FLOOR3");
    }

    if (getCookie("FLOOR1")) {
        elements[ele['CF1']] = modify(elements[ele['CF1']], 'CF1', true, elements[ele['CF1']].id);
        elements[ele['F1U']] = modify(elements[ele['F1U']], 'F1U', true, elements[ele['F1U']].id);
        eatCookie("FLOOR1");
    } if (getCookie("FLOOR2")) {
        elements[ele['CF2']] = modify(elements[ele['CF2']], 'CF2', true, elements[ele['CF2']].id);
        elements[ele['F2U']] = modify(elements[ele['F2U']], 'F2U', true, elements[ele['F2U']].id);
        elements[ele['F2D']] = modify(elements[ele['F2D']], 'F2D', true, elements[ele['F2D']].id);
        eatCookie("FLOOR2");
    } if (getCookie("FLOOR3")) {
        elements[ele['CF3']] = modify(elements[ele['CF3']], 'CF3', true, elements[ele['CF3']].id);
        elements[ele['F3D']] = modify(elements[ele['F3D']], 'F3D', true, elements[ele['F3D']].id);
        eatCookie("FLOOR3");
    }

    dbLog.log();
    await slideDoors();
}

async function slideDoors() {
    if(getCookie('DOORS') === "open"/*!elements[ele['LEFT']].classList.contains("open")*/) {
        elements[ele['LEFT']].classList.add("open");
        elements[ele['RIGHT']].classList.add("open");
        elements[ele['LEFT']].classList.remove("closed");
        elements[ele['RIGHT']].classList.remove("closed");
    } else if(getCookie('DOORS') === "closed" /*!elements[ele['LEFT']].classList.contains("closed")*/) {
        elements[ele['LEFT']].classList.add("closed");
        elements[ele['RIGHT']].classList.add("closed");
        elements[ele['LEFT']].classList.remove("open");
        elements[ele['RIGHT']].classList.remove("open");
    } console.log("DOORS: " + getCookie("DOORS"));
}