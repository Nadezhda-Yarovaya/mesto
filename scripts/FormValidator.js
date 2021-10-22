import {
  nameInput,
  jobInput,
  popupEdit,
  popupNew,
  popupImage,
  popupEditForm,
  nameResult,
  elementsCont,
  newImagePopup,
  popupNewForm,
} from "./index.js";
/*переменные */
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

class FormValidator {
  constructor(config, formtype) {
    (this._formSelector = config.formSelector),
      (this._inputSelector = config.inputSelector),
      (this._submitButtonSelector = config.submitButtonSelector),
      (this._inactiveButtonClass = config.inactiveButtonClass),
      (this._inputErrorClass = config.inputErrorClass),
      (this._formtype = formtype);
  }

  _setEventListeners = () => {
    const inputsList = Array.from(
      this._formtype.querySelectorAll(this._inputSelector)
    );

    inputsList.forEach((input) => {
      input.addEventListener("input", () => {
        this._input = input;
        this._isFormValid = this._formtype.checkValidity();
        this._isValid();
        this._toggleButtonState();
      });
    });
    this._formtype.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  };

  _toggleButtonState = () => {
    const submitBut = this._formtype.querySelector(this._submitButtonSelector);
    if (this._isFormValid) {
      submitBut.classList.remove(this._inactiveButtonClass);
      submitBut.disabled = false;
    } else {
      submitBut.classList.add(this._inactiveButtonClass);
      submitBut.disabled = true;
    }
  };

  _isValid = () => {
    if (!this._input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _showInputError = () => {
    const errorElement = this._formtype.querySelector(
      `.${this._input.id}-error`
    );
    console.log('input: ' + this._input);
    errorElement.textContent = this._input.validationMessage;
    this._input.classList.add(this._inputErrorClass);
  };

  _hideInputError = () => {
    const errorElement = this._formtype.querySelector(
      `.${this._input.id}-error`
    );
    errorElement.textContent = "";
    this._input.classList.remove(this._inputErrorClass);
  };

  /*public method*/
  enableValidation = () => {
    this._setEventListeners();
  };
}

export { FormValidator, validationConfig };
