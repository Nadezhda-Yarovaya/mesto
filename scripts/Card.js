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