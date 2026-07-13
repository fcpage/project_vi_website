import {destroySession} from "./sessionFunctions.js";
import {getCookie, setCookie} from "./cookieFunctions.js";

destroySession();
setCookie("login", String(false));
const login = getCookie("login");
const message = document.getElementById("message");

if (login !== String(true)){
    console.log("login: " + login);
    message.innerHTML = 'You have successfully logged out.';
} else {
    console.log("login: " + login);
    message.innerHTML = 'Logout unsuccessful.';
}
