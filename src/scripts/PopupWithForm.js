import {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  nameResult,
  jobResult,
  nameInput,
  jobInput,
} from "./index.js";

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super({ popupSelector });
    this._popupSelector = popupSelector;
    this._currentPopup = document.querySelector(this._popupSelector);
    this._submitForm = submitForm;
    this._form = this._currentPopup.querySelector(".popup__form");
    this._closbyEsc = super._handleEscClose;
  }
  _getInputValues() {
    /* универсально подцепляет все значения из формы */
    this._inputList = this._currentPopup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    this._currentPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => this._closbyEsc(evt));
    this._form.reset();
  }

  setEventListeners() {
    this._currentPopup
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        this.close();
      });

    this._currentPopup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}
