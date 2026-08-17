import {destroySession} from "../util/sessionFunctions.js";
import {eatCookie, eatCookies, getCookie, setCookie} from "../util/cookieFunctions.mjs";

await destroySession();
setCookie("login", String(false));
const login = getCookie("login");
const message = document.getElementById("message");

const xhr = new XMLHttpRequest();
xhr.open("POST", "../../php/elevator/dbClose.php", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function() {
    if (xhr.status === 200) {
        let requests = xhr.responseText;
        if (requests !== (String(false)) || 'undefined') {
            console.log('Closed database connection successfully.');
        }
        else {let i = 0;
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;}}
    else {console.error('Error disconnecting from database: ', xhr.status);
        return false;}}
xhr.send();



/*fetch("../../php/elevator/dbClose.php")
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
*/