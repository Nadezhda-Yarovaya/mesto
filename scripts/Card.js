<<<<<<< HEAD
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
=======
import {elementsCont} from './index.js';
class Card {
    constructor(card, cardSelector) {
        this._card = card;
        this._name = card.name;
        this._link = card.link;
        this._cardSelector = cardSelector;
    }
    _setListenersCard() {
    const currentImgLink = card.querySelector(".elements__image-btn").src;
    const currentTitle = card.querySelector(".elements__title").textContent;  
    card.querySelector(".elements__image-btn").addEventListener("click", () => {
      newImagePopup.src = `${currentImgLink}`;
      newImagePopup.alt = `${this._name}`;
      imageParagraph.textContent = this._name;
      openPopupByType(popupImage);
    });
    card.querySelector(".elements__like").addEventListener("click", toggleLikes);
    card.querySelector(".elements__delete").addEventListener("click", deleteCard);
  }

_createCard() {
    const newCard = templateCards.content.cloneNode(true);
    newCard.querySelector(".elements__title").textContent = elementName;
    newCard.querySelector(".elements__image-btn").src = elementLink;
    newCard.querySelector(".elements__image-btn").alt = elementLink;
    _setListenersCard(newCard);
    return newCard;
  }
    
    /* other private methods for each EVENT HANDLER */
    returnCard(_createCard);
}

function returnCard(element) {
    elementsCont.append(element);

}

/*это ее селектор и есть же? elements__element*/
export {Card};
>>>>>>> a952f1acc3fe59fe4da29d658b158cb583dd9626
