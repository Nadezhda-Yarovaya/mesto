export default class Card {
  constructor({ formData, cardsSelector, handleCardClick, handleDeleteClick, api }) { /* передать тут, получается */
    this._api = api; /*говорит сюда нужно вместо апи колбэк, он и опишет логику удаления */
   /* this._removeCard = removeCard;*/
    this._data=formData;
    this._name = this._data.name;
    this._link = this._data.link;
    this._cardId = this._data._id;    
    this._myOwnerId = 'b495d05138b6ee7131b5aa05';    
    this._cardsSelector = cardsSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._newCard = this._getTemplate();
    this._likesNumberCont = this._newCard.querySelector('.elements__likes-number');
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
      if ("owner" in this._data) {
      this._ownerId = this._data.owner._id;
      if(this._ownerId !== this._myOwnerId) {
        console.log('my owner id: ' + this._myOwnerId);
      this._template.querySelector('.elements__delete').classList.add('elements__delete_hidden');
      }
    }
    return this._template;
  }

  generateCard = () => {
  
    this._elementsTitle.textContent = this._name;
    this._imgButton.src = this._link;
    this._imgButton.alt = this._name;
    if ("likes" in this._data) { this._likesNumber = this._data.likes.length;
    this._likesNumberCont.textContent =  this._likesNumber;
    }
    for (let i=0;i<this._likesNumber;i++){
    if (this._data.likes[i]._id === this._myOwnerId) {
      this._like.classList.add('elements__like_active');
      break;
    }
  }
    this._setEventListeners();
    return this._newCard;
  };

  deleteCard = () => {
     /* all works, but with no callback, but api transfer */
    this._api.deleteCard(this._cardId)
    .then(()=>
    {
      this._newCard.remove();
    })
    .catch(err => console.log(err));    
  };
/*
  _toggleLikes() {
    this._api.putLikes(this._cardId)
    .then(res=>{
      console.log('likes-res: ' + res);
      this._like.classList.toggle("elements__like_active");
      this._likesNumberCont.textContent =  this._likesNumber + 1;
    });
    
  }*/

  _setLikes() {
    this._api.putLikes(this._cardId)
    .then(res=>{
      this._like.classList.add("elements__like_active");
      this._likesNumberCont.textContent =  this._likesNumber + 1;
    });
    
  }

  _deleteLikes() {
    this._api.deleteLikes(this._cardId)
    .then(res=>{
      this._like.classList.remove("elements__like_active");
      this._likesNumberCont.textContent =  this._likesNumber - 1;
    });
    
  }

  _setEventListeners = () => {
    this._imgButton.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._like.addEventListener("click", () => {
           if (this._like.classList.contains('elements__like_active')) {
      this._deleteLikes();
           }
           else {
             this._setLikes();
           }
    });

    this._elementDelete.addEventListener("click", () => {
      this._handleDeleteClick();
      /*this._deleteCard();*/
     /* this._removeCard();*/
    });
  };
}
