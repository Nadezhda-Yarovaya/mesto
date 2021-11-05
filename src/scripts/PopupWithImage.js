import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupImg, popupNote }) {
    super({ popupSelector });
    this._popupSelector = popupSelector;
    this._popupImg = popupImg;
    this._popupNote = popupNote;
    this._currentPopup = document.querySelector(this._popupSelector);
    this._imgContInPopup = this._currentPopup.querySelector(".popup__image");
    this._textInPopup = this._currentPopup.querySelector(
      ".popup__img-paragraph"
    );
    this._closbyEsc = super._handleEscClose;
  }

  open() {
    super.setEventListeners();
    this._imgContInPopup.src = this._popupImg;
    this._imgContInPopup.alt = this._popupNote;
    this._textInPopup.textContent = this._popupNote;
    this._currentPopup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => this._closbyEsc(evt));
  }
}
