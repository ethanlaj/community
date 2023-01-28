let global_idnum = 1;
let global_constraint_ids = [];
let availableRecords = {};
console.log(tables);

window.addEventListener('load',function() {
    id('addTable').addEventListener("click",addTableOption);
    qsa('.chooseTable').forEach((elem) => {elem.addEventListener('change',tableChange);});
    qsa('.chooseColumn').forEach((elem) => {elem.addEventListener('change',disableColumnOptions);});
});

// Called when a table select changes and updates the columns of the columnSelect
function tableChange() {
    let tableName = this.selectedOptions[0].value;
    let idnum = this.id.substr("chooseTable".length);
    let colSel = id('chooseColumn'+idnum);
    colSel.innerHTML = '<option></option>';

    if(tableName == '') {
        return;
    }
    tables[tableName].columns.forEach((col) => {
        if(col.fk) {
            //TODO
        }
        else if(!col.pk) {
            colSel.innerHTML += '<option value="'+col.name+'">'+col.dispName+'</option>';
        }
    });
    disableColumnOptions();
}
// Disables items in the column selects so the same column can't be selected twice
function disableColumnOptions() {
    //Step 1: Build arrays of all used columns
    let tableSelectElems = qsa('.chooseTable');
    let usedTableColumns = {};
    for(let i=0; i < tableSelectElems.length; i++) {
        let sel = tableSelectElems[i];
        if(sel.selectedIndex == 0)
            continue;
        let tableName = sel.options[sel.selectedIndex].value;
        if(usedTableColumns[tableName] == null) {
            usedTableColumns[tableName] = [];
        }
        //Specify that the column is used
        usedTableColumns[tableName][id("chooseColumn"+sel.id.substr("chooseTable".length)).selectedIndex] = true;
    }
    
    //Step 2: Disable used columns
    for(let i=0; i < tableSelectElems.length; i++) {
        let sel = tableSelectElems[i];
        let tableName = sel.options[sel.selectedIndex].value;
        let elem = id("chooseColumn"+sel.id.substr("chooseTable".length));
        
        for(let j=1; j < elem.length; j++) {
            elem.options[j].disabled = usedTableColumns[tableName][j] != null && j != elem.selectedIndex;
        }
    }
}

// Re-checks what records have been configured to be available
function recalculateAvailRecs() {
    availableRecords = {};
    qsa('.tableSelect').forEach((elem) => {
        let idnum = elem.id.substr("tableSelect".length);
        let selectedTable = elem.selectedOptions[0].value;
        if(selectedTable != "") {
            let recordMode = "create";
            //Get selected option from radio button group
            qsa('input[name="recordOption'+idnum+'"]').forEach((elem) => {
                if(elem.checked) {
                    recordMode = elem.value;
                }
            });
            let constraints = {};
            constraints["recordMode"] = recordMode;

            if(recordMode != "create") {
                //Build constraints array by pulling from csvSel and datSel select elements
                qsa(".csvSel"+idnum).forEach((csvSel) => {
                    //Get select for database column
                    let datSel = qs("select[name=datSel" + csvSel.name.substr("csvSel".length) + "]");

                    if(datSel.selectedIndex <= 0 || csvSel.selectedIndex <= 0) {
                        return;
                    }
                    constraints[csvSel.selectedOptions[0].value] = datSel.selectedOptions[0].value;
                });
            }
            availableRecords[selectedTable] = constraints;
        }
    });
    id("availableRecords").value = JSON.stringify(availableRecords);
    updateTableAvailability();
    reduceTableOptions();
    disableColumnOptions();
}

// Updates what tables the user can select from
function updateTableAvailability() {
    qsa('.chooseTable').forEach((elem) => {
        let selected = "";
        if(elem.selectedOptions[0].value in availableRecords) {
            selected = elem.selectedOptions[0].value;
        }
        elem.innerHTML = '<option></option>';
        for (const [key, value] of Object.entries(availableRecords)) {
            elem.innerHTML += `<option value="${key}">${tableNames[key]}</option>`;
        }
        for(let i=0; i<elem.length; i++) {
            if(elem.options[i].value == selected) {
                elem.selectedIndex = i;
            }
        }
        
        if(selected == "") {
            let idnum = elem.id.substr("chooseTable".length);
            let colSel = id('chooseColumn'+idnum);
            colSel.innerHTML = '<option></option>';
        }
    });
}

//Creates a new row in the 'Database Record Selection' table
function addTableOption() {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');

    let tableSelect = document.createElement('select');
    tableSelect.id = "tableSelect"+global_idnum;
    tableSelect.name = "tableSelect"+global_idnum;
    tableSelect.classList.add('tableSelect');
    tableSelect.appendChild(document.createElement("option"));
    tableSelect.addEventListener('change',tableSelectChange);
    for (const [key, value] of Object.entries(tableNames)) {
        let opt = document.createElement("option");
        opt.value = key;
        opt.innerText = value;
        tableSelect.appendChild(opt);
    }
    td1.innerHTML = 'Table: ';
    td1.appendChild(tableSelect);
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.innerText = "x";
    deleteButton.style = "color: firebrick; margin-left: 10px;";
    deleteButton.addEventListener('click',deleteTableOption);
    td1.appendChild(deleteButton);

    let td2 = document.createElement('td');
    td2.id = 'recordmode'+global_idnum;
    td2.innerHTML = '<input type="radio" id="createRadio'+global_idnum+'" name="recordOption'+global_idnum+'" class="optionRadio" onchange="radioButtonChange(event)" value="create"><label for="createRadio'+global_idnum+'">Create new record</label>';
    td2.innerHTML += '<BR/><input type="radio" id="updateRadio'+global_idnum+'" name="recordOption'+global_idnum+'" class="optionRadio" onchange="radioButtonChange(event)" value="update"><label for="updateRadio'+global_idnum+'">Update existing record</label>';
    td2.innerHTML += '<BR/><input type="radio" id="createupdateRadio'+global_idnum+'" name="recordOption'+global_idnum+'" class="optionRadio" onchange="radioButtonChange(event)" value="createupdate"><label for="createupdateRadio'+global_idnum+'">Create or update record</label>';
    td2.classList.add('hidden');

    let td3 = document.createElement('td');
    td3.id = 'constraintslist'+global_idnum;
    td3.innerHTML = 'Based On:<BR/>';
    let addBtn = document.createElement('button');
    addBtn.id = "addBtn" + global_idnum;
    addBtn.type = "button";
    addBtn.innerText = "Add Constraint";
    addBtn.addEventListener("click",addConstraint);
    td3.appendChild(addBtn);
    td3.classList.add('hidden');
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    id('addTable').parentElement.parentElement.insertAdjacentElement('beforebegin',tr);
    global_idnum++;
    reduceTableOptions();
}
//Removes a table option by deleting the <tr> that contains it
function deleteTableOption() {
    this.parentElement.parentElement.remove();
    recalculateAvailRecs();
}

