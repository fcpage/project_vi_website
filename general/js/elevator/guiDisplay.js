let elements = [];

const elementNames = ['REQUEST', 'CURRENT', 'DIRECTION', 'DOORS', 'CF3', 'CF2', 'CF1', 'F3D', 'F2U', 'F2D', 'F1U'];

const elementIDs = ['REQUEST', 'CURRENT', 'DIRECTION', 'DOORS', '3', '2', '1', 'down', 'up', 'down', 'up'];
class guiElement {
    constructor(name) {     //build an object
        this.name = name;   //name the element
    }

   modify(element, id) { //id is for text input
        if (!id) {console.log('error');
        } else if (id.length < 5) {
            if (element.state === false) {element.handle.src = '../../resources/references/imgs/gui/' + element.id + 'lit.png';  //off->on
            } else {element.handle.src = '../../resources/references/imgs/gui/' + element.id + 'unlit.png';                      //on->off
            } element.state = !element.state;
        } else {element.id = element.handle.innerHTML = element.id;}
    }
}

function initElements() { //initialize all the elements
        console.log("GUI initializing"); //report
    for (let i = 0; i < elementNames.length; i++) { //for each element
        elements[i] = new guiElement(elementNames[i]); //create and name
        elements[i].state = false;
        elements[i].id = elementIDs[i];
        elements[i].handle = document.getElementById(elementNames[i]);
        elements[i].handle.addEventListener('click', () => {elements[i].modify(elements[i], elements[i].id)});    //add a click listener
    }console.log("Initialization complete"); //report
} initElements();