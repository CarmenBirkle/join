const allCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];
let addSubtasks = [];
let assignedToUsers = [];

let chosenCategoryColor = []; // validate form
let chosenCategoryType = []; // validate form
let chosenAssignedTo = []; // validate form
let chosenPrioButton = []; // validate form
let chosenSubtasks = []; // validate form

let tasks = [];


/*-- Init All Elements --*/
async function initAddTask() {
    await init();
    initCategory();
    initAssignedTo();
    initDueDate();
    initPrioButtons();
    initSubtask();
}

/*-- Category --*/
function initCategory() {
    document.getElementById('add-task-category-render').innerHTML = loadCategoryHTML();
    document.getElementById('add-task-new-category-dots').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = '';
}

function openCategoryDropdown() {
    document.getElementById('add-task-category-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-assignedto-dropdown').classList.add('d-none');
    document.getElementById('add-task-new-category-error').innerHTML = '';
    renderTopCategory();
    renderCategorySelection();
}

function renderTopCategory() {
    document.getElementById('add-task-category-dropdown-top').innerHTML = '';
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopPlaceholderHTML('Select task category');
}

function renderCategorySelection() {
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = openNewCategoryHTML();

    for (let j = 0; j < defaultCategoryColor.length; j++) {
        let color = defaultCategoryColor[j];
        let type = defaultCategoryType[j];

        document.getElementById('add-task-category-dropdown').innerHTML += openCategorysHTML(color, type);
    }
}

function setCategory(color, type) {
    choseCategory(color, type);
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(color, type);
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').classList.add('d-none');
}

function renderNewCategory() {
    document.getElementById('add-task-category-render').innerHTML = '';
    document.getElementById('add-task-category-render').innerHTML = openNewCategorySelectHTML();
    renderNewCategoryDots();
}

function renderNewCategoryDots() {
    document.getElementById('add-task-new-category-dots').innerHTML = '';

    for (let i = 0; i < allCategoryColor.length; i++) {
        let dotColor = allCategoryColor[i];
        document.getElementById('add-task-new-category-dots').innerHTML += openNewCategoryDotsHTML(dotColor, i);
    }
}

/*-- Category add new Category --*/
function saveNewColor(dotColor, d) {
    chosenCategoryColor = [];
    chosenCategoryColor.push(dotColor);
    renderNewCategoryDots();
    document.getElementById(`selected-dot-active${d}`).classList.add('dropdown-option-dots-selected');
}

function saveNewCategoryEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        saveNewCategory();
    }
}

function saveNewCategory() {
    let newType = document.getElementById('new-category-type-name');

    if (newType.value === '' || chosenCategoryColor.length === 0) {
        renderCategoryError();
    } else {
        defaultCategoryColor = defaultCategoryColor.concat(chosenCategoryColor);
        defaultCategoryType.push(newType.value);
        initCategory();
        renderTopNewCategory();
        addedNewCategoryMessage();
    }
}

function renderTopNewCategory() {
    let newColor = defaultCategoryColor[defaultCategoryColor.length - 1];
    let newType = defaultCategoryType[defaultCategoryType.length - 1];

    choseCategory(newColor, newType);
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(newColor, newType);
}

function renderCategoryError() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = addTaskErrorHTML('Please select a category name and pick a color');
}

function addedNewCategoryMessage() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = addTaskErrorHTML('Added new category');
    setTimeout(() => {
        document.getElementById('add-task-new-category-error').innerHTML = '';
    }, 2000)
}

/*-- Assigned-To --*/
function initAssignedTo() {
    document.getElementById('add-task-assignedto-render').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assignedto-render').innerHTML = loadAssignedToHTML();
    renderAssignedToSelection();
    renderInviteNewContact();
}

function openAssignedToDropdown() {
    document.getElementById('add-task-assignedto-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-category-dropdown').classList.add('d-none');
    renderTopAssigendTo();
}

function renderTopAssigendTo() {
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = openTopPlaceholderHTML('Select contacts to assign');
}

function renderInviteNewContact() {
    document.getElementById('add-task-assignedto-dropdown').innerHTML += openInviteNewContactHTML();
}


function renderAssignedToSelection() {
    document.getElementById('add-task-assignedto-dropdown').innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].fullname;
        const email = contacts[i].email;
        const bgColor = contacts[i].bgcolor;
        const initals = contacts[i].initals;
        document.getElementById('add-task-assignedto-dropdown').innerHTML += openAssignedListHTML(name, email, bgColor, initals);
    }
}

function renderAssignedToNewContact() {
    document.getElementById('add-task-assignedto-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('add-task-add-new-contact-section').innerHTML = openNewContactSelectHTML();
}

function searchNewContactEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        searchNewContact();
    }
}

