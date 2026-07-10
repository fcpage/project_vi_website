export function startSession(){
    fetch("../../php/requests/session_start.php")
        .then(response => {if (!response.ok) {
                console.error(response.status);
                console.error(response.statusText);
            } console.log('Session started successfully.');})
        .catch(error => {console.error('Error verifying session:', error);});
}

export function destroySession() {
    fetch("../../php/requests/session_destroy.php")
        .then(response => {if (!response.ok) {
            console.error(response.status);
            console.error(response.statusText);
        } console.log('Session destroyed successfully.');})
        .catch(error => {console.error('Error ending session:', error);});
}

export function getSessionUser(){
    const xhr = new XMLHttpRequest();
    let user;
    xhr.open("POST", "../../php/requests/get_session_user.php", true);
    xhr.onload = function() {if (xhr.status === 200) {
            user = xhr.responseText;
            console.log("User: ", user);
        } else {console.error("Error validating session. Error: ", xhr.status);}}
    xhr.send();
    return `${user}`;
}