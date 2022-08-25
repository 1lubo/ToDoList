import { createNavBar } from "./navbar";
import { storageAvailable } from "./storage";
import './style.css';

document.body.appendChild(createNavBar());

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log('Local Storage Available');
  }
  else {
    // Too bad, no localStorage for us
    console.log('Local Storage Not Available ');
  }
  

//document.body.appendChild(addElement(['div', 'Hello World']));