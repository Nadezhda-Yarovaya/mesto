import {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  closeByEscape,
} from "./index.js";

class Card {
  constructor(cardName, cardLink, cardsSelector) {
    this._name = cardName;
    this._link = cardLink;
    this._cardsSelector = cardsSelector;
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._cardsSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return newCard;
  }

  generateCard = () => {
    this._newCard = this._getTemplate();
    this._setEventListeners();
    this._newCard.querySelector(".elements__title").textContent =
    this._name;
    this._newCard.querySelector(".elements__image-btn").src = this._link;
    return this._newCard;
  };

  _deleteCard = () => {
    this._newCard.remove();
  };

  _handleOpenPopup = () => {
    popupImage.classList.add("popup_opened");
    newImagePopup.src = this._link;
    imageParagraph.textContent = this._name;
    document.addEventListener("keydown", closeByEscape);
  };

  _toggleLikes() {
    this._like = this._newCard.querySelector(".elements__like");
    this._like.classList.toggle("elements__like_active");
  }

  _setEventListeners = () => {
    this._newCard
      .querySelector(".elements__image-btn")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });

    this._newCard
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._toggleLikes();
      });

    this._newCard
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  };
}

export { Card };
