function showPopUp(){
    let findpopup = document.querySelector('.pop-up__show');
    findpopup.style.display='block';
}

function submitPopUp() {
    let findauthor = document.querySelector('#pop-up-author');
    let findwho = document.querySelector('#pop-up-who');

    let title = document.querySelector('.profile__title');
    let subtitle = document.querySelector('.profile__subtitle');
    title.innerHTML = findauthor.value;
    subtitle.innerHTML = findwho.value;
    /*doesn't work yet - should be event listeners! */
}