"use strict";
(self["webpackChunktodolist"] = self["webpackChunktodolist"] || []).push([["main"],{

/***/ "./src/buildingblocks.js":
/*!*******************************!*\
  !*** ./src/buildingblocks.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addElement": () => (/* binding */ addElement)
/* harmony export */ });

function addElement(a, b) {    
    const element = document.createElement(a);    
    if (arguments.length > 1) {
        element.innerText = b;
    }    
    return element;
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar */ "./src/navbar.js");


document.body.appendChild((0,_navbar__WEBPACK_IMPORTED_MODULE_0__.createNavBar)());

//document.body.appendChild(addElement(['div', 'Hello World']));

/***/ }),

/***/ "./src/navbar.js":
/*!***********************!*\
  !*** ./src/navbar.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNavBar": () => (/* binding */ createNavBar)
/* harmony export */ });
/* harmony import */ var _buildingblocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildingblocks */ "./src/buildingblocks.js");


function createNavLink(text){
    const navLink = (0,_buildingblocks__WEBPACK_IMPORTED_MODULE_0__.addElement)('div', text);
    navLink.classList.add('navbarlink');
    navLink.id = text;
    return navLink;
}

function createNavBar(){
    //const header = addElement(['header']);
    const navBarContainer = (0,_buildingblocks__WEBPACK_IMPORTED_MODULE_0__.addElement)('div');
    navBarContainer.classList.add('navbar');
    var navbarLinks = ['Home', 'Today', 'Upcoming', 'Projects', 'Add Project'];
    
    navbarLinks.forEach( link => navBarContainer.appendChild(createNavLink(link)));    

    return navBarContainer;
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNQd0M7O0FBRXhDLDBCQUEwQixxREFBWTs7QUFFdEM7Ozs7Ozs7Ozs7Ozs7OztBQ0o4Qzs7QUFFOUM7QUFDQSxvQkFBb0IsMkRBQVU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QiwyREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvYnVpbGRpbmdibG9ja3MuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbmF2YmFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gYWRkRWxlbWVudChhLCBiKSB7ICAgIFxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGEpOyAgICBcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBiO1xuICAgIH0gICAgXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCB7XG4gICAgYWRkRWxlbWVudFxufSIsImltcG9ydCB7IGNyZWF0ZU5hdkJhciB9IGZyb20gXCIuL25hdmJhclwiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU5hdkJhcigpKTtcblxuLy9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFkZEVsZW1lbnQoWydkaXYnLCAnSGVsbG8gV29ybGQnXSkpOyIsImltcG9ydCB7IGFkZEVsZW1lbnQgfSBmcm9tICcuL2J1aWxkaW5nYmxvY2tzJztcblxuZnVuY3Rpb24gY3JlYXRlTmF2TGluayh0ZXh0KXtcbiAgICBjb25zdCBuYXZMaW5rID0gYWRkRWxlbWVudCgnZGl2JywgdGV4dCk7XG4gICAgbmF2TGluay5jbGFzc0xpc3QuYWRkKCduYXZiYXJsaW5rJyk7XG4gICAgbmF2TGluay5pZCA9IHRleHQ7XG4gICAgcmV0dXJuIG5hdkxpbms7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5hdkJhcigpe1xuICAgIC8vY29uc3QgaGVhZGVyID0gYWRkRWxlbWVudChbJ2hlYWRlciddKTtcbiAgICBjb25zdCBuYXZCYXJDb250YWluZXIgPSBhZGRFbGVtZW50KCdkaXYnKTtcbiAgICBuYXZCYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbmF2YmFyJyk7XG4gICAgdmFyIG5hdmJhckxpbmtzID0gWydIb21lJywgJ1RvZGF5JywgJ1VwY29taW5nJywgJ1Byb2plY3RzJywgJ0FkZCBQcm9qZWN0J107XG4gICAgXG4gICAgbmF2YmFyTGlua3MuZm9yRWFjaCggbGluayA9PiBuYXZCYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTmF2TGluayhsaW5rKSkpOyAgICBcblxuICAgIHJldHVybiBuYXZCYXJDb250YWluZXI7XG59XG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlTmF2QmFyXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=