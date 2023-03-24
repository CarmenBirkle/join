// main java-script file , side behavior an all pages, menue

let currentSide = 'side-bar-add-Task'; // global variable to set the current page

async function init() {
    await includeHTML();
}

async function includeHTML(currentPage) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); 
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            getElement();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

}
//noch in Arbei -> Carmen
// open a page, the side-bar menu becomes active (dark-blue botton)
function getElement() {
    console.log('geladen'); // kann raus wenns funzt
    let currentSideElement = document.getElementById(currentSide);
    if (currentSideElement !== null) {
        console.log(currentSideElement); // kann raus wenns funzt
        console.log('geklappt'); // kann raus wenns funzt
        currentSideElement.classList.add('side-bar-position');
    }
}

function showLogOut(){
    document.getElementById('header-log-out').classList.remove('d-none');
}

function logout() {
    window.location.href = 'index.html';
  }

  


 

  
  
  