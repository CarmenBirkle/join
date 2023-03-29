function getUserLeftTemplate(i){
return `
            <div class="contacts-information-top">
                <div class="contact-icon">
                    <div class="contact-initals-big">CB</div>
                </div>
                <div class="contact-info-top-right">
                    <div class="contact-name">Carmen Birkle</div>
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
                    test@test.de
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Phone
                    </div>
                    <div class="contacts-info-botton-content">
                        +49 123 456 456 
                    </div>
                </div>
            </div>
            </div>
`;
}

function mobileLeftTemplate(i){
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
                <div class="contact-icon-mobile">
                    <div class="contact-initals-big">CB</div>
                </div>
                <div class="contact-info-top-right">
                    <div class="contact-name">Carmen Birkle</div>
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
                    test@test.de
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Phone
                    </div>
                    <div class="contacts-info-botton-content">
                        +49 123 456 456 
                    </div>
                </div>
            </div>
            <div class="btn-mobil-edit"> 
                <img src="./assets/img/icons/contacts-edit-mobile.png" alt="edit">
            </div>
    </div>
    `;
}