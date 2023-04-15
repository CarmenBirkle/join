/**
 * This function starts the beginning Join logo animation
 */
function startAnimation(){
    if(screen.width >= 768){
    document.getElementById('login-logo').classList.add('animation');
    setTimeout(showLoginCard, 3000);
    }
    if(screen.width < 768){
        responsiveLogin();
    };
}

function showLoginCard(){
    document.getElementById('login-content').classList.remove('d-none');
    document.getElementById('login-animation-container').classList.add('d-none');
}

function responsiveLogin(){
    document.getElementById('login-logo').classList.add('d-none');
    document.getElementById('login-logo-responsive').classList.remove('d-none');
    document.getElementById('login-logo-responsive').classList.add('animation-responsive');
    setTimeout(showLoginCard, 3000);
}

/**
 * This function animates the "Send Mail" confirmatioon 
 */
function sendMailConfirm(){
    document.getElementById('send-mail-confirm').classList.remove('d-none');
    setTimeout(hideMailConfirm, 3000);
}

function hideMailConfirm(){
    document.getElementById('send-mail-confirm').classList.add('d-none');
    window.location.replace("reset-password.html");
}
/**
 * This function animates the "New Passord set" confirmatioon 
 */
function sendNewPasswordConfirm(){
    document.getElementById('send-new-password-confirm').classList.remove('d-none');
    setTimeout(hidePasswordConfirm, 3000);
}

function hidePasswordConfirm(){
    document.getElementById('send-new-password-confirm').classList.add('d-none');
    window.location.replace("index.html");
}

/**
 * This function logs in a user
 */

function loginUser(){
    let email = document.getElementById('useremail');
    let password = document.getElementById('userpassword');
    let user = users.find( u => u.email == email.value && u.password == password.value) 
    if (user){
        console.log('Form has been submitted. You have been loged in successfully!');
        setCookieUser(user['name']);
        if(document.getElementById("remember-login").checked){
            setCookieRememberUser(user['email'])};
        window.location.replace("summary.html");}
    else{
        console.log('Uupps! You are not registered. Please sign in first.');
        window.location.replace("index.html");
    }
}

/**
 * This function registries a new User and submits the new User Data to the backend server
 * (In this version the users array is reloaded with the original users, so that the array is constant)
 */

function addNewUser(){
    let name = document.getElementById('newusername');
    let email = document.getElementById('newuseremail');
    let password = document.getElementById('newuserpassword');
    users.push({name: name.value, email: email.value, password: password.value});
    backend.setItem('users', JSON.stringify(users));
    console.log('Form has been submitted. You are registered right now!');
    window.location.replace("index.html")
}

function setCookieRememberUser(currentUser){
    let now =  getCookieUserExpireTime();
    document.cookie ="email = " + currentUser + "; expires=" + now.toUTCString() + "; path=/";
 }

 function getCookieUserExpireTime(){
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + (24*1 * 60 * 60 * 1000); //Calculates the miliseconds for 24h  -> 24* 1h * 60 min * 60 sec * 1000 ms
    now.setTime(expireTime); // sets the time to the expiration date
    return now;
  }

  function writeRememberedUserMail(){
    if(document.cookie.includes('@')){
        document.getElementById('useremail').setAttribute("value", `${getcookie(document.cookie.includes('@'))}`);
    }
  }