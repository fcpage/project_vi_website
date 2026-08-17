import {getCookie} from "../util/cookieFunctions.mjs";
import {destroySession} from "../util/sessionFunctions.js";

const message = document.getElementById("message");

async function loginPrompt (){
    if ((getCookie("login") !== String(true) || (getCookie("username") === "undefined"))){
        message.innerHTML = 'Failed to verify session.<br/> Please log in first.';
        await destroySession();
    }
}

await loginPrompt();