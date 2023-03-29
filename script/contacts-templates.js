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

    <div class="contacts-titel">
                    <h1>Contacts</h1>
                    <div></div>
                    <h3>Better with a team</h3>
                </div>

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