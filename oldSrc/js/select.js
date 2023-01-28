window.addEventListener("load",initSelect);

function initSelect() {
    let selects = document.querySelectorAll("select.fillSelect");
    selects.forEach(elem => elem.addEventListener("change",selectChange));
}

// selectChange - called by certain select elements
//  - fills the corresponding text box with the selected option 
function selectChange() {
    let optionText = this.options[this.selectedIndex].value;
    if(optionText == "")
        return;

    let assocTextElem = document.getElementById(this.id.substr(0,this.id.length-"_select".length));
    if(assocTextElem.tagName == "TEXTAREA") {
        assocTextElem.innerHTML = optionText;
    }
    else if(assocTextElem.tagName == "INPUT") {
        assocTextElem.value = optionText;
    }
    this.selectedIndex = 0;
}