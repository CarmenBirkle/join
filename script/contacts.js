/**
 * 
 */
function contactsShowOverlayNew(){
    let overlay = document.getElementById('contacts-popup-add-contact');
    overlay.style.display = "flex";
}

function contactsCloseOverlayNew(){ 
    let overlay = document.getElementById('contacts-popup-add-contact');
    overlay.style.display = "none";
}

function contactsCancelNewContact(){
    contactsCloseOverlayNew();
    contacsResetNewContact();
}

function contacsResetNewContact(){
    document.getElementById('contact-name').value ='';
    document.getElementById('contact-email').value ='';
    document.getElementById('contact-tel').value ='';
}

function contactsShowOverlayEdit(){
    document.getElementById('contacts-popup-edit-Contact').classList.remove('d-none');
}

function contactsCloseOverlayEdit(){
    document.getElementById('contacts-popup-edit-Contact').classList.add('d-none');
}

function contactsOpenAddTask(){
    document.getElementById('contacts-add-task').classList.remove('d-none');
}

function contactsCloseAddTask(){
    document.getElementById('contacts-add-task').classList.add('d-none');
}

// TODO - wenn das Backend steht, eine Logik implementieren, wenn die Daten erfolgreich 
// gespeichert wurden dem Butten der ID "contacts-success" die Klasse fadeInBottom geben und dann 
// dann in Abhängigkeit die setTimeout Funktion von unten ausführen. ggf. die Classen-logik auslagern


function saveContact(){
    const div = document.getElementById('contacts-success')
    div.classList.add('fadeInBottom')
    div.classList.remove('d-none');
    setTimeout(() => {
        contactsCloseOverlayNew();
        contacsResetNewContact()
        div.classList.remove('fadeInBottom');
        div.classList.add('d-none');
      }, 2000);
}

// function saveContact() {
//     // Prüfen, ob der "Cancel"-Button geklickt wurde
//     if (event.target.id === 'contacts-save') {
//         console.log('jepp');
//         const div = document.getElementById('contacts-success')
//         div.classList.add('fadeInBottom')
//         div.classList.remove('d-none');
//         setTimeout(() => {
//             contactsCloseOverlayNew();
//             contacsResetNewContact()
//             div.classList.remove('fadeInBottom');
//             div.classList.add('d-none');
//           }, 2000);
//     }
//     console.log('false');
//     contactsCloseOverlayNew();
//         contacsResetNewContact();
    
//   }
  
  //return false; // Verhindern, dass das Formular gesendet wird

       
 
