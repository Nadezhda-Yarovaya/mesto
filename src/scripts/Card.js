/*Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
 Эта функция должна открывать попап с картинкой при клике на карточку.
*/

import {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  nameResult,
  jobResult,
  nameInput,
  jobInput
} from "./index.js";

class Card {
  constructor({formData, cardsSelector, handleCardClick }) {
    this._name = formData.name;
    this._link = formData.link;
    this._cardsSelector = cardsSelector;
    this._handleCardClick = handleCardClick;
    this._newCard = this._getTemplate();
    this._elementsTitle = this._newCard.querySelector(".elements__title");
    this._imgButton = this._newCard.querySelector(".elements__image-btn");    
    this._like = this._newCard.querySelector(".elements__like");
    this._elementDelete = this._newCard.querySelector(".elements__delete");
  }
  /*Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
  
  Эта функция должна открывать попап с картинкой при клике на карточку.
  */

  _getTemplate() {
    const newCard = document
      .querySelector(this._cardsSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return newCard;
  }

  generateCard = () => {
    this._elementsTitle.textContent = this._name;
    this._setEventListeners();
    this._imgButton.src = this._link;
    this._imgButton.alt = this._name;
    return this._newCard;
  };

  _deleteCard = () => {
    this._newCard.remove();
  };



  _toggleLikes() {
    this._like.classList.toggle("elements__like_active");
  }

  _setEventListeners = () => {

    this._imgButton.addEventListener("click", this._handleCardClick.bind(this));

      this._like.addEventListener("click", () => {
        this._toggleLikes();
      });

      this._elementDelete.addEventListener("click", () => {
        this._deleteCard();
      });
      
  };
}

export { Card };