function searchNewContact() {
    let emailInput = document.getElementById('assigned-new-contact-input').value;
    let checkEmail = document.querySelector(`input[type="checkbox"][name="${emailInput}"]`);
    if (checkEmail) {
        checkEmail.checked = true;
        renderTopAssigendToAfterNewContact();
        searchNewContactPushUser(emailInput);
        renderAssignedUsers();
    } else {
        document.getElementById('add-task-assigned-error').innerHTML = addTaskErrorHTML(`${emailInput} email not found!`);
        document.getElementById('assigned-new-contact-input').focus();
    }
    setTimeout(() => {
        document.getElementById('add-task-assigned-error').innerHTML = '';
    }, 2000);
}

function renderTopAssigendToAfterNewContact() {
    document.getElementById('add-task-add-new-contact-section').innerHTML = '';
    document.getElementById('add-task-add-new-contact-section').innerHTML = openTopAssignedToHTML();
}

function searchNewContactPushUser(emailInput) {
    const selectedContact = contacts.find(contact => contact.email === emailInput);
    let bgColor = selectedContact.bgcolor;
    let initals = selectedContact.initals;
    let index = assignedToUsers.findIndex(userInfo => userInfo.bgColor === bgColor && userInfo.initals === initals);
    // prevent multi generate
    if (index === -1) {
        assignedToUsers.push({ bgColor: bgColor, initals: initals });
    }
}

function toggleCheckboxAssigned(event, bgColor, initals) {
    let divContainerAssigned = event.target.closest('.add-task-dropdown-option');
    let checkboxAssigned = divContainerAssigned.querySelector('.validate-assignedto-checkbox');

    if (divContainerAssigned === event.target) {
        // Wenn das DIV-Element geklickt wurde, toggle den Zustand der Checkbox
        checkboxAssigned.checked = !checkboxAssigned.checked;
    }

    updateAssignedToUsers(checkboxAssigned, bgColor, initals);
    console.log(assignedToUsers); // TEST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    renderAssignedUsers();
}

function updateAssignedToUsers(checkboxAssigned, bgColor, initals) {
    let index = assignedToUsers.findIndex(userInfo => userInfo.bgColor === bgColor && userInfo.initals === initals);

    if (checkboxAssigned.checked) {
        if (index === -1) {
            assignedToUsers.push({ bgColor: bgColor, initals: initals });
        }
    } else {
        if (index !== -1) {
            assignedToUsers.splice(index, 1);
        }
    }
}

function renderAssignedUsers() {
    document.getElementById('add-task-assigned-users').innerHTML = '';
    for (let i = 0; i < assignedToUsers.length; i++) {
        let bgColor = assignedToUsers[i].bgColor;
        let initals = assignedToUsers[i].initals;
        document.getElementById('add-task-assigned-users').innerHTML += openrenderAssignedUser(bgColor, initals);
    }
}

function renderAssignedToError() {
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = addTaskErrorHTML('Please select a Contact');
}


/*-- Due Date --*/
function initDueDate() {
    document.getElementById('add-task-due-date').innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('add-task-due-date').innerHTML = renderDueDate(today);
}


/*-- Prio --*/
function initPrioButtons() {
    const prioButtons = ['urgent', 'medium', 'low'];
    document.getElementById('add-task-priobutton-render').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = '';

    for (let i = 0; i < prioButtons.length; i++) {
        let prioName = prioButtons[i];
        let prioNameFormatted = prioName.charAt(0).toUpperCase() + prioName.slice(1).toLowerCase();
        document.getElementById('add-task-priobutton-render').innerHTML += openPrioButtonsHTML(prioName, prioNameFormatted);
    }
}

function setAddTaskPrioButton(prioId) {
    initPrioButtons();

    chosenPrioButton = [];
    chosenPrioButton.push(prioId);

    setPrioButtonDesign(prioId);
}

function setPrioButtonDesign(prioId) {
    document.getElementById(`${prioId}`).classList.add(`bg-${prioId}`, 'add-task-font-color');
    document.getElementById(`img-${prioId}`).classList.add('d-none');
    document.getElementById(`img-${prioId}-white`).classList.remove('d-none');
}

function renderPrioButtonError() {
    document.getElementById('add-task-prio-button-error').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = addTaskErrorHTML('Please select a Priority');
}

/*-- Subtask --*/
function initSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
    document.getElementById('add-task-subtask-error').innerHTML = '';
    document.getElementById('add-task-subtask-render').innerHTML = loadSubtaskHTML();
}

function changeSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
    document.getElementById('add-task-subtask-render').innerHTML = openSubtaskInput();
    document.getElementById('add-task-subtask-input').focus();
}

function addNewSubtaskEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        addNewSubtask();
    }
}

function addNewSubtask() {
    document.getElementById('add-task-subtask-error').innerHTML = '';
    let subtaskInput = document.getElementById('add-task-subtask-input');
    if (subtaskInput.value === "") {
        document.getElementById('add-task-subtask-error').innerHTML = addTaskErrorHTML('Please write a subtask');
        subtaskInput.focus();
    } else {
        addSubtasks.push(subtaskInput.value);
        subtaskInput.value = "";
        subtaskInput.focus();

        document.getElementById('add-task-subtask-addtask-render').innerHTML = '';
        renderSubtaskCheckbox();
    }
}

