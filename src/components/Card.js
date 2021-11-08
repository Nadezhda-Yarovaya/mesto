export default class Card {
  constructor({ formData, cardsSelector, handleCardClick }) {
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

  _getTemplate() {
    this._template = document
      .querySelector(this._cardsSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return this._template;
  }

  generateCard = () => {
    this._elementsTitle.textContent = this._name;
    this._imgButton.src = this._link;
    this._imgButton.alt = this._name;
    this._setEventListeners();
    return this._newCard;
  };

  _deleteCard = () => {
    this._newCard.remove();
  };

  _toggleLikes() {
    this._like.classList.toggle("elements__like_active");
  }

  _setEventListeners = () => {
    this._imgButton.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._like.addEventListener("click", () => {
      this._toggleLikes();
    });

    this._elementDelete.addEventListener("click", () => {
      this._deleteCard();
    });
  };
}
