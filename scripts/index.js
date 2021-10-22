import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupNew = document.querySelector(".popup_type_new-place");
const popupImage = document.querySelector(".popup_type_image");
const popupEditForm = document.forms.editform;
const nameResult = popupEditForm.elements.name;
const jobResult = popupEditForm.elements.job;
const popupNewForm = document.forms.newplaceform;
const newPlaceName = popupNewForm.elements.placeName;
const newPlaceUrl = popupNewForm.elements.url;
const allInputsEdit = popupEdit.querySelectorAll(".popup__input");
const buttonEditPopup = document.querySelector(".profile__edit-btn");
const buttonNewPopup = document.querySelector(".profile__add-btn");
const elementsCont = document.querySelector(".elements__list");
const newImagePopup = document.querySelector(".popup__image");
const imageParagraph = document.querySelector(".popup__img-paragraph");
const editSubmit = popupEditForm.querySelector(".popup__submit");
const newPlaceSubmit = popupNewForm.querySelector(".popup__submit");
const allPopups = document.querySelectorAll(".popup");
/*
const imageContainer = document.querySelector(".popup__image-container");
const templateCards = document.querySelector(".template-cards");*/

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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

/* initial cards */
initialCards.forEach((item) => {
  const cardElement = makeNewCard(item);
  elementsCont.append(cardElement);
});

function makeNewCard(card) {
  const thisCard = new Card(card.name, card.link, ".template-cards");
  const cardElement = thisCard.generateCard();
  return cardElement;
}

/*validations*/
const validationEdit = new FormValidator(validationConfig, popupEditForm);
validationEdit.enableValidation();
const validationNewCard = new FormValidator(validationConfig, popupNewForm);
validationNewCard.enableValidation();

/* all popups closing */
Array.from(allPopups).forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopupByType(popup);
    }
  });
  /*closing all popups on button*/
  popup.querySelector(".popup__close-btn").addEventListener("click", () => {
    closePopupByType(popup);
  });
});

function openPopupByType(popupType) {
  popupType.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopupByType(popupType) {
  document.removeEventListener("keydown", closeByEscape);
  popupType.classList.remove("popup_opened");
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopupByType(openedPopup);
  }
}

function addValuestoPopup() {
  nameResult.value = nameInput.textContent;
  jobResult.value = jobInput.textContent;
}

function addCard() {
  const newCard = {};
  newCard.name = newPlaceName.value;
  newCard.link = newPlaceUrl.value;
  return makeNewCard(newCard);
}

function formSubmitHandler(event) {
  event.preventDefault();
  nameInput.textContent = nameResult.value;
  jobInput.textContent = jobResult.value;
  closePopupByType(popupEdit);
}

/*повесить слушателей на попапы*/
buttonEditPopup.addEventListener("click", () => {
  addValuestoPopup();
  /*при повторном открытии этого попапа удалить ошибки */
  allInputsEdit.forEach((el) => {
    el.classList.remove(validationConfig.inputErrorClass);
    popupEditForm.querySelector(`.${el.id}-error`).textContent = "";
  });
  editSubmit.classList.remove(validationConfig.inactiveButtonClass);
  editSubmit.disabled = false;

  openPopupByType(popupEdit);
});

buttonNewPopup.addEventListener("click", () => {
  /* при повторном открытии попапа без перезагрузки страницы проверить на валидность, удалить ошибки*/
  const isValidorNot = popupNewForm.checkValidity();
  if (!isValidorNot) {
    newPlaceSubmit.classList.add("popup__submit_invalid");
    newPlaceSubmit.disabled = true;
  } else {
    newPlaceSubmit.classList.remove("popup__submit_invalid");
    newPlaceSubmit.disabled = false;
  }
  openPopupByType(popupNew);
});

/*submits on both popups*/
popupEditForm.addEventListener("submit", formSubmitHandler);

popupNewForm.addEventListener("submit", () => {
  const addNewCard = addCard();
  elementsCont.prepend(addNewCard);
  popupNewForm.reset();
  closePopupByType(popupNew);
});

export {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  closeByEscape,
};
