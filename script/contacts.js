
'use strict';
/**
 * 
 */

let contacts = [];
let sortContacts = [];


function initContacts() {

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



function contactsCloseOverlayEdit() {
    document.getElementById('contacts-popup-edit-Contact').classList.add('d-none');
}

function contactsOpenAddTask() {
    document.getElementById('contacts-add-task').classList.remove('d-none');
}

function contactsCloseAddTask() {
    document.getElementById('contacts-add-task').classList.add('d-none');
}

//TODO kürzen
//creates a map with sorted data by first letter and associated contact list
function getSortListofContacts() {
    let initialsMap = new Map();
    contacts.forEach(contact => {
      let name = contact.fullname.trim(); // removes blank charactor
      let initials = name.charAt(0).toUpperCase();
      if (!initialsMap.has(initials)) {
        initialsMap.set(initials, []);
      }
      initialsMap.get(initials).push(contact);
    });
  
    let sortedInitialsMap = new Map([...initialsMap.entries()].sort());   // sort initials alphabetically
  
    // sort contacts by fullname
    sortedInitialsMap.forEach((contacts, initials) => {
      contacts.sort((a, b) => {
        if (a.fullname < b.fullname) { return -1; }
        if (a.fullname > b.fullname) { return 1; }
        return 0;
      });
    });

    sortContacts = sortedInitialsMap;
  }
  

//Render Function for ContactList Left
function contactsShowContactlist(sortContacts) {
    for (let [key, value] of sortContacts) {
        document.getElementById('contacts-list').innerHTML += contactListLetterTemplate(key);
        for (let contact of value) {
            if (contact.fullname.charAt(0) === key) { // check if the first letter of the name corresponds to the current letter
                document.getElementById(`contacs-render-single-Data-${key}`).innerHTML += contactListContactTemplate(contact);
            }
        }
    }
}

function contactsShowOverlayEdit(contacts, contactNumber) {
    contactsShowContactToEdit(contacts, contactNumber);
    document.getElementById('contacts-popup-edit-Contact').classList.remove('d-none');
}

function contactsShowContactToEdit(contacts, contactNumber) {
    console.log(contactNumber);
    const selectedContact = contacts.find(contact => contact.number === contactNumber);
    console.log('kontakt', selectedContact);
    console.log(selectedContact);
    document.getElementById('contacts-popup-edit-Contact').innerHTML =  contactsShowContactToEditTemplate(selectedContact);
}


/**
 * function to see the individual user data  on the left side. 
* query if window size bigger then 1170 mobile or small displays are present, 
* then the function contacsshowuserMobile is called
* @param {number} i // index-number of contacts-array
 */


function contactsShowUser(contacts, contactNumber) {
    const selectedContact = contacts.find(contact => contact.number === contactNumber);
    console.log('kontakt', selectedContact);
    document.getElementById('contacts-user').innerHTML = getUserLeftTemplate(selectedContact);
    document.getElementById('contacts-container-right-mobile').innerHTML = mobileLeftTemplate(selectedContact);

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


function getInitials(name) {
    const firstLetters = name.split(' ')
    .map(word => word.charAt(0).toUpperCase());
    return firstLetters.join('');
  }


//TODO kürzen!

async function saveContact() {
try{
    const button = document.getElementById('contacts-save');
    button.disabled = true;

        let name = document.getElementById('contact-name').value;
        let email = document.getElementById('contact-email').value;
        let phone = document.getElementById('contact-tel').value;
        let initials = getInitials(name);        

        let contact = {
            'initals': initials,
            'number': contacts.length + 1,
            'fullname':name,
            'email': email,
            'phone': phone,
            'bgcolor': randomRGBColor(),
            'password': '',
            'image': ''
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
    } finally {
        const button = document.getElementById('contacts-save');
        button.disabled = false;
    }
}



function contactsCloseMobileContacts() {
    document.getElementById('contacts-container-right-mobile').classList.add('d-none');
    document.getElementById('contacts-container-left').classList.remove('d-none');
}

