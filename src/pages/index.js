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

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "cd4b9d27-bb3f-46e8-b234-b4266f9e218c",
    "Content-Type": "application/json",
  },
});

/***************PROMISE ALL ******************* */
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    const userInfo = new UserInfo(
      ".profile__name",
      ".profile__job",
      ".profile__avatar",
      userData
    );
    userInfo.applyInitialLoad();

    /* v new SECTION */
    const cardList = new Section(
      {
        items: cards,
        renderer: (element) => {
          const card = createCard(element, userId, ".template-cards");
          const generatedCard = card.generateCard();
          cardList.addItem(generatedCard);
        },
      },
      ".elements__list",
      api
    );
    cardList.renderSection();

    /* v add new Place */
    const popupAddPlace = new PopupWithForm({
      popupSelector: ".popup_type_new-place",
      submitForm: () => {
        const valuesGot =
          popupAddPlace.getInputValues(); 
        api
          .postNewCard(valuesGot)
          .then((res) => {
            const card = createCard(res, userId, ".template-cards");
            const generatedCard = card.generateCard();
            cardList.addItem(generatedCard);
            popupAddPlace.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            popupAddPlace.renderLoading("Создать");
          });
      },
    }); /* end add place const */

    popupAddPlace.setEventListeners();
    buttonNewPopup.addEventListener("click", (evt) => {
      evt.preventDefault();
      validationNewCard.resetValidation();
      popupAddPlace.open();
    });
    /* load avatar in promise you know*/

    /* Edit profile */
    const popupEditProfile = new PopupWithForm({
      popupSelector: ".popup_type_edit-profile",
      submitForm: () => {
        const valuesGot = popupEditProfile.getInputValues();
        api
          .saveProfileData(valuesGot.profileName, valuesGot.job)
          .then(() => {
            userInfo.setUserInfo(valuesGot.profileName, valuesGot.job);
            popupEditProfile.close();
          })
          .catch((err) => console.log("Ошибка в профиле:" + err))
          .finally(() => {
            {
              popupEditAvatar.renderLoading("Сохранить");
            }
          });
      },
    });

    popupEditProfile.setEventListeners();
    buttonEditPopup.addEventListener("click", (evt) => {
      evt.preventDefault();
      const currentUserInfo = userInfo.getUserInfo();
      nameResult.value = currentUserInfo.profileName;
      jobResult.value = currentUserInfo.job;
      validationEdit.resetValidation();
      popupEditProfile.open();
    });
  })
  .catch((err) => console.log("Promise all error:" + err)); /*end Promise All */

/* outside promises*/
/*Popup DELETE*/
const popupDelete = new PopupWithDelete({
  popupSelector: ".popup_type_delete",
  submitDeleteForm: (cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        popupDelete.closeWithRemove();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDelete.renderLoading("Да");
      });
  },
});
popupDelete.setEventListeners();

/* EDIT avatar*/
const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_upd-avatar",
  submitForm: () => {
    api
      .saveAvatarUrl(popupEditAvatar.getInputValues())
      .then((res) => {
        avatarOnPage.src = res.avatar;
        popupEditAvatar.close();
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
        popupEditAvatar.renderLoading("Сохранить");
      });
  },
});
popupEditAvatar.setEventListeners();
newAvatarButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  validationNewAvatar.resetValidation();
  popupEditAvatar.open();
});

function createCard(element, userId, selector) {
  const newCard = new Card({
    formData: element,
    userId: userId,
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

const popupImage = new PopupWithImage({ popupSelector: ".popup_type_image" });
popupImage.setEventListeners();
