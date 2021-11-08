import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imgContInPopup = this._currentPopup.querySelector(".popup__image");
    this._textInPopup = this._currentPopup.querySelector(
      ".popup__img-paragraph"
    );
  }

  open(imageUrl, imageName) { 
    this._imgContInPopup.src = imageUrl;
    this._imgContInPopup.alt = imageName;
    this._textInPopup.textContent = imageName;
    super.setEventListeners();
    super.open();
  }
}
