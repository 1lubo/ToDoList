
function addElement(a, b) {    
    const element = document.createElement(a);    
    if (arguments.length > 1) {
        element.innerText = b;
    }    
    return element;
}



export {
    addElement
}