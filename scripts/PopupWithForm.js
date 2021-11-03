import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor (popupSelector, submitForm) {
        /*submitForm is a function */


    }

    _getInputValues() {
        /* 
        Содержит приватный метод _getInputValues, который собирает данные всех полей формы.*/
    }

    
    setEventListeners() {
    }
    /*Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
    должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    */
    close() {

    }
    /*Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.*/


    /*Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/

}