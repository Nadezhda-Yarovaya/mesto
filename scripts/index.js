/*объявляю переменные  */
const popup = document.querySelector('.popup');
const openFormButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.popup__close-btn');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const nameResult = popup.querySelector('.popup__input_type_name');
const jobResult = popup.querySelector('.popup__input_type_job');
const like = document.querySelectorAll('.elements__like');

const lightbox = document.querySelector('.lightbox');
const elementsImageLightbox = document.querySelectorAll('.elements__image-btn');
const elementscloseLightbox = document.querySelector('.lightbox__close-btn');




const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpen() {
  nameResult.value = nameInput.textContent;
  jobResult.value = jobInput.textContent;
  popup.classList.add('popup_opened');
}

function formSubmitHandler(event) {  
  event.preventDefault();
  nameInput.textContent = nameResult.value;
  jobInput.textContent = jobResult.value;
  popupClose(); /* whatshere& */
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

for (let i = 0; i < elementsImageLightbox.length; i++) {
  elementsImageLightbox[i].src = initialCards[i].link;
  console.log(elementsImageLightbox[i]);
  }


/* лайки с тогглом */
function likeToggle(event) {
  let likeActive = event.currentTarget;
  console.log(`likeactive: ${likeActive}`)
  likeActive.classList.toggle('elements__like_active');
}

/*вешаю все функции на события теперь */
openFormButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);

  

/*слушатель на все лайки */
for (let i = 0; i < like.length; i++) {
  like[i].addEventListener('click', likeToggle);
}

/* how to remove card e.target.closest(".селектор карточки").remove();

кнопку закрытия ищем в этом попапе! 
const popupImage = document.querySelector('.modal_type_image');
const popupImageCloseBtn = popupImage.querySelector('.modal__close');*/

/* так вот говорит с переменной 
const firstModal = document.querySelector('.modal_first');
const secondModal = document.querySelector('.modal_second');
....toggleModal(modal) {
    modal.toggle('moda_open')
}somebutton.addEL('click', () => toggleModal(firstModal))
anotherbutton.addEL('click', () => toggleModal(secondModal))
.....
*/

/* 
ожно передавать объект card с полями link и name как при инициализации
а при самбите формы самому создать этот объект и передать
createCard({link: placeLinkInput.value, name: placeNameInput.value})
*/


const elementsCont = document.querySelector('.elements__list');



/* all cards rendreing by initial load, from template */
function renderCard(elTitle, elLink) {
const newCard = document.querySelector('.template-cards').content.cloneNode(true);
newCard.querySelector('.elements__title').textContent = elTitle;
newCard.querySelector('.elements__image-btn').src = elLink;
setListenerstoDelete(newCard);
setListenerstoPopup(newCard);
elementsCont.prepend(newCard);
}
/*yet with for, then i need to use map somehow */
/*for (let i=0; i<initialCards.length; i++)
{
  renderCard(initialCards[i].name, initialCards[i].link)
}*/

/*all is right like here: */
initialCards.map(function(arvalue) {
renderCard(arvalue.name,arvalue.link);
});

/* ends template 
const nameOfPlaceNew = document.querySelector('popup__input_type_place').value;*/
const popupNewPlaceForm = document.querySelector('.popup__new-place');
const newPlaceButton = document.querySelector('.profile__add-btn');

/*adding a new card */
function addCard(e) {
e.preventDefault();
const nameOfPlaceNew = popupNewPlaceForm.querySelector('.popup__input_type_place').value;
const linkOfPlaceNew = popupNewPlaceForm.querySelector('.popup__input_type_link').value;
renderCard(nameOfPlaceNew,linkOfPlaceNew);
/*his version's working, mine not 
popupNewPlaceForm.querySelector('.popup__input_type_place').reset();
popupNewPlaceForm.querySelector('.popup__input_type_link').reset(); 34 min webinar */
popupNewPlaceForm.querySelector('.popup__input_type_place').value = '';
popupNewPlaceForm.querySelector('.popup__input_type_link').value = '';
popupRemovenewplace();
}

/*open newplace form */

function popupOpennewplace() {
  popupNewPlaceForm.classList.add('popup_opened');
}

function popupRemovenewplace() {
  popupNewPlaceForm.classList.remove('popup_opened');
}

newPlaceButton.addEventListener('click',popupOpennewplace);
popupNewPlaceForm.querySelector('.popup__submit').addEventListener('click', addCard);


/*listeners to delete cards*/
function deleteCard(e) {
/*I need to understand which card I'm deleting
current target here would be the button of elements delete 
this is whhy we would need the closest */
const card = e.currentTarget.closest('.elements__element');
card.remove();
}

function popUpCard(e) {
    let activeImg = e.currentTarget;
  document.querySelector('.popup__image-cont').style.backgroundImage=`url(${activeImg.src})`; /*it really works finally*/
  console.log(document.querySelector('.popup__image-cont').src);
  document.querySelector('.popup__image').classList.add('popup_opened');
  }
  function popupImgClose() {
    document.querySelector('.popup__image').classList.remove('popup_opened');
  }
  document.querySelector('.popup__close-img').addEventListener("click", popupImgClose);

function setListenerstoDelete(card) {
  card.querySelector('.elements__delete').addEventListener('click', deleteCard);
}
function setListenerstoPopup(card) {
  card.querySelector('.elements__image-btn').addEventListener('click', popUpCard);
}


