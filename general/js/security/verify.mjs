import {startSession, destroySession, getSessionUser, getSessionAuth, getSessionLogin}
    from "../util/sessionFunctions.js";
import {getCookie, setCookie} from "../util/cookieFunctions.mjs";
import {wait} from "../util/pageDelay.js";

const verify = document.getElementById("verify");   //grab the login verification display field in HTML
const page = document.getElementById("page");       //grab all the page contents
const saver = page.innerHTML;   //save the page contents
page.innerHTML = "";    //wipe the page

await startSession();     //make sure there is a session
await getSessionUser();   //make a JS cookie for the session user
await getSessionAuth();   //make a JS cookie for the session authorization
await getSessionLogin();  //make a JS cookie for the login state
let login = getCookie("login"); //grab a cookie
let username = getCookie("username");   //grab a cookie
let authorization = getCookie("authorization");   //grab a cookie

if (authorization === "admin"){setCookie("admin", "true");
} else {setCookie("admin", "false");}

if ((username !== "undefined") && (username !== "false") &&
    (authorization !== "undefined" ) && (authorization !== "false") &&
    (login !== "undefined") && (login !== "false")) {    //if each of the user, auth credentials, and login status are valid
    greet();    //put er there

    if (verify.innerHTML.includes("undefined") || verify.innerHTML.includes("false")){  //check if the script jumped the gun and needs to check again
        page.innerHTML = "";
        verify.innerHTML = ""; //wipe the page
        await wait(10); //wait 10ms
        window.location.reload();   //reload
    } else { page.innerHTML = saver;    //put it back
        greet();    //say hello
    }

} else {
    await destroySession();   //kill the session
    setCookie("login", String(false));  //make sure that the login cookie is false after it gets wiped by the session close
    console.log("User: " + getCookie("username"));   //report to console
    console.log('Login: '+ getCookie("login"));   //report to console
    window.location.replace("../../html/requests/authentication.html");  //redirect to the login page
}

function greet(){
    verify.innerHTML = `Welcome, ${getCookie("username")}!<br/>` +
        'Please <a href="../../html/requests/logout.html">' +
        'LOG OUT</a> when you\'re finished.';     //a nice, personalized welcome message
}