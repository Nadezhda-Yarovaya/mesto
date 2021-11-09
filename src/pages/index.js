import {
  popupEditForm,
  nameResult,
  jobResult,
  popupNewForm,
  buttonEditPopup,
  buttonNewPopup,
  validationConfig,
  initialCards,
} from "../utils/constants.js";

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

/* глобальная видимость, создание экземпляров класса */
const userInfo = new UserInfo(".profile__name", ".profile__job");

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  submitForm: (formInputsObj) => {
    userInfo.setUserInfo(nameResult.value, jobResult.value);
  },
});

const popupImage = new PopupWithImage({ popupSelector: ".popup_type_image" });

const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      addCreatedItem(element);
    },
  },
  ".elements__list"
);

const popupAddPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  submitForm: (dataItems) => {
    addCreatedItem(dataItems);
  },
});

/* additional functions*/
function createCard(element, selector) {
  const newCard = new Card({
    formData: element,
    cardsSelector: selector,
    handleCardClick: () => {
      popupImage.open(element.link, element.name);
    },
  });
  return newCard;
}

function addCreatedItem(data) {
  const card = createCard(data, ".template-cards");
  const generatedCard = card.generateCard();
  cardList.addItem(generatedCard);
}

/* using classes units */
popupEditProfile.setEventListeners();

buttonEditPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  const currentUserInfo = userInfo.getUserInfo();
  nameResult.value = currentUserInfo.profileName;
  jobResult.value = currentUserInfo.job;
  validationEdit.resetValidation();
  popupEditProfile.open();
});

cardList.renderSection();

popupAddPlace.setEventListeners();
buttonNewPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  validationNewCard.resetValidation();
  popupAddPlace.open();
});
