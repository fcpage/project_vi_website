// Event listener script for the login form checking length of username and password

const loginForm = document.getElementById('login');
const user = document.getElementById('user');
const pass = document.getElementById('pass');

window.addEventListener('load', function(){
    user.focus();
});

function checkLength(field, label){
    if (field.value.length < 7){
        field.setCustomValidity(label + ' must be at least 7 characters long');
        event.preventDefault();
    } else {
        field.setCustomValidity('');
    }
}

loginForm.addEventListener('submit', function(event){
    checkLength(user, 'Username');
    checkLength(pass, 'Password');
}, false);