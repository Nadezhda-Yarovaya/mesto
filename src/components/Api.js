export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка такова: ${res.status}`);
  }

  _getRequest(currentUrl) {
    return fetch(`${this._url}${currentUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return this._getRequest("/cards");
  }
  getProfileInfo() {
    return this._getRequest("/users/me");
  }

  postNewCard(newCardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newCardData),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    this._id = cardId;
    return fetch(`${this._url}/cards/${this._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _saveProfileAll(data, fetchUrl) {
    return fetch(fetchUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  saveProfileData(nameResult, jobResult) {
    return this._saveProfileAll(
      {
        name: nameResult,
        about: jobResult,
      },
      `${this._url}/users/me`
    );
  }

  saveAvatarUrl(avatarUrl) {
    return this._saveProfileAll(
      {
        avatar: avatarUrl.avatarupdate,
      },
      `${this._url}/users/me/avatar`
    );
  }

  _likes(methodToUse, cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: methodToUse,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  putLikes(cardId) {
    return this._likes("PUT", cardId);
  }

  deleteLikes(cardId) {
    return this._likes("DELETE", cardId);
  }
}
