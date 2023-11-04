import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  },  [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      popupId="edit-popup"
      idForm="edit-form"
      title="Редактировать профиль"
      name="formEdit"
      children={
        <>
          <input
            id="name-input"
            type="text"
            className="popup__input"
            name="name"
            onChange={handleChangeName}
            placeholder="Имя"
            required
            value={name || ''} 
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            id="profession-input"
            type="text"
            className="popup__input"
            name="description"
            onChange={handleChangeAbout}
            placeholder="Вид деятельности"
            required
            value={description || ''}
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error profession-input-error"></span>
          <button type="submit" className="popup__button">
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default EditProfilePopup;
