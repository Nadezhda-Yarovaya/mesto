import {
  popupEditForm,
  nameResult,
  jobResult,
  popupNewForm,
  buttonEditPopup,
  buttonNewPopup,
  validationConfig,
  newAvatarButton,
  avatarOnPage,
  avatarUrlInput,
  popupAvatarForm,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";

/*validations*/
const validationEdit = new FormValidator(validationConfig, popupEditForm);
validationEdit.enableValidation();
const validationNewCard = new FormValidator(validationConfig, popupNewForm);
validationNewCard.enableValidation();
const validationNewAvatar = new FormValidator(
  validationConfig,
  popupAvatarForm
);
validationNewAvatar.enableValidation();

/* глобальная видимость, создание экземпляров класса */
const userInfo = new UserInfo(".profile__name", ".profile__job");

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  submitForm: () => {
    api
      .saveProfileData(nameResult.value, jobResult.value)
      .then(() => {})
      .catch((err) => console.log(err));
    userInfo.setUserInfo(nameResult.value, jobResult.value);

    setTimeout(
      popupEditProfile.closeWithTimeout,
      1000,
      ".popup_type_edit-profile"
    );
  },
});

const popupImage = new PopupWithImage({ popupSelector: ".popup_type_image" });

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "cd4b9d27-bb3f-46e8-b234-b4266f9e218c",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((result) => {
  const cardList = new Section(
    {
      items: result,
      renderer: (element) => {
        const card = createCard(element, ".template-cards");
        const generatedCard = card.generateCard();
        cardList.addItem(generatedCard);
      },
      api,
    },
    ".elements__list"
  );
  cardList.renderSection();

  const popupAddPlace = new PopupWithForm({
    popupSelector: ".popup_type_new-place",
    submitForm: () => {
      const valuesGot =
        popupAddPlace.getInputValues(); /* post only from submit form! */
      api.postNewCard(valuesGot).then((res) => {
        const card = createCard(res, ".template-cards");
        const generatedCard = card.generateCard();
        cardList.addItem(generatedCard);
      });
      setTimeout(popupAddPlace.closeWithTimeout, 2000, ".popup_type_new-place");
    },
  }); /* end add place const */

  popupAddPlace.setEventListeners();
  buttonNewPopup.addEventListener("click", (evt) => {
    evt.preventDefault();
    validationNewCard.resetValidation();
    popupAddPlace.open();
  });
}); /*end constant */

const popupDelete = new PopupWithDelete({
  popupSelector: ".popup_type_delete",
  submitDeleteForm: (cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        console.log("we deleted this: " + res);
      })
      .catch((err) => console.log(err)); /*end then*/
    setTimeout(popupDelete.closeWithTimeout, 1000, ".popup_type_delete");
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_upd-avatar",
  submitForm: () => {
    api
      .saveAvatarUrl(avatarUrlInput.value)
      .then(() => {})
      .catch((err) => console.log("Ошибка такова:" + err));
    avatarOnPage.src = avatarUrlInput.value;
    setTimeout(popupEditAvatar.closeWithTimeout, 700, ".popup_type_upd-avatar");
  },
});
popupEditAvatar.setEventListeners();
newAvatarButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  validationNewAvatar.resetValidation();
  popupEditAvatar.open();
});

api
  .loadAvatar()
  .then((res) => {
    avatarOnPage.src = res.avatar;
  })
  .catch((err) => console.log(err));

let profileInfo = api
  .getProfileInfo()
  .then((result) => {
    document.querySelector(".profile__name").textContent = result.name;
    document.querySelector(".profile__job").textContent = result.about;
  })
  .catch((err) => console.log(`Ошибка такова: ${err}`));

function createCard(element, selector) {
  const newCard = new Card({
    formData: element,
    cardsSelector: selector,
    handleCardClick: () => {
      popupImage.open(element.link, element.name);
    },
    handleDeleteClick: (evt) => {
      const cardToDelete = evt.currentTarget.closest(".elements__element");
      popupDelete.open(element, cardToDelete);
    },
    api,
  });
  return newCard;
}

function addCreatedItem(data) {
  const card = createCard(data, ".template-cards");
  const generatedCard = card.generateCard();
  cardList.saveItem(generatedCard);
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
