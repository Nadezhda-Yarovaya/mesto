import {nameInput,jobInput,popupImage,popupEditForm,nameResult,jobResult,popupNewForm,buttonEditPopup,buttonNewPopup, elementsCont, 
  newImagePopup, imageParagraph, validationConfig, initialCards} from "../utils/constants.js";


import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector}) { 
    /*Конструктор текущего класса должен принимать только 1 аргумент — селектор попапа.*/
    super({ popupSelector });

    /*     this._popupSelector = popupSelector;  Данную строку следует удалить, так как доступ к данному свойству обеспечен через наследование класса Popup*/
    /*this._popupImg = popupImg;
    this._popupNote = popupNote;*/
    /*
    this._currentPopup = document.querySelector(this._popupSelector);
    Данную строку следует удалить, так как доступ к данному свойству обеспечен через наследование класса Popup */
    this._imgContInPopup = this._currentPopup.querySelector(".popup__image");
    this._textInPopup = this._currentPopup.querySelector(".popup__img-paragraph");
    /*
    this._closbyEsc = super._handleEscClose;
    Данную строку следует удалить, так как функционал закрытия попапа по нажатию на ESC обеспечивается наследованием класса Popup
    */
  }

  open(imageUrl, imageName) { /*Текущий метод должен принимать 2 аргумента — название карточки и ссылку*/
    super.open();
    /*this._currentPopup.classList.add("popup_opened");  а этот надо? */
    super.setEventListeners(); /*В данном месте должно быть  super.open(); листнеры пока оставлю*/
    this._imgContInPopup.src = imageUrl;
    this._imgContInPopup.alt = imageName;
    this._textInPopup.textContent = this._popupNote;
    
    /*
    document.addEventListener("keydown", (evt) => this._closbyEsc(evt));
    Данную строку следует удалить, так как функционал закрытия попапа по нажатию на ESC обеспечивается наследованием класса Popup
    */
  }
}
