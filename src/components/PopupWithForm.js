import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super({ popupSelector });
    this._submitForm = submitForm;
    this._form = this._currentPopup.querySelector(".popup__form");
    this._inputList = this._currentPopup.querySelectorAll(".popup__input");
    this._popupButton = this._form.querySelector(".popup__submit");
    this._popupSelector = popupSelector;
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _savingData() {
    this._popupButton.value = "Сохранение...";
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