function renderSubtaskCheckbox() {
    for (let i = 0; i < addSubtasks.length; i++) {
        let subTaskCheckbox = addSubtasks[i];
        document.getElementById('add-task-subtask-addtask-render').innerHTML += openSubtasksCheckboxHTML(subTaskCheckbox);
    }
}

/*-- Clear Button --*/
function clearAddTask() {
    chosenCategoryColor = [];
    chosenCategoryType = [];
    chosenAssignedTo = [];
    chosenPrioButton = [];
    chosenSubtasks = [];
    addSubtasks = [];
    assignedToUsers = [];
    document.getElementById('add-task-subtask-addtask-render').innerHTML = '';
    document.getElementById('add-task-assigned-users').innerHTML = '';

    initAddTask();
}

/*-- Form / Create Button --*/
function choseCategory(color, type) {
    chosenCategoryColor = [];
    chosenCategoryType = [];

    chosenCategoryColor.push(color);
    chosenCategoryType.push(type);
}

function validateForm() {
    if (chosenCategoryType.length === 0 || chosenCategoryColor.length === 0) {
        renderCategoryError();
        return;
    } if (chosenPrioButton.length === 0) {
        renderPrioButtonError();
        return;
    }
    pushChosenAssignedTo();
    if (chosenAssignedTo.length === 0) {
        renderAssignedToError();
        return;
    }
    pushChosenSubtasks(); // not a required field
    sendFormToBackend();
}

function pushChosenAssignedTo() {
    let contactsCheckboxes = document.querySelectorAll('.validate-assignedto-checkbox');
    for (let i = 0; i < contactsCheckboxes.length; i++) {
        if (contactsCheckboxes[i].checked) {
            chosenAssignedTo.push(contactsCheckboxes[i].value);
        }
    }
}

function pushChosenSubtasks() {
    let subtaskCheckboxes = document.querySelectorAll('input[name=subtasks]');
    for (let i = 0; i < subtaskCheckboxes.length; i++) {
        if (subtaskCheckboxes[i].checked) {
            chosenSubtasks.push(subtaskCheckboxes[i].value);
        }
    }
}

async function sendFormToBackend() {
    try {
        const button = document.getElementById('add-task-create-button');
        const buttonMedia = document.getElementById('add-task-create-button-media');
        button.disabled = true;
        buttonMedia.disabled = true;

        let title = document.getElementById('add-task-input-title').value;
        let description = document.getElementById('add-task-input-description').value;
        let categoryColor = chosenCategoryColor[0];
        let categoryType = chosenCategoryType[0];
        let contact = chosenAssignedTo;
        let prio = chosenPrioButton[0];
        let subtask = chosenSubtasks;

        let task = {
            'number': tasks.length + 1,
            'title': title,
            'description': description,
            'categoryColor': categoryColor,
            'categoryType': categoryType,
            'category': 'to-do',
            'contact': contact,
            'date': dateFormattedMilliseconds(),
            'prio': prio,
            'subtask': subtask
        }

        tasks.push(task);
        console.log(tasks); // Test
        //sendTaskToUsers(task); // Test

        let clearButton = document.getElementById('add-task-clear-button');
        clearButton.click();

        const addedContainer = document.getElementById('add-task-added');
        addedContainer.classList.add('add-task-added-animation');
        addedContainer.classList.remove('d-none');
        setTimeout(() => {
            addedContainer.classList.remove('add-task-added-animation');
            addedContainer.classList.add('d-none');
        }, 2000);
    } catch (error) {
        console.log('An error has occurred!' + error);
    } finally {
        const button = document.getElementById('add-task-create-button');
        const buttonMedia = document.getElementById('add-task-create-button-media');
        button.disabled = false;
        buttonMedia.disabled = false;
    }
}

function dateFormattedMilliseconds() {
    let date = document.getElementById('add-task-input-due-date').value;
    let isoDate = date.split('-').reverse().join('-');
    let milliseconds = Date.parse(isoDate);
    return milliseconds;
}




/////////////////////// TEST FUNCTION //////////////////////////////////
/*
async function sendTaskToUsers(task) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        for (let j = 0; j < task.contact.length; j++) {
            if (task.contact.includes(user.name) && task.contact[j] === user.name) {
                user.tasks.push(task);
                console.log(`Task added to user "${user.name}"`, users);
            }
        }
    }
}*/

/*
async function sendTaskToUsers(task) {
    let usersWithTask = []; // leeres Array für User, die den Task erhalten sollen

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        for (let j = 0; j < task.contact.length; j++) {
            if (task.contact.includes(user.name) && task.contact[j] === user.name) {
                usersWithTask.push(user); // User zum Array hinzufügen
                console.log(`Task added to user "${user.name}"`, users);
            }
        }
    }

    // Schleife über das Array mit den Usern, die den Task erhalten sollen
    for (let i = 0; i < usersWithTask.length; i++) {
        const user = usersWithTask[i];
        user.tasks.push(task);
    }
}
*/
