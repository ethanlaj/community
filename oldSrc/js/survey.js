window.addEventListener('load', exp);

function exp(){
    const cb = document.querySelectorAll('.learnExp');
    cb.forEach((elem) => {
        elem.addEventListener('change', onRadioChange);
    });

    const cb2 = document.querySelectorAll('.learningExp');
    if(cb2.length == 0)
        return;

    cb2.forEach((elem) => {
        elem.addEventListener('change', onRadioChange2);
    });
    document.getElementById('submit').classList.add('nodisplay');
}

function onRadioChange() {
    const cb = document.querySelectorAll('.learnExp');

    for (let i = 0; i < cb.length; i++){
        if(cb[i].checked && cb[i].value != "None") {
            document.getElementById("hiddenDiv").classList.remove("nodisplay");
            return;
        }
    }
    document.getElementById("hiddenDiv").classList.add("nodisplay");
}

function onRadioChange2() {
    const cb2 = document.querySelectorAll('.learningExp');

    for (let i = 0; i < cb2.length; i++){
        if(cb2[i].checked && cb2[i].value != "None") {
            document.getElementById("hiddenDiv2").classList.remove("nodisplay");
            return;
        }
    }
    document.getElementById("hiddenDiv2").classList.add("nodisplay");
}