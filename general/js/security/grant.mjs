import {startSession, getGrants} from "../util/sessionFunctions.js";
import {dbComThread} from "../elevator/guiData.js"
import {getCookie} from "../util/cookieFunctions.mjs";

const grantTemplate = document.getElementById("grant-template");
const template = grantTemplate.content;

let dbRegister = new dbComThread('loginRegistry');
let dbUpdate = new dbComThread('AccessRequests');
let requestsRAW = null;
let requests = null;
let numWait = 0;
let grants = [];
let pleas = [];

await startSession();
await initGrants();
await showGrants();

async function showGrants() {

    for (let i = 0; i < numWait; i++) {
        grants[i] = template.cloneNode(true);
        grants[i].querySelector('.index').innerHTML = pleas[i].index;
        grants[i].querySelector('.date').innerHTML = pleas[i].date;
        grants[i].querySelector('.time').innerHTML = pleas[i].time;
        grants[i].querySelector('.firstname').innerHTML = pleas[i].firstname;
        grants[i].querySelector('.lastname').innerHTML = pleas[i].lastname;
        grants[i].querySelector('.email').innerHTML = pleas[i].email;
        grants[i].querySelector('.person').innerHTML = pleas[i].person;
        grants[i].querySelector('.involvement').innerHTML = pleas[i].involvement;
        grants[i].querySelector('.reason').innerHTML = pleas[i].reason;
        grants[i].querySelector('.details').innerHTML = pleas[i].details;
        grants[i].querySelector('.good_job').innerHTML = pleas[i].good_job;

        grants[i].querySelector('.accept').addEventListener('click', () => {
            let username = pleas[i].firstname + "_" + pleas[i].lastname;
            let auth = "run";
            if (pleas[i].person.includes("student")) {auth = "dev";
            } else if (pleas[i].person.includes("Faculty")) {auth = "prof";
            } else {auth = "admin";}
            dbRegister.register(username, auth);
            dbUpdate.modify(pleas[i].index, 'granted', 1);
            console.log("accepted");
        });

        grants[i].querySelector('.reject').addEventListener('click', () => {
            dbUpdate.delete(pleas[i].index);
            console.log("rejected");
        });

        document.getElementById('grant' + i).appendChild(grants[i]);
    }
}

async function initGrants () {
    await getGrants();
    requestsRAW = JSON.parse(getCookie('toGrant'));
    numWait = requestsRAW[0];
    requests = requestsRAW[1];

    for (let i = 0; i < numWait; i++) {
        pleas[i] = requests[i];
        console.log(pleas[i]);
    }
}


