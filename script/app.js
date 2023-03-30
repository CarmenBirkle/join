// main java-script file , side behavior an all pages, menue
let activLogOutArea = false; 
const activePage = window.location.pathname; // get the current pathname from window.location

async function init() {
    await includeHTML();
    handleWindowResize(); // TODO Final info rausnehmen 
}     

function handleWindowResize() {
    try {
        handleWindowResizeContacs()
    } catch (error) {
       //do nothing, then the corresponding js file is not included, because not relevant an this page
    }
}

async function includeHTML(currentPage) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); 
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            getElement()
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function showLogOut(){
    document.getElementById('header-log-out').classList.remove('header-d-none');
}

function logout() {
    window.location.href = 'index.html';
}

function toggleShowLogOutArea(){
    if(activLogOutArea){
         document.getElementById('header-log-out').classList.add('header-d-none');
        activLogOutArea = false;
    } else {
        document.getElementById('header-log-out').classList.remove('header-d-none');
        activLogOutArea = true;
    }
}

// is called in includeHTML-function. gets the current window-location as ID and added the blue focus
function getElement(){
    let tempTrimmed = activePage.replace(/^\/|\.html$/g, "");
    let activePageAsID = "side-bar-" + tempTrimmed;

    let currentSideElement = document.getElementById(activePageAsID);
    if ( currentSideElement!== null){
        currentSideElement.classList.add('side-bar-position');
    }
}







  


 

  
  
  