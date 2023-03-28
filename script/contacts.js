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
    document.getElementById('contact-name').value ='';
    document.getElementById('contact-email').value ='';
    document.getElementById('contact-tel').value ='';

}

function contactsShowOverlayEdit(){
    document.getElementById('contacts-popup-edit-Contact').classList.remove('d-none');
    console.log('aufgerufen');
}

function contactsCloseOverlayEdit(){
    document.getElementById('contacts-popup-edit-Contact').classList.add('d-none');
}

// function contactsCancelEdit(){
//     document.getElementById('contacts-popup-edit-Contact').classList.add('d-none');
//     document.getElementById("contacts-popup-edit-Contact").addEventListener("click", function(event) {
//         event.preventDefault();
//       });
// } 

function contactsOpenAddTask(){
    document.getElementById('contacts-add-task').classList.remove('d-none');
}

function contactsCloseAddTask(){
    document.getElementById('contacts-add-task').classList.add('d-none');
}

// function animateDiv() {
//     const box = document.querySelector('.contacts-success');
//     box.style.animation = 'slide-up 800ms ease-in-out, slide-down 800ms ease-in-out 800ms';
//   }

setTimeout(() => {
    const div = document.querySelector('.fadeInBottom');
    div.classList.add('fadeOut');
  }, 4000);
  

       
 
