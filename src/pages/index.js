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
import PopupWithDelete from "../components/PopupWithDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";

/* predefine this constant, without it doesn't work */
/*
const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      addCreatedItem(element);
    },
  },
  ".elements__list"
);
*/

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
const popupDelete = new PopupWithDelete({ popupSelector: ".popup_type_delete", submitDeleteForm: () =>{
  console.log('delete ёпта');
  apiPost.deleteCard()
  .then(res => {console.log('we deleted: ' + res)});
} });

/*api single*/
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "cd4b9d27-bb3f-46e8-b234-b4266f9e218c",
    "Content-Type": "application/json",
  },
}
);

/* /////////////////using promise to get all cards */
api.getInitialCards().then((result) => {
  /*showing all cards in console */
  result.forEach(singleObj => {
  //console.log('res name and ID: ' + singleObj.name + ' id: ' + singleObj._id + ' url: ' + singleObj.link + ' owner id: ' +singleObj.owner._id);
    });

  const cardList = new Section(
    {
      items: result,
      renderer: (element) => {
        // addCreatedItem(element);
        /* поэтому удалять нельзя было */
  const card = createCard(element, ".template-cards"); /*- тут элемент, а не дата! 
  card = result of Card js constructor*/
  const generatedCard = card.generateCard(); /* result is generated Card full with layout and data */
  cardList.addItem(generatedCard);
      },
      api
    },
    ".elements__list"
  );
  cardList.renderSection();

  const popupAddPlace = new PopupWithForm({
    popupSelector: ".popup_type_new-place",
    submitForm: () => { 
      const valuesGot = popupAddPlace.getInputValues();/* post only from submit form! */
      api.postNewCard(
        valuesGot)
          .then(res => { 
      /*console.log('res Name in post new: ' + res.name); */
      const card = createCard({
        name: res.name,
        link: res.link
      }, ".template-cards");
      /*console.log('gener card:' + res); */
      const generatedCard = card.generateCard();
      cardList.addItem(generatedCard);      
      /*cardList.saveItem(generatedCard);*/ 
    }
          );
  }
  });
  
popupAddPlace.setEventListeners();
buttonNewPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  validationNewCard.resetValidation();
  popupAddPlace.open();
});

});
/* END  using promise to get all cards */


let profileInfo = api.getProfileInfo().then((result) => {
  console.log(
    "profilename: " + result.name
  ); /*переписывать надо, щас изнач загрзука с html*/
  document.querySelector(".profile__name").textContent = result.name;
  document.querySelector(".profile__job").textContent = result.about;
})
.catch(err => console.log(`Ошибка такова: ${err}`));








/* additional functions*/
function createCard(element, selector) {
  const newCard = new Card({
    formData: element,
    cardsSelector: selector,
    handleCardClick: () => {
      popupImage.open(element.link, element.name); 
    },
    handleDeleteClick: () => {
      popupDelete.open();      
    }, api
  });
  console.log('newcard:' + newCard);
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


