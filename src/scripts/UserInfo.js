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

export default class UserInfo {
    constructor(userName, userInfo){
        this._userName = userName;
        this._userInfo = userInfo;
        /*Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.*/
    }

    getUserInfo() {
        nameResult.value = this._userName;
        jobResult.value = this._userInfo;
    }
    /*Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.*/

    setUserInfo() {
        nameInput.textContent = this._userName;
        jobInput.textContent = this._userInfo;

    }
    /*Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/


}