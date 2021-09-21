/*объявляю переменные  */
const popup = document.querySelector('.popup');
const openFormButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.popup__close-btn');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const nameResult = popup.querySelector('.popup__input_type_name');
const jobResult = popup.querySelector('.popup__input_type_job');

function popupOpen() {
  nameResult.value = nameInput.textContent;
  jobResult.value = jobInput.textContent;
  popup.classList.add('popup_opened');
}

function formSubmitHandler(event) {  
  event.preventDefault();
  nameInput.textContent = nameResult.value;
  jobInput.textContent = jobResult.value;
  popupClose();
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

/*вешаю все функции на события теперь */
openFormButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);