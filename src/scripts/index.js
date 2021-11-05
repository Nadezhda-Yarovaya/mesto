
import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import Popup from "../scripts/Popup.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

import "../pages/index.css";
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupNew = document.querySelector(".popup_type_new-place");
const popupImage = document.querySelector(".popup_type_image");
const popupEditForm = document.forms.editform;
const nameResult = popupEditForm.elements.profileName;
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

/*validations*/
const validationEdit = new FormValidator(validationConfig, popupEditForm);
validationEdit.enableValidation();
const validationNewCard = new FormValidator(validationConfig, popupNewForm);
validationNewCard.enableValidation();

/* when clicking button EDIT your profile */
buttonEditPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  const editPopupProfile = new PopupWithForm({
    popupSelector: ".popup_type_edit-profile",
    submitForm: (formInputsObj) => {
      const userInfo = new UserInfo(
        formInputsObj.profileName,
        formInputsObj.job
      );
      userInfo.setUserInfo();
    },
  });
  const userInfo = new UserInfo(
    nameInput.textContent,
    jobInput.textContent
  ); /*here are values of the profile job, name);*/
  userInfo.getUserInfo();
  editPopupProfile.open();
});

function handleClick(element) {
  const popupImageOfCard = new PopupWithImage({
    popupSelector: ".popup_type_image",
    popupImg: element.link,
    popupNote: element.name,
  });
  popupImageOfCard.open();
}

/* when clicking button ADD new place */
buttonNewPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  const newPopupPlace = new PopupWithForm({
    popupSelector: ".popup_type_new-place",
    submitForm: (dataItems) => {
      /*it's a submit behavior */
      const thisisNewCard = new Card({
        formData: dataItems,
        cardsSelector: ".template-cards",
        handleCardClick: () => {
          handleClick(dataItems);
        },
      });
      const generatedCard = thisisNewCard.generateCard();
      elementsCont.prepend(generatedCard);
    },
  });
  newPopupPlace.open();
});

/*initialize firsts, use section */
const addSection = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = new Card({
        formData: element,
        cardsSelector: ".template-cards",
        handleCardClick: () => {
          handleClick(element);
        },
      });
      const finalCard = newCard.generateCard();
      return finalCard;
    },
  },
  ".elements__list"
);

addSection.renderSection();


export {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  nameResult,
  jobResult,
  nameInput,
  jobInput,
};
