
window.addEventListener("load",initAddAccount);

function initAddAccount() {
    document.getElementById("accountFormSubmit").addEventListener("click",verifyNoBlank);
}

//Make sure the user didn't leave important fields blank
function verifyNoBlank() {
    if(this.id != "accountFormSubmit") {
        return;
    }

    if(document.getElementById("email").value == "") {
        alert("Email field cannot be left blank");
    }
    else if(document.getElementById("password").value == "") {
        alert("Password field cannot be left blank");
    }
    else {
        document.getElementById("addAccountForm").submit();
    }
}