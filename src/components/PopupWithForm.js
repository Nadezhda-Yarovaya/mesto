import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm}) {
    super({ popupSelector });
    
    this._submitForm = submitForm;
    this._form = this._currentPopup.querySelector(".popup__form");
    
    this._popupSelector = popupSelector;
  }

  getInputValues() {
    this._inputList = this._currentPopup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  closeWithTimeout(popupSelector) {
    this._currentSelector = popupSelector;
    this._currentPopup1 = document.querySelector(this._currentSelector);
    this._currentPopup1.classList.remove("popup_opened");
    this._currentForm =  this._currentPopup1.querySelector('.popup__form');
    this._currentForm.querySelector('.popup__submit').setAttribute("value", "Сохранить");
    if (this._currentSelector === ".popup_type_new-place") {
      this._currentForm.querySelector('.popup__submit').setAttribute("value", "Создать");
    }
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
      this._submitForm();    
    });
  }
}
