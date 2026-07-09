fetch("../../php/requests/verify.php")
    .then(response => {if (!response.ok) {
        console.error(response.status);
        console.error(response.statusText);}
        return response.text();})
    .then(data => {document.getElementById("verify").innerHTML = data;})
    .catch(error => {console.error('Error verifying session:', error);
    document.getElementById("verify").innerHTML = "Failed to verify session.";})