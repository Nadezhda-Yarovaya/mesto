const popup = document.querySelector(".popup");
const nameResult = popup.querySelector(".popup__input_type_name");
const jobResult = popup.querySelector(".popup__input_type_job");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupNew = document.querySelector(".popup_type_new-place");
const popupImage = document.querySelector(".popup_type_image");
const buttonEditPopup = document.querySelector(".profile__edit-btn");
const buttonNewPopup = document.querySelector(".profile__add-btn");
const elementsCont = document.querySelector(".elements__list");
const imageContainer = document.querySelector(".popup__image-container");
const newImagePopup = document.querySelector(".popup__image");
const imageParagraph = document.querySelector(".popup__img-paragraph");
const templateCards = document.querySelector(".template-cards");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/*все функции */
function setListenersCard(card) {  
  const currentImgLink = card.querySelector(".elements__image-btn").src;
  const currentTitle = card.querySelector(".elements__title").textContent;

  card.querySelector(".elements__image-btn").addEventListener("click", () => {   
  newImagePopup.src = `${currentImgLink}`; 
  newImagePopup.alt = `${currentTitle}`; 
  imageParagraph.textContent = currentTitle;
    openPopupByType(popupImage);
  });

  card.querySelector(".elements__like").addEventListener("click", toggleLikes);
  
  card.querySelector(".elements__delete").addEventListener("click", deleteCard);
}

function createCard(elTitle, elLink) {
  const newCard = templateCards.content.cloneNode(true);
  newCard.querySelector(".elements__title").textContent = elTitle;
  newCard.querySelector(".elements__image-btn").src = elLink;
  newCard.querySelector(".elements__image-btn").alt = elTitle;
  setListenersCard(newCard);
  elementsCont.prepend(newCard);
}

function openPopupByType(popupType) {
  popupType.classList.add("popup_opened");
}

function closePopupByType(popupType) {
  popupType.classList.remove("popup_opened");
}

function addValuestoPopup() {
  nameResult.value = nameInput.textContent;
  jobResult.value = jobInput.textContent;
}

function formSubmitHandler(event) {
  event.preventDefault();
  nameInput.textContent = nameResult.value;
  jobInput.textContent = jobResult.value;
  closePopupByType(popupEdit);
}

function toggleLikes(event) {
  let likeActive = event.currentTarget;
  likeActive.classList.toggle("elements__like_active");
}

function addCard(e) {
  e.preventDefault();
  const nameOfPlaceNew = popupNew.querySelector(
    ".popup__input_type_place"
  ).value;
  const linkOfPlaceNew = popupNew.querySelector(
    ".popup__input_type_link"
  ).value;
  createCard(nameOfPlaceNew, linkOfPlaceNew);
  popupNew.querySelector(".popup__input_type_place").value = "";
  popupNew.querySelector(".popup__input_type_link").value = "";
  closePopupByType(popupNew);
}

function deleteCard(e) {
  const card = e.currentTarget.closest(".elements__element");
  card.remove();
}

/*все вызовы функций */
initialCards.map(function (element) {
  createCard(element.name, element.link);
});

buttonEditPopup.addEventListener("click", () => {
  addValuestoPopup();
  openPopupByType(popupEdit);
});

buttonNewPopup.addEventListener("click", () => openPopupByType(popupNew));

/*closing popups*/
popupEdit
  .querySelector(".popup__close-btn")
  .addEventListener("click", () => closePopupByType(popupEdit));

popupNew
  .querySelector(".popup__close-btn")
  .addEventListener("click", () => closePopupByType(popupNew));

popupImage
  .querySelector(".popup__close-btn")
  .addEventListener("click", () => closePopupByType(popupImage));

popupForm.addEventListener("submit", formSubmitHandler);

popupNew.querySelector(".popup__form").addEventListener("submit", addCard);