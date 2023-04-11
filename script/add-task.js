/**
 * add-task.js contains all functions that are relevant for the add-task.html and task-template.html
 * @author Daniel Hartmann
 * @version 1.0
 */

/**
 * All global variables in add task.
 * @param {Array}
 */
const allCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];
let addSubtasks = [];
let assignedToUsers = [];
/**
 * All global validation variables for form validation.
 *  @param {Array}
 */
let chosenCategoryColor = [];
let chosenCategoryType = [];
let chosenAssignedTo = [];
let chosenPrioButton = [];
let chosenSubtasks = []; // not a required field
/**
 * @param {Array} tasks - Array of tasks (for backend).
 */
let tasks = [];

/**
 * Load content from backend (contacts, users, tasks) and start the initAddTaskTemplates() function.
 * @async - await init(); (backend connection)
 */
async function initAddTask() {
    await init();
    initAddTaskTemplates();
}

/**
 * To initialize all functions on the add task.html and task-template.html file that are required for building the page.
 * 
 */
function initAddTaskTemplates() {
    initCategory();
    initAssignedTo();
    initDueDate();
    initPrioButtons();
    initSubtask();
}

/*-- Category --*/
/**
 * Generate the CategoryHTML from the add-task-template.js.
 * 
 */
function initCategory() {
    document.getElementById('add-task-category-render').innerHTML = loadCategoryHTML();
    document.getElementById('add-task-new-category-dots').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = '';
}

/**
 * Render the dropdown menu and render the top section from the category.
 * 
 */
function openCategoryDropdown() {
    document.getElementById('add-task-category-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-assignedto-dropdown').classList.add('d-none');
    document.getElementById('add-task-new-category-error').innerHTML = '';
    renderTopCategory();
    renderCategorySelection();
}

/**
 * Render the top section from the category and open the placeholder.
 * 
 */
function renderTopCategory() {
    document.getElementById('add-task-category-dropdown-top').innerHTML = '';
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopPlaceholderHTML('Select task category');
}

/**
 * Render the new category field in the dropdown.
 * Render the category selection in the category dropdown using the global array defaultCategoryColor.
 */
function renderCategorySelection() {
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = openNewCategoryHTML();

    for (let j = 0; j < defaultCategoryColor.length; j++) {
        let color = defaultCategoryColor[j];
        let type = defaultCategoryType[j];

        document.getElementById('add-task-category-dropdown').innerHTML += openCategorysHTML(color, type);
    }
}

/**
 * Renders the selected section and shows them int the category top.
 * Dropdown will be closed.
 * @param {String} color -The color of the defaultCategoryColor, represented as a hexadecimal string.
 * @param {String} type - The type of the defaultCategoryType, represented as a string.
 */
function setCategory(color, type) {
    choseCategory(color, type);
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(color, type);
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').classList.add('d-none');
}

/**
 * Render the new-category inputfield in the top section in category.
 * Renders a selection of colorful dots.
 */
function renderNewCategory() {
    document.getElementById('add-task-category-render').innerHTML = '';
    document.getElementById('add-task-category-render').innerHTML = openNewCategorySelectHTML();
    renderNewCategoryDots();
}

/**
 * Renders a selection of colorful dots for the new-category.
 * 
 */
function renderNewCategoryDots() {
    document.getElementById('add-task-new-category-dots').innerHTML = '';

    for (let i = 0; i < allCategoryColor.length; i++) {
        let dotColor = allCategoryColor[i];
        document.getElementById('add-task-new-category-dots').innerHTML += openNewCategoryDotsHTML(dotColor, i);
    }
}

/*-- Category add new Category --*/
/**
 * push the selected dot, from the new-category selection in the chosenCategoryColor array (for form validation).
 * @param {String} dotColor - The color of the celected color dot, represented as a hexadecimal string.
 * @param {Number} i - The index of the current iteration in the loop that generates the color dots.
 */
function saveNewColor(dotColor, i) {
    chosenCategoryColor = [];
    chosenCategoryColor.push(dotColor);
    renderNewCategoryDots();
    document.getElementById(`selected-dot-active${i}`).classList.add('dropdown-option-dots-selected');
}

/**
 * Handles the keydown event for the "Add New Category" input field. 
 * @param {event} event - This parameter is used to detect if the user has pressed the "Enter" key, and if so,
 *                      to prevent the default form submission behavior.
 */
function saveNewCategoryEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        saveNewCategory();
    }
}

/**
 * 1. Validate the new-category input field and selected dot-color.
 * 2. Pushes the input value from the 'New Category' input field
 * into an array(defaultCategoryType) and saves it when a new option is selected in this section.
 * 2. Pushes the selected dot-color from the 'New Category'
 * into an array(defaultCategoryColor) and saves it when a new option is selected in this section.
 */
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

/**
 * Shows the value from the new-category input field and the selected dot-color.
 */
function renderTopNewCategory() {
    let newColor = defaultCategoryColor[defaultCategoryColor.length - 1];
    let newType = defaultCategoryType[defaultCategoryType.length - 1];

    choseCategory(newColor, newType);
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(newColor, newType);
}

/**
 * Shows an error if no category was selected. (form validation)
 */
function renderCategoryError() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = addTaskErrorHTML('Please select a category name and pick a color');
}

/**
 * Shows a message when a new category is added to the category dropdown menu.
 */
function addedNewCategoryMessage() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = addTaskMessageHTML('Added new category');
    setTimeout(() => {
        document.getElementById('add-task-new-category-error').innerHTML = '';
    }, 2000)
}

/*-- Assigned-To --*/
/**
 * Generate the loadAssignedToHTML from the add-task-template.js.
 * Executes the functions that renders the names and the new-contact field.
 */
function initAssignedTo() {
    document.getElementById('add-task-assignedto-render').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assignedto-render').innerHTML = loadAssignedToHTML();
    renderAssignedToSelection();
    renderInviteNewContact();
}

/**
 * Open the dropdown form the assigned to section.
 * 
 */
function openAssignedToDropdown() {
    document.getElementById('add-task-assignedto-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-category-dropdown').classList.add('d-none');
    renderTopAssigendTo();
}

/**
 * Render the top section from the Assigned to and open the placeholder.
 * 
 */
function renderTopAssigendTo() {
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = openTopPlaceholderHTML('Select contacts to assign');
}

/**
 * Render the new-contact field.
 * 
 */
function renderInviteNewContact() {
    document.getElementById('add-task-assignedto-dropdown').innerHTML += openInviteNewContactHTML();
}

/**
 * Render the fullname / email / bgColor / initals from the contacts (backend).
 * The fullname will be show in the dropdown assigned section.
 */
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

/**
 * Render the input field from the new-contact that allows searching by email.
 * 
 */
function renderAssignedToNewContact() {
    document.getElementById('add-task-assignedto-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('add-task-add-new-contact-section').innerHTML = openNewContactSelectHTML();
}

/**
 * Handles the keydown event for the "Serach New Contact" input field. 
 * @param {event} event - This parameter is used to detect if the user has pressed the "Enter" key, and if so,
 *                      to prevent the default form submission behavior.
 */
function searchNewContactEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        searchNewContact();
    }
}

/**
 * Searches the dropdown section for the entered email(assigned-new-contact-input).
 * Validate the value from the assigned-new-contact-input.
 */
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

/**
 * If you click on the cross, the assigned-new-contact-input will be closed.
 * 
 */
function renderTopAssigendToAfterNewContact() {
    document.getElementById('add-task-add-new-contact-section').innerHTML = '';
    document.getElementById('add-task-add-new-contact-section').innerHTML = openTopAssignedToHTML();
}

/**
 * Searches for a contact in the `contacts` array with the specified email address and 
 * pushes the contact's initials and bgColor into the `assignedToUsers` array, if not already present.
 * @param {String} emailInput - the value form the assigned-new-contact input field.
 */
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

/**
 * Toggles the checkbox state of the assigned-to user and 
 * updates the assignedToUsers array with the user's background color and initials.
 * @param {event} event - The event object.
 * @param {String} bgColor - The background color of the user in the contacts array as rgb.
 * @param {String} initals - The initials of the user in the contacts array.
 */
function toggleCheckboxAssigned(event, bgColor, initals) {
    let divContainerAssigned = event.target.closest('.add-task-dropdown-option');
    let checkboxAssigned = divContainerAssigned.querySelector('.validate-assignedto-checkbox');

    if (divContainerAssigned === event.target) {
        checkboxAssigned.checked = !checkboxAssigned.checked;
    }

    updateAssignedToUsers(checkboxAssigned, bgColor, initals);
    renderAssignedUsers();
}

