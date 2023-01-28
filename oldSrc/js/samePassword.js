window.addEventListener("load",init);

function init() {
    id("formSubmit").addEventListener("click",checkIdenticalPassword);
}

//Ensures that the user entered in the same new password twice
function checkIdenticalPassword() {
    if(id("newPassword1").value != id("newPassword2").value) {
        alert("The new password does not match the retyped new password. Please ensure the two are identical.");
    }
    else {
        id("changePasswordForm").submit();
    }
}

function id(name) {
    return document.getElementById(name);
}