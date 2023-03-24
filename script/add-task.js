let allCategoryColor = ['#FC71FF', '#1FD7C1' ,'#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF','#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];


function openCategoryDropdown() {
    document.getElementById('add-task-category-dropdown').classList.toggle('d-none');
    renderTopCategory();
    renderCategorySelection();
}

function renderTopCategory() {
    document.getElementById('add-task-category-dropdown-top').innerHTML = '';
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopCategoryPlaceholderHTML();
}

function renderCategorySelection() {
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = openNewCategoryHTML();

    for(let j=0; j < defaultCategoryColor.length; j++) {
        let color = defaultCategoryColor[j];
        let type = defaultCategoryType[j];

        document.getElementById('add-task-category-dropdown').innerHTML += openCategorysHTML(color, type);
    }
}

function setCategory(color, type) {
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategory(color, type);
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').classList.add('d-none');
}

function openTopCategoryPlaceholderHTML() {
    return`
    <span>Select task category</span>
    <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    `;
}

function openNewCategoryHTML() {
    return`
    <span class="add-task-dropdown-new-category">New Category</span>
    `;
}

function openCategorysHTML(color, type) {
    return `
    <div class="add-task-dropdown-option" onclick="setCategory('${color}', '${type}')">
        <span>${type}</span>
        <div class="dopdown-option-dots" style="background-color: ${color};"></div>
    </div>
     `;
}

function openTopSetCategory(color, type) { // add-task-dropdown-option-selected ohne hover und padding
    return `
    <div class="add-task-dropdown-option">
        <span>${type}</span>
        <div class="dopdown-option-dots" style="background-color: ${color};"></div>
    </div>
    <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
     `;
}