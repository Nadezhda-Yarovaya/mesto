
import {FormValidator, validationConfig} from './FormValidator.js';
import {CardItem} from './Card.js';
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupNew = document.querySelector(".popup_type_new-place");
const popupImage = document.querySelector(".popup_type_image");
const popupEditForm = document.forms.editform;
const nameResult = popupEditForm.elements.name;
const jobResult = popupEditForm.elements.job;
const popupNewForm = document.forms.newplaceform;
const newPlaceName =popupNewForm.elements.placeName;
const newPlaceUrl =popupNewForm.elements.url;
const allInputsEdit = popupEdit.querySelectorAll('.popup__input');
const buttonEditPopup = document.querySelector(".profile__edit-btn");
const buttonNewPopup = document.querySelector(".profile__add-btn");
const elementsCont = document.querySelector(".elements__list");
const imageContainer = document.querySelector(".popup__image-container");
const newImagePopup = document.querySelector(".popup__image");
const imageParagraph = document.querySelector(".popup__img-paragraph");
const templateCards = document.querySelector(".template-cards");
const editSubmit = popupEditForm.querySelector(".popup__submit");
const newPlaceSubmit = popupNewForm.querySelector(".popup__submit");
const allPopups = document.querySelectorAll(".popup");

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

initialCards.forEach(item => {
  const cardElement = makeNewCard(item);
  elementsCont.append(cardElement);
});

function makeNewCard(card) {    
  const thisCard = new CardItem(card, '.template-cards');
  const cardElement = thisCard.generateCard();
  return cardElement;   
  }

const validationEdit =  new FormValidator(validationConfig, popupEditForm);
validationEdit.enableValidation();
const validationNewCard =  new FormValidator(validationConfig, popupNewForm);
validationNewCard.enableValidation();

Array.from(allPopups).forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopupByType(popup);
    }
  });
  popup.querySelector(".popup__close-btn").addEventListener("click", () => {
    closePopupByType(popup)
  });
});

<<<<<<< HEAD
=======


/*
function createCard(elementName, elementLink) {
  const newCard = templateCards.content.cloneNode(true);
  newCard.querySelector(".elements__title").textContent = elementName;
  newCard.querySelector(".elements__image-btn").src = elementLink;
  newCard.querySelector(".elements__image-btn").alt = elementLink;
  setListenersCard(newCard);
  return newCard;
} */

>>>>>>> a952f1acc3fe59fe4da29d658b158cb583dd9626
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

function addValuestoPopup(){
  nameResult.value = nameInput.textContent;
  jobResult.value = jobInput.textContent;
validationEdit.enableValidation();
}

function addCard() { 
  const newCard = {};
  newCard.name = newPlaceName.value;
  newCard.link = newPlaceUrl.value;
  return makeNewCard(newCard);
  
}

<<<<<<< HEAD
/*повесить слушателей на попапы*/
=======
function addCard(e) {
  e.preventDefault();
  const nameOfPlaceNew = e.currentTarget.querySelector(
    ".popup__input_type_place"
  ).value;
  const linkOfPlaceNew = e.currentTarget.querySelector(
    ".popup__input_type_link"
  ).value;
  elementsCont.prepend(createCard(nameOfPlaceNew, linkOfPlaceNew));
  closePopupByType(popupNew);
  e.currentTarget.reset();
}

function deleteCard(e) {
  const card = e.currentTarget.closest(".elements__element");
  card.remove();
}

/*все вызовы функций */
/*добавляем все карточки в один массив*/
const finalCards = initialCards.map(function (element) {
  return createCard(element.name, element.link);
});

/*вставляем готовые карточки в HTML*/
finalCards.forEach((element) => {
  
  const card = new Card(element, '.elements__element');
  /*
  elementsCont.append(element);*/
});

>>>>>>> a952f1acc3fe59fe4da29d658b158cb583dd9626
buttonEditPopup.addEventListener("click", () => {
  addValuestoPopup();
  /*при повторном открытии этого попапа удалить ошибки */
  const allInputsHere = popupEditForm.querySelectorAll('.popup__input');
    allInputsHere.forEach(el => {
    el.classList.remove(validationConfig.inputErrorClass);
    popupEditForm.querySelector(`.${el.id}-error`).textContent = '';
  });
  editSubmit.classList.remove(validationConfig.inactiveButtonClass);
  editSubmit.disabled=false;
  
  openPopupByType(popupEdit);
});

buttonNewPopup.addEventListener("click", () => {  
   /* при повторном открытии попапа без перезагрузки страницы проверить на валидность, удалить ошибки*/
   const isValidorNot = popupNewForm.checkValidity();
  if(!isValidorNot) {
  newPlaceSubmit.classList.add("popup__submit_invalid");
  newPlaceSubmit.disabled = true; }
  else {
    newPlaceSubmit.classList.remove("popup__submit_invalid");
  newPlaceSubmit.disabled = false; 
  }
  openPopupByType(popupNew);
});


  popupEditForm.addEventListener("submit", formSubmitHandler);

  function formSubmitHandler(event) { 
    event.preventDefault();
    nameInput.textContent = nameResult.value;
    jobInput.textContent = jobResult.value;
    closePopupByType(popupEdit);
  }
  
    
/*closing popups listeners*/
popupEdit
.querySelector(".popup__close-btn")
.addEventListener("click", () => closePopupByType(popupEdit));

popupNew
.querySelector(".popup__close-btn")
.addEventListener("click", () => closePopupByType(popupNew));

popupImage
.querySelector(".popup__close-btn")
.addEventListener("click", () => closePopupByType(popupImage));
popupNewForm.addEventListener("submit", () => {
  const addNewCard = addCard();   
  elementsCont.prepend(addNewCard);
  popupNewForm.reset();
  closePopupByType(popupNew);
});

<<<<<<< HEAD
export {nameInput, jobInput, popupEdit, popupNew, popupImage, imageParagraph, popupEditForm, nameResult, elementsCont, newImagePopup, popupNewForm};
  /*buttonNewPopup, editSubmit, newPlaceSubmit, allPopups
  jobResult, popupNewForm, allInputsEdit, buttonEditPopup.
  */
=======
popupNewForm.addEventListener("submit", addCard);

export {elementsCont};
>>>>>>> a952f1acc3fe59fe4da29d658b158cb583dd9626
