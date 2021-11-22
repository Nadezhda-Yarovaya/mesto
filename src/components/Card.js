export default class Card {
  constructor({ formData, cardsSelector, handleCardClick, handleDeleteClick, api }) { /* передать тут, получается */
    this._api = api; /*говорит сюда нужно вместо апи колбэк, он и опишет логику удаления */
    this._name = formData.name;
    this._link = formData.link;
    this._cardId = formData.id;
    this._ownerId = formData.owner._id;
    this._cardsSelector = cardsSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
      if(this._ownerId !== 'b495d05138b6ee7131b5aa05') {
      this._template.querySelector('.elements__delete').classList.add('elements__delete_hidden');
      }
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
    this._api.deleteCard(this._cardId)
    .then(()=>
    {
      this._newCard.remove();
    })
    .catch(err => console.log(err));

    
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
      /*this._deleteCard();*/
      this._handleDeleteClick();
    });
  };
}
