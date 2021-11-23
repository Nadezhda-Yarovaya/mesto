export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _getRequest(currentUrl) {
    return fetch(`${this._url}${currentUrl}`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return this._getRequest('/cards');
  }

  postNewCard(newCardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newCardData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  deleteCard(cardId) {
    this._id = cardId;
    return fetch(`${this._url}/cards/${this._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log("Ошибка такова: " + err); 
      });
  }

  _saveProfileAll(data, fetchUrl) {
    return fetch(fetchUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
        avatar: avatarUrl,
      },
      `${this._url}/users/me/avatar`
    );
  }

  loadAvatar() {    
    return this._getRequest('/users/me');
  }

  _likes(methodToUse, cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: methodToUse,
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  putLikes(cardId) {
    return this._likes("PUT", cardId);
  }

  deleteLikes(cardId) {
    return this._likes("DELETE", cardId);
  }
}
