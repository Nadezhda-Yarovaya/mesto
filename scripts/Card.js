import {
  nameInput,
  jobInput,
  popupEdit,
  popupNew,
  popupImage,
  imageParagraph,
  popupEditForm,
  nameResult,
  elementsCont,
  newImagePopup,
} from "./index.js";

class CardItem {
  constructor(items, cardsSelector) {
    this._items = items;
    this._name = items.name;
    this._link = items.link;
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
      this._items.name;
    this._newCard.querySelector(".elements__image-btn").src = this._items.link;
    return this._newCard;
  };

  _deleteCard = () => {
    this._newCard.remove();
  };

  _handleOpenPopup = () => {
    popupImage.classList.add("popup_opened");
    newImagePopup.src = this._link;
    imageParagraph.textContent = this._name;
  };

  _handleClosePopup() {
    newImagePopup.src = "";
    imageParagraph.textContent = "";
    popupImage.remove("popup_opened");
  }

  _toggleLikes() {
    this._like=this._newCard.querySelector('.elements__like');
    this._like.classList.toggle("elements__like_active");
  }

  _setEventListeners = () => {
    this._newCard
      .querySelector(".elements__image-btn")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });

      this._newCard.querySelector('.elements__like').addEventListener('click', () => {
      this._toggleLikes();
      });

    this._newCard
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  };
}

export { CardItem };
