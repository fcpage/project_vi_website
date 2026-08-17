import {dbComThread} from "./guiData.js";
import {startSession} from "../util/sessionFunctions.js";

const diagnosticTemplate = document.getElementById("diagnosticTemplate");
const template = diagnosticTemplate.content;

let dbStates = new dbComThread('stateHistory');
let dbLogins = new dbComThread('accessAttempts');
let history = [];

await startSession();
await showHistory();

async function showHistory() {
    let row = [];
    for (let i = 0; i < 10; i++) {
        row[i] = template.cloneNode(true);
        row[i].querySelector('.ind').innerHTML = history[i].index;
        row[i].querySelector('.date').innerHTML = history[i].date;
        row[i].querySelector('.time').innerHTML = history[i].time;
        row[i].querySelector('.currentFloor').innerHTML = history[i].currentFloor;
        row[i].querySelector('.floorRequest1').innerHTML = history[i].floorRequest1;
        row[i].querySelector('.floorRequest2').innerHTML = history[i].floorRequest2;
        row[i].querySelector('.floorRequest3').innerHTML = history[i].floorRequest3;
        row[i].querySelector('.doors').innerHTML = history[i].doors;
        row[i].querySelector('.remote').innerHTML = history[i].remote;
        document.getElementById('grant' + i).appendChild(row[i]);
    }
}

async function initHistory () {
    const lim = await dbStates.receiveData(-1);
    for (let i = 0; i < lim.index; i++) {
       history[i] = dbStates.receiveData(i);
    }
}


