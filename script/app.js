// main java-script file , side behavior an all pages, menue
let showMenue = false;

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
        } else {
            element.innerHTML = 'Page not found';
        }
    }

}
// hide and show the logOutArea
function toggleLogOutArea(){
    if (showMenue){
        document.getElementById('header-log-out').classList.add('header-d-none');
        showMenue = false;
    } else {
        document.getElementById('header-log-out').classList.remove('header-d-none');
        showMenue = true;
    }
}

function logout() {
    window.location.href = 'index.html';
}







  


 

  
  
  