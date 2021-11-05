import {
    popupImage,
    imageParagraph,
    newImagePopup,
    validationConfig,
    nameResult,
    jobResult,
    nameInput,
    jobInput
  } from "./index.js";
  
import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor ({ popupSelector, submitForm }) {
        super( {popupSelector }); /* правильно должно быть */
        this._popupSelector = popupSelector;        
    this._currentPopup = document.querySelector(this._popupSelector);
        this._submitForm = submitForm;
        /*submitForm is a function  */
    }
                
        _getInputValues() { /* универсально подцепляет все значения из формы */
            this._inputList =  this._currentPopup.querySelectorAll('.popup__input');  
            this._formValues = {};  
            this._inputList.forEach(input => {
              this._formValues[input.name] = input.value;
            });
          
            return this._formValues;
        }
    
        setEventListeners() {
            this._currentPopup.querySelector(".popup__close-btn").addEventListener("click", () => {
                super.close();
              });
        
              this._currentPopup.addEventListener("click", (evt) => {
                if (evt.target === evt.currentTarget) {
                  super.close();
                }
          });

          this._currentPopup.querySelector('.popup__form').addEventListener("submit", (evt) => {                
              evt.preventDefault();
                this._submitForm(this._getInputValues());
                super.close();                
        });
    }
   

}