import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector,submitDeleteForm }) {
    super({ popupSelector });
    this._submitDeleteForm = submitDeleteForm;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form');
  }

  open(element, cardToDelete) {
    this.setEventListeners();
    super.open();
    this._dataObj = element;
    this._cardId= this._dataObj._id;
    this._cardToDelete = cardToDelete;
  }

  closeWithTimeout(popupSelector) {    
    this._currentSelector = popupSelector;
    this._currentPopup1 = document.querySelector(this._currentSelector);
    this._currentPopup1.classList.remove("popup_opened");
    this._currentForm =  this._currentPopup1.querySelector('.popup__form');
    this._currentForm.querySelector('.popup__submit').setAttribute("value", "Да");
    this._currentForm.querySelector('.popup__submit').classList.remove('popup__submit-saving');    
    this._currentForm.reset();
  }

  close() {
    super.close();  
    this._form.reset();
  }

  _savingData() {    
    this._form.querySelector('.popup__submit').value = 'Сохранение...';    
    
    //this._form.querySelector('.popup__submit').classList.add('popup__submit-saving');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._savingData();
      this._submitDeleteForm(this._cardId);
      this._cardToDelete.remove();
    });
  }

}
