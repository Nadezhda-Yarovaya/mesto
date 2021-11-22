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
const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      addCreatedItem(element);
    },
  },
  ".elements__list"
);

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

/*
const initialCards = getInitialCards() /* тут then? а в Апи не then? 
.then(res => {res.json();
  const cardsArray = [];
  cardsArray = res; /* тут может быть foreach? 
})
.catch (res => console.log(err));
*/
/*одна АПИ*/
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "cd4b9d27-bb3f-46e8-b234-b4266f9e218c",
    "Content-Type": "application/json",
  },
}
);

/* сначала надо понаудалять все 5 новых моих карточек, затем думать, как новую постить то */
const apiPost = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "cd4b9d27-bb3f-46e8-b234-b4266f9e218c",
    "Content-Type": "application/json",
  }, 
  body: JSON.stringify({
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1637266702043-287eb7d2b5b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  })
});


/*
apiPost.postNewCard().then((result) => {
  console.log('result: ' +result.name);
});*/

/* /////////////////using promise to get all cards */
apiGet.getInitialCards().then((result) => {
  /*console.log("result: " + result[4].name);*/
  /*return result;*/
  result.forEach(singleObj => {
  console.log('res name and ID: ' + singleObj.name + ' id: ' + singleObj._id + ' url: ' + singleObj.link + ' owner id: ' +singleObj.owner._id);
  /*check my owner ID then see*/
  });
  const cardList = new Section(
    {
      items: result, /* const new1 = result.map(eachObj => {return eachObj.name}); - да оно не надо у нас тоже объект будет у меня резалт со всеми полями получился */
      renderer: (element) => {
        addCreatedItem(element);
      },
      apiGet
    },
    ".elements__list"
  );
  cardList.renderSection();
});
/* END  using promise to get all cards */

let profileInfo = apiGet.getProfileInfo().then((result) => {
  console.log(
    "profilename: " + result.name
  ); /*переписывать надо, щас изнач загрзука с html*/
  document.querySelector(".profile__name").textContent = result.name;
  document.querySelector(".profile__job").textContent = result.about;
});
/*.then(data => {
  console.log('data: ' + data);
  for(let i=0; i< data.length; i++){
    newlog1[i] = data[i];
    console.log('newarray1: ' + newlog1[i].name);
    console.log('newarray1-link: ' + newlog1[i].link);
  }
  return newlog1;
});*/
/*console.log('initcards: ' + initialCardsResp);*/
/*
const initialCardsRespon = initialCardsResp.then(data => {
console.log('promisedata: '+ data[0].name);
return data;
});

console.log('initialCardsRespon: '+ initialCardsRespon[0].name);*/

/* initialCards - ну тут и начальные карточки полученные как бэ - все карточки
    тут типа массив, функция возвращает массив*/

/*это ваще убрать ващемт*/


const popupAddPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  submitForm: (dataItems) => {
    apiPost.postNewCard(dataItems).then(res => { console.log('res in post new: ' + res.name); });
    addCreatedItem(dataItems); /*когда сабмитится, тогда и добавляется*/
  },
});

popupAddPlace.setEventListeners();
buttonNewPopup.addEventListener("click", (evt) => {
  evt.preventDefault();
  validationNewCard.resetValidation();
  popupAddPlace.open();
});


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
    }
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


