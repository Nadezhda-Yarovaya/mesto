/*объявляю переменные  */
const popup = document.querySelector('.popup');
const openFormButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.popup__close-btn');
const popupForm = document.querySelector('.popup__form');
const like = document.querySelectorAll('.elements__like');
let nameInput = document.querySelector('.profile__name');
let jobInput = document.querySelector('.profile__job');
let nameResult = popup.querySelector('.popup__input_type_name');
let jobResult = popup.querySelector('.popup__input_type_job');

/*прописываю функции*/
function popupOpen() {
  nameResult.value = nameInput.textContent;
  jobResult.value = jobInput.textContent;
  formToggle();
}

function popupClose(event) {
  event.preventDefault();
  nameInput.textContent = nameResult.value;
  jobInput.textContent = jobResult.value;
  formToggle();
}

function formToggle() {
  popup.classList.toggle('popup_opened');
}

function clickOutsd(event) {
  if (event.target === event.currentTarget) {
    formToggle();
  }
}

function likeToggle(event) {
  let likeActive = event.currentTarget;
  likeActive.classList.toggle('elements__like_active');
}

/*вешаю все функции на события теперь */
openFormButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupClose);

popup.addEventListener('click', clickOutsd);

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener('click', likeToggle);
}
