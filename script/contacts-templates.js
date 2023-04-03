function getUserLeftTemplate(contact) {
    return `
            <div class="contacts-information-top">
                <div class="contact-icon" style="background-color: rgb(${contact.bgcolor});>
                    <div class="contact-initals-big">${contact.initals}</div>
                </div>
                <div class="contact-info-top-right">
                    <div class="contact-name">${contact.fullname}</div>
                    <div class="add-task" onclick="contactsOpenAddTask()">
                        <img src="./assets/img/icons/contact-add-task.png" alt="+">
                        <div>Add Task</div>
                    </div>
                </div>
            </div>

            <div class="contacts-information-center">
                <div class="contacts-info-center-titel">Contact information</div>
                    <div class="contacts-edit" onclick="contactsShowOverlayEdit()">
                        <img src="./assets/img/icons/contact-edit.png" alt="edit">
                        <div>Edit Contact</div>
                    </div>
                </div>

            <div class="contacts-information-bottom">
            <div>
                <div>
                    Email
                </div>
                <div class="contacts-info-botton-email contacts-info-botton-content">
                ${contact.email}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Phone
                    </div>
                    <div class="contacts-info-botton-content">
                    ${contact.phone}
                    </div>
                </div>
            </div>
            </div>
`;
}

function mobileLeftTemplate(contact) {
    return `
    <div id="mobileLeftTemplate" class="">

        <div class="contacts-titel-mobile">
            <div class="contacts-sub-title-mobile">Kanban Project Management Tool</div>
            <img class="contacts-mobile-back" src="./assets/img/icons/help-side-back.svg" onclick="contactsCloseMobileContacts()" alt="X">
            <h1>Contacts</h1>
            <h3>Better with a team</h3>
            <div class=contacts-mobile-line></div>
        </div>

    <div class="contacts-information-top">
                <div  class="contact-icon-mobile" style="background-color: rgb(${contact.bgcolor});>
                    <div class="contact-initals-big">${contact.initals}</div>
                </div>
                <div class="contact-info-top-right">
                    <div class="contact-name">${contact.fullname}</div>
                    <div class="add-task" onclick="contactsOpenAddTask()">
                        <img src="./assets/img/icons/contact-add-task.png" alt="+">
                        <div>Add Task</div>
                    </div>
                </div>
            </div>

            <div class="contacts-information-center">
                <div class="contacts-info-center-titel">Contact information</div>
                    <div class="contacts-edit" onclick="contactsShowOverlayEdit()">
                        <img src="./assets/img/icons/contact-edit.png" alt="edit">
                        <div>Edit Contact</div>
                    </div>
                </div>

            <div class="contacts-information-bottom">
            <div>
                <div>
                    Email
                </div>
                <div class="contacts-info-botton-email contacts-info-botton-content">
                ${contact.email}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Phone
                    </div>
                    <div class="contacts-info-botton-content">
                        ${contact.phone}
                    </div>
                </div>
            </div>
            <div class="btn-mobil-edit" onclick="contactsShowOverlayEdit()"> 
                <img src="./assets/img/icons/contacts-edit-mobile.png" alt="edit">
            </div>
    </div>
    `;
}

function contactListLetterTemplate(letter) {
    return `
            
        <div id="contacts-letter-container-${letter}" class="contacts-letter-container">
            <div class="contacts-first-letter">
                ${letter}
            </div>
            <hr>
            <div id="contacs-render-single-Data-${letter}"> 
               
            </div>
        </div>
            
    `;
}

function contactListContactTemplate(contact){
    return `
    <div id="contacs-singele-data${contact.number}" class="contacts-single-data" onclick="contactsShowUser(contacts, ${contact.number})">
        <div>    
            <div class="contacts-initals" style="background-color: rgb(${contact.bgcolor});>
                <div class="contacts-initals"> ${contact.initals} </div>
            </div>
            <div class="contacts-details">
                <div>${contact.fullname}</div>
                <div class="contacts-single-email">${contact.email}</div>
            </div>
        </div>
    </div>


    `;
}

function contactEditSingleContactTemplate(i) {
    return `
    
            <div id="render-popup-edit-Contact" class="contacts-overlay">
                <div class="contacts-add-contact fadeInRight">
                    <div class="contacts-add-contact-left">
                        <img src="./assets/img/side-bar-join-logo.svg" alt="Join">
                        <h1>Edit Contact</h1>
                        <hr>
                    </div>
                    <div class="contacts-add-contact-right">
                        <img class="contacts-full" src="./assets/img/icons/contacs-x.svg"
                            onclick="contactsCloseOverlayEdit()" alt="X">
                        <img class="contacts-white-edit" src="./assets/img/icons/X-white.png"
                            onclick="contactsCloseOverlayEdit()" alt="X">
                        <div class="contact-img">
                            <div class="contact-initals-big">CB</div>
                    </div>
                    
                        <form class="form-mobile" action="" onsubmit="saveContact(); return false">
                            <div class="contacts-input-with-icon">
                                <input type="text" required required pattern="[a-zA-ZäöüÄÖÜß]+\s[a-zA-ZäöüÄÖÜß]+"
                                    placeholder="Name" value="Carmen Birkle"
                                    title="Gebe Deinen Vor- und Nachnamen an (2 Wörter)">
                                <span class="contacts-icon-name"></span>
                            </div>

                            <div class="contacts-input-with-icon">
                                <input class="contacts-email" type="email" required placeholder="Email"
                                    value="carmen@test.de">
                                <span class="contacts-icon-email"></span>
                            </div>

                            <div class="contacts-input-with-icon">
                                <input type="tel" required placeholder="Phone" pattern="[0-9]+-[0-9]+"
                                    value="0123-45678" title="Das Format sollte diesem Schema entsprechen: 0123-456789">
                                <span class="contacts-icon-phone"></span>
                            </div>

                            <div class="contacts-btn-container-edit">
                                <button type="submit" class="contacts-btn-save-contact">Save</button>
                            </div>

                        </form>
                    </div>
                </div>

        </div>
    
    `;
}