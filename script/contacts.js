'use strict';
/**
 * contains all functions that are relevant for the contacts.html. 
 * Windows behavior, saving, modifying and deleting records, as well as helper functions. 
 * @author Carmen Birkle
 * @version 1.0
 */

/**
 * @param {Array.<Contacts>} contacts - Contains an Array of Contacts
 * @param {Array.<sortContacts>} sortContacts - Contains an Array of Contactsdata, sort by Initial char
 */
let contacts = [];
let sortContacts = [];




/**
 * Funktion to creat a map with sorted data by first letter and associated contact list.
 * a map is used so that the initial letters are unique.
 * then all contacts for this letter are listed alphabetically sorted by first name.
 * This sorted list is stored in the global array sortContacts
 */

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
    console.log(sortContacts);
  }


  

//Render Function for ContactList Left
function contactsShowContactlist(sortContacts) {
    document.getElementById('contacts-list').innerHTML ='';
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
    const selectedContact = contacts.find(contact => contact.number === contactNumber);
    document.getElementById('contacts-popup-edit-Contact').innerHTML =  contactsShowContactToEditTemplate(selectedContact);
}


/**
 * render-function to see the individual user data  on the left side in detail an render it.
* contains a query if window size bigger then 1170 mobile or small displays are present, 
* then the function contacsshowuserMobile is called
* @param {Object} contacts - Array of all Contacts
* @param {integer} contactNumber - specific contact number
 */

function contactsShowUser(contacts, contactNumber) {
    const selectedContact = contacts.find(contact => contact.number === contactNumber);
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

// async function saveContact() {
// try{
//     const button = document.getElementById('contacts-save');
//     button.disabled = true;

//         let name = document.getElementById('contact-name').value;
//         let email = document.getElementById('contact-email').value;
//         let phone = document.getElementById('contact-tel').value;
//         let initials = getInitials(name);        

//         let contact = {
//             'initals': initials,
//             'number': contacts.length + 1,
//             'fullname':name,
//             'email': email,
//             'phone': phone,
//             'bgcolor': randomRGBColor(),
//             'password': '',
//             'image': ''
//         };

//         contacts.push(contact);
//         await backend.setItem('contacts', JSON.stringify(contacts));

// // showSuccessfullAlert();
//     const div = document.getElementById('contacts-success')
//     div.classList.add('fadeInBottom')
//     div.classList.remove('d-none');
//     setTimeout(() => {
//         contactsCloseOverlayNew();
//         contacsResetNewContact()
//         div.classList.remove('fadeInBottom');
//         div.classList.add('d-none');
//     }, 2000);
//     } catch (error){
//         console.log(error);
//     } finally {
//         const button = document.getElementById('contacts-save');
//         button.disabled = false;
//     }
// }

// function showSuccessfullAlert(){
//     const div = document.getElementById('contacts-success')
//     div.classList.add('fadeInBottom')
//     div.classList.remove('d-none');
//     setTimeout(() => {
//         contactsCloseOverlayNew();
//         contacsResetNewContact()
//         div.classList.remove('fadeInBottom');
//         div.classList.add('d-none');
//     }, 2000);
// }

// Find the highest number in the array
function getHighestNumber(){
    let highestNumber = 0;
    contacts.forEach(contact => {
        if (contact.number > highestNumber) {
          highestNumber = contact.number;
        }
      });
      return highestNumber;
  }



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
                'number': getHighestNumber() + 1,
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
        div.classList.add('fadeInBottomAlways')
        div.classList.remove('d-none');
        setTimeout(() => {
            contactsCloseOverlayNew();
            contacsResetNewContact()
            div.classList.remove('fadeInBottomAlways');
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

async function editContact(contact){
    updateContacts(contact); // holt die werte und pusht in das contacts array die richtigen werte
    await backend.setItem('contacts', JSON.stringify(contacts)); // läd das ganze auf den server hoch

    getSortListofContacts();
    contactsShowContactlist(sortContacts);
    contactsShowUser(contacts, contact);
    contactsCloseOverlayEdit();
}

function updateContacts(contact){
    let name = document.getElementById('contacts-edit-fullname').value;
    let email = document.getElementById('contacts-edit-email').value;
    let phone = document.getElementById('contacts-edit-phone').value;

    const foundContact = contacts.find(c => c.number === contact);
    const index = contacts.findIndex(c => c.number === contact);

    foundContact.initals = getInitials(name); ;
    foundContact.fullname = name;
    foundContact.email = email;
    foundContact.phone = phone;
    
    contacts[index] = foundContact;
}

/**
 * based on the contact number the matching record is searched from the 
 * contakt-array and the index is caught. this index dataset is deleted, 
 * the contact list is re-sorted and generated and the page is reloaded
 * @async
 * @function 
 * @param {integer} contact - the individual contact number, this is generated 
 * dynamically in ascending order when creating a contact
 * 
 * 
 */

async function deleteContacts(contact) {
    const index = contacts.findIndex(c => c.number === contact);
    contacts.splice(index, 1);
    await backend.setItem('contacts', JSON.stringify(contacts));
    contactsShowContactlist(sortContacts);
    location.reload();
  }

/**
 * Function so Display the Overlay to create an new Contact
 */
function contactsShowOverlayNew() {
    let overlay = document.getElementById('contacts-popup-add-contact');
    overlay.style.display = "flex";
}

/**
 * Function to Close the Overlay for create an new Contact
 */
function contactsCloseOverlayNew() {
    let overlay = document.getElementById('contacts-popup-add-contact');
    overlay.style.display = "none";
}

/**
 * Function to cancel a contact creation. closes the overlay and calls the 
 * funktion to resets the fields
 */
function contactsCancelNewContact() {
    contactsCloseOverlayNew();
    contacsResetNewContact();
}

/**
 * function to clear the input fields
 */
function contacsResetNewContact() {
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-tel').value = '';
}


/**
 * function to display the overlay to edit a contact
 */
function contactsCloseOverlayEdit() {
    document.getElementById('contacts-popup-edit-Contact').classList.add('d-none');
}

/**
 * function to display the overlay to add a new task
 */
function contactsOpenAddTask() {
    document.getElementById('contacts-add-task').classList.remove('d-none');
}

/**
 * funktion to close the overlay from new task
 */
function contactsCloseAddTask() {
    document.getElementById('contacts-add-task').classList.add('d-none');
}

