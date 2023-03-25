function sendMailConfirm(){
    document.getElementById('send-mail-confirm').classList.remove('d-none');
    setTimeout(hideMailConfirm, 3000);
}

function hideMailConfirm(){
    document.getElementById('send-mail-confirm').classList.add('d-none');
    window.location.replace("reset-password.html");
}

function sendNewPasswordConfirm(){
    document.getElementById('send-new-password-confirm').classList.remove('d-none');
    setTimeout(hidePasswordConfirm, 3000);
}

function hidePasswordConfirm(){
    document.getElementById('send-new-password-confirm').classList.add('d-none');
    window.location.replace("index.html");
}