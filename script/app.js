// main java-script file , side behavior an all pages, menue

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

function showLogOut(){
    document.getElementById('header-log-out').classList.remove('header-d-none');
}

function logout() {
    window.location.href = 'index.html';
}







  


 

  
  
  