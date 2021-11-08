export default class FormValidator {
  constructor(config, formtype) {
    (this._formSelector = config.formSelector),
      (this._inputSelector = config.inputSelector),
      (this._submitButtonSelector = config.submitButtonSelector),
      (this._inactiveButtonClass = config.inactiveButtonClass),
      (this._inputErrorClass = config.inputErrorClass),
      (this._formtype = formtype),
      (this._inputsList = Array.from(
        this._formtype.querySelectorAll(this._inputSelector)
      ));
    this._submitBut = this._formtype.querySelector(this._submitButtonSelector);
  }

  _setEventListeners = () => {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._input = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });
    this._formtype.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  };

  _toggleButtonState = () => {
    if (this._formtype.checkValidity()) {
      this._submitBut.classList.remove(this._inactiveButtonClass);
      this._submitBut.disabled = false;
    } else {
      this._submitBut.classList.add(this._inactiveButtonClass);
      this._submitBut.disabled = true;
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
  resetValidation() {
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      this._input = inputElement;
      this._hideInputError();
    });
  }

  /*public method*/
  enableValidation = () => {
    this._setEventListeners();
  };
}
