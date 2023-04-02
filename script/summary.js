/**
 * Automatic greetings based on time
 * 
 */
function summaryGreetings() {
    let currentHour = new Date().getHours();
    let greeting;

    if(currentHour < 12) {
        greeting = "Good morning,"
    } else if (currentHour < 18) {
        greeting = "Good afternoon,"
    } else {
        greeting = "Good evening,"
    }

    document.getElementById('summary-greeting').innerHTML = greeting;
}






/////////////////////// TEST FUNCTION //////////////////////////////////

function countUrgent() {
    let urgentCount = 0;
    for (let i = 0; i < users.length; i++) {
        let userTasks = users[i].tasks;
        for (let j = 0; j < userTasks.length; j++) {
            if (userTasks[j].prio === 'Urgent') {
                urgentCount++;
            }
        }
    }
    console.log('Anzahl der Aufgaben mit prio "Urgent": ' + urgentCount);
}

function findDeadline() {

}