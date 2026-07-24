import {getCookie} from "../util/cookieFunctions.mjs";
import {destroySession} from "../util/sessionFunctions.js";

const message = document.getElementById("message");

function loginPrompt (){
    if ((getCookie("login") !== String(true) || (getCookie("user") === "undefined"))){
        message.innerHTML = 'Failed to verify session.<br/> Please log in first.';
        destroySession();
    }
}

loginPrompt();