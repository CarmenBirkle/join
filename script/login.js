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
    document.getElementById('login-logo-responsive').classList.add('animation');
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
