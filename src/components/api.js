const checkResponse = (res) => res.ok ? res.json() : Promise.reject();

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: 'f173879a-095b-4022-b3f6-83d280b36828',
    'Content-Type': 'application/json'
  }
};

// Функция для запроса данных пользователя
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  }).then(checkResponse);
};

// Функция для запроса карточек
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then(checkResponse);
};

// Функция обновления персональных данных
const updateUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(checkResponse);
}
// Функция добавления новой карточки
const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(checkResponse);
};

// Функция удаления карточки
const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse)
};

// Функция для лайка карточки
const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(checkResponse)
};

// Функция для снятия лайка с карточки
const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse)
};

// Функция для обновления аватара пользователя с проверкой, что это URL на изображение
const updateAvatar = (avatarUrl) => {
  // Проверка, что URL ведет к изображению
  const validateImageUrl = (avatarUrl) => {
    return fetch(avatarUrl, { method: 'HEAD' })
      .then((response) => {
        if (response.ok && response.headers.get('Content-Type').includes('image')) {
          return true;
        }
        console.log('Некорректный URL изображения');
      })
      .catch(() => {
        console.log('Ошибка при проверке URL изображения');
      });
  };

  // Проверка, что URL указывает на изображение, и затем отправка запроса на сервер
  return validateImageUrl(avatarUrl)
    .then(() => {
      return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers["Content-Type"]
        },
        body: JSON.stringify({
          avatar: avatarUrl
        })
      }).then(checkResponse);
    })
    .catch((error) => {
      return Promise.reject(console.log(error.message));
    });
};

export { getInitialCards, getUserInfo, updateUserProfile, addNewCard, removeCard, likeCard, unlikeCard, updateAvatar };
