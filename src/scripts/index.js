import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import "../pages/index.css";

const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupImage = document.querySelector(".popup_type_image");
const popupEditForm = document.forms.editform;
const nameResult = popupEditForm.elements.profileName;
const jobResult = popupEditForm.elements.job;
const popupNewForm = document.forms.newplaceform;
const buttonEditPopup = document.querySelector(".profile__edit-btn");
const buttonNewPopup = document.querySelector(".profile__add-btn");
const elementsCont = document.querySelector(".elements__list");
const newImagePopup = document.querySelector(".popup__image");
const imageParagraph = document.querySelector(".popup__img-paragraph");

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

/* EDIT profile class unit + button listener */
const editPopupProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  submitForm: (formInputsObj) => {
    const userInfo = new UserInfo(formInputsObj.profileName, formInputsObj.job);
    userInfo.setUserInfo();
  },
});
editPopupProfile.setEventListeners();

buttonEditPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  const userInfo = new UserInfo(nameInput.textContent, jobInput.textContent);
  userInfo.getUserInfo();
  editPopupProfile.open();
});

/* NEW place class unit + listener */
const newPopupPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  submitForm: (dataItems) => {
    const thisisNewCard = new Card({
      formData: dataItems,
      cardsSelector: ".template-cards",
      handleCardClick: (popupImg) => {
        popupImg.open();
      },
    });
    const generatedCard = thisisNewCard.generateCard();
    elementsCont.prepend(generatedCard);
  },
});
newPopupPlace.setEventListeners();

buttonNewPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
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
        handleCardClick: (popupImg) => {
          popupImg.open();
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
