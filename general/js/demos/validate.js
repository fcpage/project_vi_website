var raForm;
var fnFb, lnFb, emFb;
var fnIp, lnIp, emIp;

raForm = document.getElementById('access');
fnFb = document.getElementById('fnFb');
lnFb = document.getElementById('lnFb');
emFb = document.getElementById('emFb');
fnIp = document.getElementById('fn');
lnIp = document.getElementById('ln');
emIp = document.getElementById('em');

function checkFirstName(event)
{
    if(fnIp.value.length < 1) {
        fnFb.innerHTML = '^--- Enter your first name';
        event.preventDefault();
    } else {
        fnFb.innerHTML = '';
    }
}

function checkLastName(event)
{
    if(lnIp.value.length < 1) {
        lnFb.innerHTML = '^--- Enter your last name';
        event.preventDefault();
    } else {
        lnFb.innerHTML = '';
    }
}

function checkEmail(event)
{
    if(emIp.value.length < 1) {
        emFb.innerHTML = '^--- Enter your last name';
        event.preventDefault();
    } else {
        emFb.innerHTML = '';
    }
}

raForm.addEventListener('submit', function(event) {
    checkFirstName(event); checkLastName(event); checkEmail(event);
    }, false);