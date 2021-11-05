import {
  popupImage,
  imageParagraph,
  newImagePopup,
  validationConfig,
  nameResult,
  jobResult,
  nameInput,
  jobInput,
} from "../pages/index.js";

export default class UserInfo {
  constructor(userName, userInfo) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    nameResult.value = this._userName;
    jobResult.value = this._userInfo;
  }

  setUserInfo() {
    nameInput.textContent = this._userName;
    jobInput.textContent = this._userInfo;
  }
}
