// searchInput - called by search text boxes
//  - Narrows down the options in a linked select element according to the search
function searchInput(event) {
	let select = id(event.target.id.substr(0,event.target.id.length-7));
    let searchStr = event.target.value.toUpperCase();
    let count=0;
    
    //Leave selected option the same unless its not in the new search
    let selIndex = select.selectedIndex;
    if(select.options[selIndex].text.toUpperCase().indexOf(searchStr) == -1) {
    	selIndex = 0;
    }
    
    //Loop through and hide options that don't match search
    for(let i=1; i<select.length; i++) {
    	select.options[i].hidden = select.options[i].text.toUpperCase().indexOf(searchStr) == -1;
        if(!select.options[i].hidden) {
        	count++;
            if(selIndex == 0) {
            	selIndex = i;
            }
        }
    }
    //Update the selected index
    if(searchStr.length == 0)
    	select.selectedIndex = 0;
    else
    	select.selectedIndex = selIndex;

	//Tell user how many matches were found
	id(select.id+"_matches").innerHTML = count+" matches";
}

function onSearchFocus(event) {
	searchInput(event);
}
function onSearchBlur(event) {
	let select = id(event.target.id.substr(0,event.target.id.length-7));
	id(select.id+"_matches").innerHTML = "";
}

function id(idNum) {
	return document.getElementById(idNum);
}