function tableSelectChange(event) {
    let table = this.value;
    let idnum = this.id.substr("tableSelect".length);

    if(table != '') {
        id('recordmode'+idnum).classList.remove("hidden");
    }
    else {
        //If no table is selected, hide options
        id('recordmode'+idnum).classList.add('hidden');
    }
    id('createRadio'+idnum).checked = true;
    //delete all configuration that was done for that table
    let constraints = id('constraintslist'+idnum);
    constraints.classList.add('hidden');
    for(let i=0; i < constraints.childNodes.length; i++) {
        let elem = constraints.childNodes[i];
        if(elem.tagName != null && elem.tagName.toUpperCase() == 'DIV') {
            elem.remove();
            i--;
        }
    }
    recalculateAvailRecs();
}
// Changes all the tableSelect select elements to disable already chosen tables
function reduceTableOptions() {
    //Figure out what tables are already in use
    let tableSelectElems = qsa('.tableSelect');
    let usedTables = [];
    for(let i=0; i < tableSelectElems.length; i++) {
        usedTables[tableSelectElems[i].selectedIndex] = true;
    }
    //Disable options for all in use tables
    for(let i=0; i < tableSelectElems.length; i++) {
        let elem = tableSelectElems[i];
        for(let j=1; j < elem.length; j++) {
            elem.options[j].disabled = usedTables[j] != null && j != elem.selectedIndex;
        }
    }
}
function radioButtonChange(event) {
    let btn = event.target;
    idnum = btn.name.substr("recordOption".length);
    let conList = id("constraintslist" + idnum);
    if(btn.value == "create") {
        conList.classList.add("hidden");
        for(let i=0; i < conList.childNodes.length; i++) {
            let elem = conList.childNodes[i];
            if(elem.tagName != null && elem.tagName.toUpperCase() == 'DIV') {
                elem.remove();
                i--;
            }
        }
    }
    else {
        conList.classList.remove("hidden");
    }
    recalculateAvailRecs();
}
function addConstraint(event) {
    let btn = event.target;
    let idnum = btn.id.substr("addBtn".length) * 1;
    if(global_constraint_ids[idnum] == null) {
        global_constraint_ids[idnum] = 1;
    }
    let conId = global_constraint_ids[idnum]++;
    let tableName = id("tableSelect" + idnum).selectedOptions[0].value;
    let table = tables[tableName];

    let div = document.createElement('div');
    let csvSel = document.createElement('select');
    let datSel = document.createElement('select');
    let delButton = document.createElement('button');

    delButton.type = "button";
    delButton.innerText = "x";
    delButton.style = "color: firebrick; margin-left: 10px;";
    delButton.addEventListener('click',deleteConstraint);
    
    //Build list of csv column options
    csvSel.name = "csvSel"+idnum+"_"+conId;
    csvSel.classList.add("csvSel"+idnum);
    csvSel.addEventListener("change",recalculateAvailRecs);
    csvSel.options.add(document.createElement('option'));
    for(let i=0; i < csvColumns.length; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = csvColumns[i];
        csvSel.options.add(opt);
    }

    //Build list of database column options
    datSel.name = "datSel"+idnum+"_"+conId;
    datSel.classList.add("datSel"+idnum);
    datSel.addEventListener("change",recalculateAvailRecs);
    datSel.options.add(document.createElement('option'));
    for(let i=0; i < table.columns.length; i++) {
        if(table.columns[i].pk || table.columns[i].fk)
            continue;
        let opt = document.createElement('option');
        opt.value = table.columns[i].name;
        opt.innerText = table.columns[i].dispName;
        datSel.options.add(opt);
    }

    div.appendChild(gen("span","CSV "));
    div.appendChild(csvSel);
    div.appendChild(gen("span"," matches"));
    div.appendChild(gen("br"));
    div.appendChild(gen("span","Database Column "));
    div.appendChild(datSel);
    div.appendChild(delButton);
    div.style = "border: 1px solid gray; margin: 5px; font-size: 16px;";
    btn.insertAdjacentElement('beforebegin',div);
}
function deleteConstraint(event) {
    this.parentElement.remove();
}

// DOM function identities
function id(elemId) {
    return document.getElementById(elemId);
}
function qs(selector) {
    return document.querySelector(selector);
}
function qsa(selector) {
    return document.querySelectorAll(selector);
}
function gen(tagName,innerTxt = "") {
    let elem = document.createElement(tagName);
    elem.innerText = innerTxt;
    return elem;
}