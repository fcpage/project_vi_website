const prefix = "../../resources/references/imgs/gui/";    //base relative url prefix
const lit = "lit.png";  //illuminated suffix
const unlit = "unlit.png";  //de-luminated suffix
export let elements = [];  //a place to hang my hat
const elementNames = ['REQUEST', 'CURRENT', 'DIRECTION', 'DOORS', 'CF3', 'CF2', 'CF1', 'F3D', 'F2U', 'F2D', 'F1U']; //all the names
const elementIDs = ['REQUEST', 'CURRENT', 'DIRECTION', 'DOORS', '3', '2', '1', 'down', 'up', 'down', 'up']; //all the IDs
class guiElement {  //a class to keep all the elements consistent, and a method to modify their contents
    constructor(name) {this.name = name;}   //build an object and name it

   modify(element, id) {if (!id) {console.log('error'); //id is also used for text input
        } else if (id.length < 5) {if (element.state === false) {element.handle.src = prefix + element.id + lit;  //off->on
            } else {element.handle.src = prefix + element.id + unlit;} element.state = !element.state; //toggle   //on->off
        } else {element.id = element.handle.innerHTML = element.id;    //set gui status report text
   } console.log("Name: " + element.name + " - ID: " + element.id + " - Status: " + element.state);}
}

export function initElements() {console.log("GUI initializing"); //start report     //initialize all the elements
    for (let i = 0; i < elementNames.length; i++) { //for each element
        elements[i] = new guiElement(elementNames[i]); //create and name
        elements[i].state = false;  //initialize off
        elements[i].id = elementIDs[i]; //ID, please
        elements[i].handle = document.getElementById(elementNames[i]);  //that's where I left my keys
        elements[i].handle.addEventListener('click', () => {elements[i].modify(elements[i], elements[i].id)});    //add a click listener
    }console.log("Initialization complete");    //end report
    return elements;}  //and return