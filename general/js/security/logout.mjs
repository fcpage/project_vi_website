import {destroySession} from "../util/sessionFunctions.js";
import {eatCookies, getCookie, setCookie} from "../util/cookieFunctions.mjs";

await destroySession();
setCookie("login", String(false));
const login = getCookie("login");
const message = document.getElementById("message");

fetch("../../php/elevator/dbClose.php")
    .then(response => {
        if (!response.ok) {
            console.error("Error Status: " + response.status);
            console.error("Error Message: " + response.statusText);}
        else {
            console.log('Closed database connection successfully.');}})
    .catch(error => {
        console.error('Error disconnecting from database:', error);});

if (login !== String(true)){
    console.log("login: " + login);
    message.innerHTML = 'You have successfully logged out.';
} else {
    console.log("login: " + login);
    message.innerHTML = 'Logout unsuccessful.';
}
