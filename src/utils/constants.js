export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    descr: "Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    descr: "Челябинская область",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    descr: "Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    descr: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    descr: "Холмогорский район",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    descr: "Байкал",
  },
];

// объекты, которые надо валидировать
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


export const buttonOpenEditProfilePopup = document.querySelector(".profile__open-popup");
export const buttonOpenAddCardPopup = document.querySelector(".profile__add");
export const buttonOpenAvatarPopup = document.querySelector(".profile__avatar");

export const buttonCloseEditProfilePopup = document.querySelector("#close-edit-form");
export const buttonCloseAvatarPopup = document.querySelector("#close-avatar-form");
export const buttonCloseImagePopup = document.querySelector("#close-image-form");

export const popupEditProfile = document.querySelector("#edit-popup");
export const popupAddCard = document.querySelector("#newcard-popup");
export const popupNewAvatar = document.querySelector("#avatar-popup");

export const inputName = document.querySelector('input[name="name"]');
export const inputDescription = document.querySelector('input[name="description"]');
export const inputAvatarProfile = document.querySelector('input[name="inputAvatar"]');
export const buttonOpenProfileAvatar = document.querySelector('.profile__avatar');



