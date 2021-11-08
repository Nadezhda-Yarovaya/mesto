import {nameInput,jobInput,popupImage,popupEditForm,nameResult,jobResult,popupNewForm,buttonEditPopup,buttonNewPopup, elementsCont, 
  newImagePopup, imageParagraph, validationConfig, initialCards} from "../utils/constants.js";


import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

/*validations*/
const validationEdit = new FormValidator(validationConfig, popupEditForm);
validationEdit.enableValidation();
const validationNewCard = new FormValidator(validationConfig, popupNewForm);
validationNewCard.enableValidation();

const userInfo = new UserInfo(".profile__name", ".profile__job"); /* .profile__name, .profile__job*/
/*userInfo.getUserInfo(); */ /* get it from the page or from the form?? */

/* EDIT profile class unit + button listener */
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  submitForm: (formInputsObj) => {
    userInfo.setUserInfo(nameResult.value, jobResult.value);
  },
});

popupEditProfile.setEventListeners();
/*объявлять типа токо один раз */
buttonEditPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  const currentUserInfo = userInfo.getUserInfo();
  nameResult.value = currentUserInfo.profileName;
  jobResult.value = currentUserInfo.job;
  popupEditProfile.open();
});

/*Экземпляр класса попапа с изображением следует создавать только 1 раз, 
только в глобальной области видимости и только в файле index.js*/
const imageInPopup = new PopupWithImage({
  popupSelector: ".popup_type_image"
});


function createCard(element, selector) {
  const newCard = new Card({
    formData: element,
    cardsSelector: selector,
    handleCardClick: (imageInPopup) => {
      imageInPopup.open(element.link, element.name);
    },
  });

  

/*initialize firsts, use section */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = createCard(element, ".template-cards");
      const finalCard = card.generateCard();
      elementsCont.prepend(card);
      /*return finalCard;*/
    },
  },
  ".elements__list"
);
cardList.renderSection();

/* NEW place class unit + listener */
const popupAddPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  submitForm: (dataItems) => {
    const card = createCard(dataItems, ".template-cards");
    const generatedCard = card.generateCard();
    cardList.addItem(card);
     /* elementsCont.prepend( generatedCard); тут ты права, но как?? В данном месте следует использовать метод addItem класса Section после объявления секции что ли в глобалке?*/
  },
});
popupAddPlace.setEventListeners();

buttonNewPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupAddPlace.open();
});



  return newCard;
}

export {};
