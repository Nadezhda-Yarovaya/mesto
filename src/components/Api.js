export default class Api {
    constructor({baseUrl, headers, body}) {
      this._url = baseUrl;
      this._body = body;
      this._headers=headers;

      /*this._cardname = this._body.name;*/
    }


    getProfileInfo() {      
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

    }
  
    getInitialCards() {
      // ...
              /*initial cards fetch и Get rfr cdzpsdftv& */
              /*
      fetch('https://mesto.nomoreparties.co/v1/cohort-30/cards', {
        method: 'GET',
        headers: {
          authorization: 'cd4b9d27-bb3f-46e8-b234-b4266f9e218c' /* уже свой добавила 
        }
      })*/

      /*this method returns me with the response*/
      
        
      return fetch(`${this._url}/cards`, {
        method: "GET",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка такова: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
      
    }

      postNewCard() {
        return fetch(`${this._url}/cards`, {
          method: "POST",
          headers: this._headers,
          body: this._body        
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка такова: ${res.status}`);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
      }

      deleteCard(cardId) {
        this._id = cardId;        
        return fetch(`${this._url}/cards` + this._id, {
          method: "DELETE",
          headers: this._headers,
          body: this._body
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка такова: ${res.status}`);
        })
        .catch((err) => {
          console.log('error this: ' + err); // выведем ошибку в консоль
        }); 
      }
    }
