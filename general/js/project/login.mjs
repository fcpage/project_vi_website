import {getCookie} from "./cookieFunctions.js";
import {destroySession} from "./sessionFunctions.js";

const message = document.getElementById("message");

function loginPrompt (){
    if (getCookie("login") !== String(true)){
        message.innerHTML = 'Failed to verify session.<br/> Please log in first.';
        destroySession();
        return false;
    }
    return true;
}

loginPrompt();