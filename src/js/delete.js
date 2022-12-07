function confirmDelete(event) {
    if(event.target.id !== "delete")
        return;

    //Add form in so delete button will submit properly to confirm the delete
    setTimeout(function () {
        let form = document.createElement("form");
        form.id = "deleteForm";
        form.name = "deleteForm";
        form.style = "display: inline;";
        document.getElementById("deleteDiv").prepend(form);

        //Change button text to confirmation message
        event.target.innerHTML = "Confirm Delete";
        event.target.onclick = "";
    },0);
}