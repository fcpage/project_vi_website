let index = 0;
let slides = document.getElementsByClassName('slide');

while(1)
{
    show();
}

function show() {
    let i;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    index++;

    if (index > slides.length) {
        index = 0;
    }

    slides[index - 1].style.display = "block";
    setTimeout(show, 5000);
}