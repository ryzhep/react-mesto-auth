

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Что-то пошло не так...");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Все карточки
  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //Загрузка информации о пользователе с сервера
  getInfoUser() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //Редактирование профиля
  editProfile(data) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  //Редактирование аватара
  newAvatar(avatar) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      }),
    });
  }

  //Добавление новой карточки
  apiAddNewCard(newCard) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link:newCard.link,
      }),
    });
  }

  // удаление карточки
  deleteCard(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }


// добавить убрать лайк
  changeLikeCardStatus(cardId, isLiked) {
    return this._sendRequest(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    });
  }
}

 const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "9e1ba490-d05f-4831-95ed-e11f8659a9e1",
    "Content-Type": "application/json",
  }
});

export default api;