/**
 * Updates the assignedToUsers array based on the checkbox state of the assigned user.
 * @param {Object} checkboxAssigned - The HTML checkbox element representing the assigned user.
 * @param {String} bgColor - The background color of the user in the contacts array as rgb.
 * @param {String} initals - The initials of the user in the contacts array.
 */
function updateAssignedToUsers(checkboxAssigned, bgColor, initals) {
    let index = assignedToUsers.findIndex(userInfo => userInfo.bgColor === bgColor && userInfo.initals === initals);
    // prevent multi generate
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

/**
 * Render the user icons, after selected them.
 * 
 */
function renderAssignedUsers() {
    document.getElementById('add-task-assigned-users').innerHTML = '';
    for (let i = 0; i < assignedToUsers.length; i++) {
        let bgColor = assignedToUsers[i].bgColor;
        let initals = assignedToUsers[i].initals;
        document.getElementById('add-task-assigned-users').innerHTML += openAssignedUserHTML(bgColor, initals);
    }
}

/**
 * Shows an error if no user was selected. (form validation)
 * 
 */
function renderAssignedToError() {
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = addTaskErrorHTML('Please select a Contact');
}


/*-- Due Date --*/
/**
 * Generate the due-date input field from the add-task-template.js.
 * min date = current date
 */
function initDueDate() {
    document.getElementById('add-task-due-date').innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('add-task-due-date').innerHTML = loadDueDateHTML(today);
}

/*-- Prio --*/
/**
 * Generate the prio buttons from array prioButtons.
 * 
 */
function initPrioButtons() {
    const prioButtons = ['urgent', 'medium', 'low'];
    document.getElementById('add-task-priobutton-render').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = '';

    for (let i = 0; i < prioButtons.length; i++) {
        let prioName = prioButtons[i];
        let prioNameFormatted = prioName.charAt(0).toUpperCase() + prioName.slice(1).toLowerCase();
        document.getElementById('add-task-priobutton-render').innerHTML += loadPrioButtonsHTML(prioName, prioNameFormatted);
    }
}

/**
 * Save the selected prio button id by pushing the id into the chosenPrioButton array. (validate form)
 * @param {String} prioId - (Id) from prio button (urgent, medium, low).
 */
function setAddTaskPrioButton(prioId) {
    initPrioButtons();

    chosenPrioButton = [];
    chosenPrioButton.push(prioId);

    setPrioButtonDesign(prioId);
}

/**
 * Generate a new design for the selected prio button.
 * @param {String} prioId - (Id) from prio button (urgent, medium, low).
 */
function setPrioButtonDesign(prioId) {
    document.getElementById(`prio-${prioId}`).classList.add(`bg-prio-${prioId}`, 'add-task-font-color');
    document.getElementById(`img-prio-${prioId}`).classList.add('d-none');
    document.getElementById(`img-prio-${prioId}-white`).classList.remove('d-none');
}

/**
 * Shows an error if no prio button was selected. (form validation)
 * 
 */
function renderPrioButtonError() {
    document.getElementById('add-task-prio-button-error').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = addTaskErrorHTML('Please select a Priority');
}

/*-- Subtask --*/
/**
 * Generate the subtask section from the add-task-template.js.
 * 
 */
function initSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
    document.getElementById('add-task-subtask-error').innerHTML = '';
    document.getElementById('add-task-subtask-render').innerHTML = loadSubtaskHTML();
}

/**
 * When the user click on the subtask section 
 * then the subtask input field will be generated and the input field is automatically focused.
 */
function changeSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
    document.getElementById('add-task-subtask-render').innerHTML = openSubtaskInputHTML();
    document.getElementById('add-task-subtask-input').focus();
}

/**
 * Handles the keydown event for the "Subtask" input field. 
 * @param {event} event - This parameter is used to detect if the user has pressed the "Enter" key, and if so,
 *                      to prevent the default form submission behavior.
 */
function addNewSubtaskEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        addNewSubtask();
    }
}

/**
 * Validates the value from the subtask input field.
 * If the input is incorrect, a error will be generate.
 * If the input is correct, the input is pushed into the addSubtasks array and start the renderSubtaskCheckbox() function.
 */
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

/**
 * Generates the subtask checkboxes after correct input from the addSubtasks array.
 * 
 */
