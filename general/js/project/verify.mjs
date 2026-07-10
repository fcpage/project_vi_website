import {startSession, destroySession, getSessionUser} from "./sessionFunctions.js";
startSession();
let verify = document.getElementById("verify");

const username = getSessionUser();
console.log(username);
console.log("User: " + username);
verify.innerHTML = `Welcome, ${username}!<br/>` +
    'Please <a href="../../../general/php/requests/logout.php">' +
    'LOG OUT</a> when you\'re finished.';

/*if (typeof String(username) !== 'undefined') {
    console.log("User: " + user);
    verify.innerHTML = 'Welcome, ' + user + '!<br/>' +
        'Please <a href="../../../general/php/requests/logout.php">' +
        'LOG OUT</a> when you\'re finished.';
} else {destroySession();
    console.log('No user found.');
    verify.innerHTML = 'Failed to verify session.<br/> Please log in first.';
    //window.location.replace("../../html/requests/login.html");*/

//}