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