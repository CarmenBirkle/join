// global variables for ALL html sites / used by ALL html sites

//TEST
let currentDraggedElement = 0;
let currentLoggedInUser = 0;
let users = [               // JSON array with all data for every user, saved on backend server
    // LISTE DER ARRAYS DIE IN DAS USERS JSON KOMMEN ---> 
    // contacts[], alles aus den add task []?,...
    {
        'name': 'max', 
        'email': 'max@test.de', 
        'password': 'test', 
        'tasks': [{
            'number': 1,
            'title': 'Call potential clients',
            'description': 'Make the product presentation to prospective buyers',
            'categoryColor': '#FC71FF',
            'categoryType': 'Sales',
            'category': 'to-do',
            'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
            'date': 05-08-2022,
            'prio': 'Urgent',
            'subtask': ''
        }, {
            'number': 2,
            'title': 'Call potential clients',
            'description': 'Make the product presentation to prospective buyers',
            'categoryColor': '#FC71FF',
            'categoryType': 'Sales',
            'category': 'in-progress',
            'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
            'date': 05-08-2022,
            'prio': 'Urgent',
            'subtask': ''
        }
        ],
        'contacts': []
    },
    {
        'name': 'marie', 
        'email': 'marie@test.de', 
        'password': 'test', 
        'tasks': [{
            'number': 1,
            'title': 'Call potential clients',
            'description': 'Make the product presentation to prospective buyers',
            'categoryColor': '#FC71FF',
            'categoryType': 'Sales',
            'category': 'to-do',
            'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
            'date': 05-08-2022,
            'prio': 'Urgent',
            'subtask': ''
        }, {
            'number': 2,
            'title': 'Call potential clients',
            'description': 'Make the product presentation to prospective buyers',
            'categoryColor': '#FC71FF',
            'categoryType': 'Sales',
            'category': 'in-progress',
            'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
            'date': 05-08-2022,
            'prio': 'Urgent',
            'subtask': ''
        }
        ], 'contacts': []
    }
];

//TEST ENDE

// main java-script file , side behavior an all pages, menue
let activLogOutArea = false;
const activePage = window.location.pathname; // get the current pathname from window.location
setURL('https://gruppenarbeit-502-join.developerakademie.net/smallest_backend_ever');

async function init() {
    await includeHTML();
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];

    handleWindowResize(); // TODO Final info rausnehmen    
}

function handleWindowResize() {
    try {
        handleWindowResizeContacs()
        getSortListofContacts();
        contactsShowContactlist(sortContacts);
    } catch (error) {
        //do nothing, then the corresponding js file is not included, because not relevant an this page
    }
}

async function includeHTML(currentPage) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            getElement()
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function showLogOut() {
    document.getElementById('header-log-out').classList.remove('header-d-none');
}

function logout() {
    window.location.href = 'index.html';
}

function toggleShowLogOutArea() {
    if (activLogOutArea) {
        document.getElementById('header-log-out').classList.add('header-d-none');
        activLogOutArea = false;
    } else {
        document.getElementById('header-log-out').classList.remove('header-d-none');
        activLogOutArea = true;
    }
}

// is called in includeHTML-function. gets the current window-location as ID and added the blue focus
function getElement() {
    let tempTrimmed = activePage.replace(/^\/|\.html$/g, "");
    let activePageAsID = "side-bar-" + tempTrimmed;

    let currentSideElement = document.getElementById(activePageAsID);
    if (currentSideElement !== null) {
        currentSideElement.classList.add('side-bar-position');
    }
}