function renderSubtaskCheckbox() {
    for (let i = 0; i < addSubtasks.length; i++) {
        let subTaskCheckbox = addSubtasks[i];
        document.getElementById('add-task-subtask-addtask-render').innerHTML += openSubtasksCheckboxHTML(subTaskCheckbox);
    }
}

/*-- Clear Button --*/
/**
 * After pressing the clear button, all input fields and arrays will be reset.
 * 
 */
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

    initAddTaskTemplates();
}

/*-- Form / Create Button --*/
/**
 * Push the selected color and type from category section in the chosenCategoryColor and chosenCategoryType array. (form validate)
 * @param {String} color - The color of the defaultCategoryColor, represented as a hexadecimal string.
 * @param {String} type - The type of the defaultCategoryType, represented as a string.
 */
function choseCategory(color, type) {
    chosenCategoryColor = [];
    chosenCategoryType = [];

    chosenCategoryColor.push(color);
    chosenCategoryType.push(type);
}

/**
 * After click on the create task button the form will be checked and if everything has been filled in correctly, the sendFormToBackend function will be executed.
 * @returns - Check the selected category, elected prio button and assigned user and if nothing has been selected, the function is aborted.
 *            If no category, prio burron or assigned user was selected a error will be created.
 */
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

/**
 * Push the selected assigned user into the chosenAssignedTo array to validate the form.
 * 
 */
function pushChosenAssignedTo() {
    let contactsCheckboxes = document.querySelectorAll('.validate-assignedto-checkbox');
    for (let i = 0; i < contactsCheckboxes.length; i++) {
        if (contactsCheckboxes[i].checked) {
            chosenAssignedTo.push(contactsCheckboxes[i].value);
        }
    }
}

/**
 * Push the selected subtask checkbox into the chosenSubtasks. (not required for the form validation)
 * 
 */
function pushChosenSubtasks() {
    let subtaskCheckboxes = document.querySelectorAll('input[name=subtasks]');
    for (let i = 0; i < subtaskCheckboxes.length; i++) {
        if (subtaskCheckboxes[i].checked) {
            chosenSubtasks.push(subtaskCheckboxes[i].value);
        }
    }
}


/**
 * 1. Disabled the create task button to prevent multible submitting of the form element.
 * 2. Start pushTaskIntoBackend() function.
 * 3. Reset the form by automatic trigger the clear button.
 * 4. Shows the showsAddedTaskAnimation.
 * 5. After sending the form into the backend the create task button will be activated again.
 * @async - pushTaskIntoBackend()
 */
async function sendFormToBackend() {
    try {
        document.getElementById('add-task-create-button').disabled = true;
        document.getElementById('add-task-create-button-media').disabled = true;

        await pushTaskIntoBackend();

        document.getElementById('add-task-clear-button').click(); // reset form
        showsAddedTaskAnimation();
    } catch (error) {
        console.log('An error has occurred!' + error);
    } finally {
        document.getElementById('add-task-create-button').disabled = false;
        document.getElementById('add-task-create-button-media').disabled = false;
    }
}

/**
 * Pushes a new task into the tasks array and sends it to the backend for storage.
 * @async - await backend.setItem('tasks', JSON.stringify(tasks));
 */
async function pushTaskIntoBackend() {
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
    //await backend.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks); // Test !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

/**
 * Converts the selected date from the due-date input field to milliseconds
 * @returns - date in milliseconds.
 */
function dateFormattedMilliseconds() {
    let date = document.getElementById('add-task-input-due-date').value;
    console.log(date); // Test !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let milliseconds = Date.parse(date);
    // TEST
    const Testdate = new Date(milliseconds);
    const formattedDate = Testdate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    console.log(formattedDate);
    //TEST
    return milliseconds;
}

/**
 * Displays an animation to indicate that a task has been added to the tasks array.
 * Adds a CSS class to the "add-task-added" container to trigger the animation, 
 * then removes the class after a specified timeout to reset the animation.
 */
function showsAddedTaskAnimation() {
    const addedContainer = document.getElementById('add-task-added');
    addedContainer.classList.remove('d-none');
    addedContainer.classList.add('add-task-added-animation');
    setTimeout(() => {
        addedContainer.classList.remove('add-task-added-animation');
        addedContainer.classList.add('d-none');
    }, 2000);
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
