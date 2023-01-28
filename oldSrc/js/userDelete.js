
window.addEventListener("load",initUserDelete);

function initUserDelete() {
    document.querySelectorAll(".deleteUser").forEach((elem) => {
        elem.addEventListener("click",confirmUserDelete);
    });
}

function confirmUserDelete() {
    if(!this.classList.contains("deleteUser") || this.type == 'submit') {
        return;
    }
    let deleteButton = this;

    setTimeout(function () {
        deleteButton.innerHTML = "Confirm Delete";
        deleteButton.type = "submit";
        deleteButton.removeEventListener("click",confirmDelete);
    }, 0);
}