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


/**
 * function to see the individual user data  on the left side. 
* query if window size bigger then 1170 mobile or small displays are present, 
* then the function contacsshowuserMobile is called
* @param {number} i // index-number of contacts-array
 */

// vervollständigen wenn das Backand steht (Logik: es wird ein Index übergeben und anhand dessen 
// die Daten in der Renderfunktion verarbeiten) -> Daten Links
function contactsShowUser(i){
    document.getElementById('contacts-user').innerHTML = getUserLeftTemplate(i);
    document.getElementById('contacts-container-right-mobile').innerHTML = mobileLeftTemplate(i);
   
    if (window.innerWidth < 1170) {
        document.getElementById('contacts-container-right-mobile').classList.remove('d-none');
        document.getElementById('contacts-container-left').classList.add('d-none');
        // document.getElementById('mobileContainerRight').classList.remove('d-none');
      
        
        console.log('funktion - klein')

      
    } else {
        document.getElementById('contacts-container-right-mobile').classList.add('d-none');
        document.getElementById('contacts-container-left').classList.remove('d-none');
        console.log('funktion - groß');
    }
}


//   function handleWindowResize() {
//     try {
//         handleWindowResizeContacs()
//     } catch (error) {
        
//     }
    // handleWindowResizeContacs()
    
    // if (window.innerWidth > 1170) {
    //   console.log('rezise groß') 
    //   document.getElementById('contacts-container-right-mobile').classList.add('d-none');
    //   document.getElementById('contacts-container-right').classList.remove('d-none');
    //   document.getElementById('contacts-container-left').classList.remove('d-none');
    //   console.log('ende groß')
    // } else {
    //   console.log('resise klein')
    //   document.getElementById('contacts-container-right').classList.add('d-none');
    // }
  //}

  window.onresize = handleWindowResizeContacs;
  
function handleWindowResizeContacs(){
       if (window.innerWidth > 1170) {
      console.log('rezise groß') 
      document.getElementById('contacts-container-right-mobile').classList.add('d-none');
      document.getElementById('contacts-container-right').classList.remove('d-none');
      document.getElementById('contacts-container-left').classList.remove('d-none');
      console.log('ende groß')
    } else {
      console.log('resise klein')
      document.getElementById('contacts-container-right').classList.add('d-none');
    }
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

       
 
