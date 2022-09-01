
function addElement(a, b) {    
    const element = document.createElement(a);    
    if (arguments.length > 1) {
        element.innerText = b;
    }    
    return element;
}

function removeContent() {
    const element = document.getElementsByClassName('content')[0];
    element.remove();
}

export {
    addElement, removeContent
}