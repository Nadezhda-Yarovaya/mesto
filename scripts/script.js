function showPopUp(){
    let findpopup = document.querySelector('.pop-up__show');
    findpopup.style.display='block';

    let blackcontent = document.querySelector('.content__overlay');
    /*blackcontent.setAttribute('style', 'background-color: grey');*/
    blackcontent.classList.add('content__overlay_bkg_black');
}
let addButton = document.querySelector('.profile__button');
addButton.addEventListener('click', showPopUp);

let formElement = document.querySelector('.pop-up__form');
formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    let findauthor = document.querySelector('#pop-up-author');
    let findwho = document.querySelector('#pop-up-who');

    let title = document.querySelector('.profile__title');
    let subtitle = document.querySelector('.profile__subtitle');
    console.log('profl title' + findauthor.value);
    title.innerHTML=findauthor.value;
    subtitle.innerHTML=findwho.value;
    /*title.insertAdjacentHTML('beforeend' ,findauthor.value);
    subtitle.insertAdjacentHTML('beforeend' ,findwho.value);*/
    closePopUp();
});

function closePopUp() {
    let findpopup = document.querySelector('.pop-up__show');
    findpopup.style.display='none';
    let blackcontent = document.querySelector('.content__overlay');
    blackcontent.classList.remove('content__overlay_bkg_black');
}
document.querySelector('.pop-up__close').addEventListener('click', closePopUp);
