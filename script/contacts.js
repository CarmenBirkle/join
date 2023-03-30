/**
 * 
 */

let contacts = [];


function initContacts() {
    contactsShowContactlist();
}

function contactsShowOverlayNew() {
    let overlay = document.getElementById('contacts-popup-add-contact');
    overlay.style.display = "flex";
}

function contactsCloseOverlayNew() {
    let overlay = document.getElementById('contacts-popup-add-contact');
    overlay.style.display = "none";
}

function contactsCancelNewContact() {
    contactsCloseOverlayNew();
    contacsResetNewContact();
}

function contacsResetNewContact() {
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-tel').value = '';
}

function contactsShowOverlayEdit(i) {
    contactsShowContactToEdit(i);
    document.getElementById('contacts-popup-edit-Contact').classList.remove('d-none');
}

function contactsCloseOverlayEdit() {
    document.getElementById('contacts-popup-edit-Contact').classList.add('d-none');
}

function contactsOpenAddTask() {
    document.getElementById('contacts-add-task').classList.remove('d-none');
}

function contactsCloseAddTask() {
    document.getElementById('contacts-add-task').classList.add('d-none');
}

function getFirstLetter(contacts){
    contacts.forEach(element => {
        
    });
    const firstLetters = name
    .split(' ')
    .map(word =>word.charAt(0).toUpperCase())
}


// nur vorbereitet, später mir realen Daten testen
//Render-Funktion for ContactList Left
function contactsShowContactlist(i) {
    document.getElementById('contacts-list').innerHTML = contactListTemplate(i);
}

function contactsShowContactToEdit(i) {
    document.getElementById('contacts-popup-edit-Contact').innerHTML = contactEditSingleContactTemplate(i);
}


/**
 * function to see the individual user data  on the left side. 
* query if window size bigger then 1170 mobile or small displays are present, 
* then the function contacsshowuserMobile is called
* @param {number} i // index-number of contacts-array
 */

// TODO vervollständigen wenn das Backand steht (Logik: es wird ein Index übergeben und anhand dessen 
// die Daten in der Renderfunktion verarbeiten) -> Daten Links
function contactsShowUser(i) {
    document.getElementById('contacts-user').innerHTML = getUserLeftTemplate(i);
    document.getElementById('contacts-container-right-mobile').innerHTML = mobileLeftTemplate(i);

    if (window.innerWidth < 1170) {
        document.getElementById('contacts-container-right-mobile').classList.remove('d-none');
        document.getElementById('contacts-container-left').classList.add('d-none');
    } else {
        document.getElementById('contacts-container-right-mobile').classList.add('d-none');
        document.getElementById('contacts-container-left').classList.remove('d-none');
       
    }
}



window.onresize = handleWindowResizeContacs;

function handleWindowResizeContacs() {
    if (window.innerWidth > 1170) {
        document.getElementById('contacts-container-right-mobile').classList.add('d-none');
        document.getElementById('contacts-container-right').classList.remove('d-none');
        document.getElementById('contacts-container-left').classList.remove('d-none');
    } else {
        document.getElementById('contacts-container-right').classList.add('d-none');
    }
}

function randomRGBColor(){
    let r = Math.floor(Math.random() * 156);
    let g = Math.floor(Math.random() * 156);
    let b = Math.floor(Math.random() * 156);
    let randomRGBColor = `${r},`+`${g},`+`${b}`;
    return randomRGBColor;
  }

function getInitals(name){
    const firstLetters = name
    .split(' ')
    .map(word =>word.charAt(0).toUpperCase())
}

// TODO - wenn das Backend steht, eine Logik implementieren, wenn die Daten erfolgreich 
// gespeichert wurden dem Butten der ID "contacts-success" die Klasse fadeInBottom geben und dann 
// dann in Abhängigkeit die setTimeout Funktion von unten ausführen. ggf. die Classen-logik auslagern

//TODO kürzen!

async function saveContact() {
try{
        let name = document.getElementById('contact-name').value;
        let email = document.getElementById('contact-email').value;
        let phone = document.getElementById('contact-tel').value;
        console.log(randomRGBColor())

        let contact = {
            'initals': getInitals(name), // hier ggf. nochmals schauen, wie das Format rauskommt
            'number': contacts.length + 1,
            'fullname':name,
            'email': email,
            'phone': phone,
            'bgcolor': randomRGBColor()
        };

        contacts.push(contact);
        await backend.setItem('contacts', JSON.stringify(contacts));


    const div = document.getElementById('contacts-success')
    div.classList.add('fadeInBottom')
    div.classList.remove('d-none');
    setTimeout(() => {
        contactsCloseOverlayNew();
        contacsResetNewContact()
        div.classList.remove('fadeInBottom');
        div.classList.add('d-none');
    }, 2000);
} catch (error){
    console.log(error);
}
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

function contactsCloseMobileContacts() {
    document.getElementById('contacts-container-right-mobile').classList.add('d-none');
    document.getElementById('contacts-container-left').classList.remove('d-none');
}

