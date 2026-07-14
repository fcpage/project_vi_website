const elementNames = [
    'REQUEST',
    'CURRENT',
    'DIRECTION',
    'DOORS',
    'CF3', 'CF2','CF1',
    'F3D',
    'F2U', 'F2D',
    'F1U'
];

const elementIDs = [
    'Initializing - Please wait...',
    'Initializing - Please wait...',
    'Initializing - Please wait...',
    'Initializing - Please wait...',
    '3', '2', '1',
    'down',
    'up', 'down',
    'up'
];

const initArray = [
    {name: elementNames[0]},
    {name: elementNames[1]},
    {name: elementNames[2]},
    {name: elementNames[3]},
    {name: elementNames[4]},
    {name: elementNames[5]},
    {name: elementNames[6]},
    {name: elementNames[7]},
    {name: elementNames[8]},
    {name: elementNames[9]},
    {name: elementNames[10]}
];

let elementHandles;

function indicatorToggle(element, state, id) { //staus encodes on (1) or off (0), id is for text input
    let img;
    let handle = element.handle;
    element.state = state;
    element.id = id;
    switch (element.name) {         //what element are we toggling?
        case 'CF3': //car - floor 3
            if (state) {   //on
                img = '<img src="../../resources/references/imgs/gui/3lit.png" width="100" alt="Floor 3 Button" title="Floor 3">'
            } else {        //off
                img = '<img src="../../resources/references/imgs/gui/3unlit.png" width="100" alt="Floor 3 Button" title="Floor 3">'
            }
            element.handle = handle.innerHTML = img;
            break;
        case 'CF2': //car - floor 2
            if (state) {
                img = '<img src="../../resources/references/imgs/gui/2lit.png" width="100" alt="Floor 2 Button" title="Floor 2">'
            } else {
                img = '<img src="../../resources/references/imgs/gui/2unlit.png" width="100" alt="Floor 2 Button" title="Floor 2">'
            }
            handle.innerHTML = img;
            break;
        case 'CF1': //car - floor 1
            if (state) {
                img = '<img src="../../resources/references/imgs/gui/1lit.png" width="100" alt="Floor 1 Button" title="Floor 1">'
            } else {
                img = '<img src="../../resources/references/imgs/gui/1unlit.png" width="100" alt="Floor 1 Button" title="Floor 1">'
            }
            handle.innerHTML = img;
            break;
        case 'F3D': //floor 3 - down
            if (state) {
                img = '<img src="../../resources/references/imgs/gui/downlit.png" width="100" alt="Down Button" title="Going Down">'
            } else {
                img = '<img src="../../resources/references/imgs/gui/downunlit.png" width="100" alt="Down Button" title="Going Down">'
            }
            handle.innerHTML = img;
            break;
        case 'F2U': //floor 2 - up
            if (state) {
                img = '<img src="../../resources/references/imgs/gui/uplit.png" width="100" alt="Up Button" title="Going Up">'
            } else {
                img = '<img src="../../resources/references/imgs/gui/upunlit.png" width="100" alt="Up Button" title="Going Up">'
            }
            handle.innerHTML = img;
            break;
        case 'F2D': //floor 2 = down
            if (state) {
                img = '<img src="../../resources/references/imgs/gui/downlit.png" width="100" alt="Down Button" title="Going Down">'
            } else {
                img = '<img src="../../resources/references/imgs/gui/downunlit.png" width="100" alt="Down Button" title="Going Down">'
            }
            handle.innerHTML = img;
            break;
        case 'F1U': //floor 1 - up
            if (state) {
                img = '<img src="../../resources/references/imgs/gui/uplit.png" width="100" alt="Up Button" title="Going Up">'
            } else {
                img = '<img src="../../resources/references/imgs/gui/upunlit.png" width="100" alt="Up Button" title="Going Up">'
            }
            handle.innerHTML = img;
            break;
        default:
            return 'error';
    }
}

class guiElement {
    constructor(name, state, id, handle) {     //build an object
        this.name = name;   //the element name
        this.state = state;  //the state of the display
        this.id = id;     //the png identifier
        this.handle = handle;   //the handle for event listeners
        return null;
    }

    static display(name, state, id, handle) {       //change the element's display characteristics
       if ((String(name).length) < 4) {   //if not a text field, id relates to the .png id to display
            switch (state) {
                case null:          //initialize to unlit state
                    handle.innerHTML = '<img src="../../resources/references/imgs/gui/' + id + 'unlit.png" width="100" alt="" title=""/>';
                    break;

                case 'requested':   //light the indicator
                    handle.innerHTML = '<img src="../../resources/references/imgs/gui/' + id + 'lit.png" width="100" alt="" title=""/>';
                    break;

                case 'served':      //extinguish the indicator
                    handle.innerHTML =  '<img src="../../resources/references/imgs/gui/' + id + 'unlit.png" width="100" alt="" title=""/>';
                    break;

                default:            //otherwise return error
                    state = "error";
                    break;
            } return state;  //report the state of the element of interest
        } else {    //if it is a text field, id is a message to display.
            switch (state) {
                case null:          //initialize to unlit state
                    handle.innerHTML = "Initializing - Please wait...";
                    break;

                case 'requested':   //light the indicator
                    handle.innerHTML = id;
                    break;

                case 'served':      //extinguish the indicator
                    handle.innerHTML = id;
                    break;

                default:            //otherwise return error
                    state = "error";
                    break;
            } return state;
        }
    }
}

function initElements() {        //initialize all the elements
    console.log("GUI initializing");
    elementHandles= initArray.map(data => new guiElement(data.name, data.state, data.id));  //create a set of class objects
    for (let i = 0; i < elementHandles.length; i++) {//for each element
        elementHandles[i].id = elementIDs[i];   //set the id
        elementHandles[i].handle = document.getElementById(elementHandles[i].name); //set the handle on gui.html
        guiElement.display(elementHandles[i].name, elementHandles[i].state, elementHandles[i].id, elementHandles[i].handle);    //initialize the element's icon
        elementHandles[i].handle.addEventListener('load', (event) => {
            guiElement.display(elementHandles[i].name, elementHandles[i].state, elementHandles[i].id, elementHandles[i].handle)});  //add a load listener
        elementHandles[i].handle.addEventListener('click', (event) => {indicatorToggle(elementHandles[i], !elementHandles[i].state)});    //add a click listener
        indicatorToggle(elementHandles[i], 1);
    }

    console.log("Initialization complete");
    return null
}

initElements();