import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imgContInPopup = this._currentPopup.querySelector(".popup__image");
    this._textInPopup = this._currentPopup.querySelector(
      ".popup__img-paragraph"
    );
  }

  open(cardUrl, cardName) {
    this._imgContInPopup.src = cardUrl;
    this._imgContInPopup.alt = cardName;
    this._textInPopup.textContent = cardName;
    super.open();
  }
}
