import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupId="avatar-popup"
      idForm="avatar-form"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      name="avatar"
      children={
        <>
          <input
            id="avatar-link"
            type="url"
            className="popup__input"
            name="link-avatar"
            placeholder="URL"
            ref={avatarRef}
            required
          />
          <span className="popup__input-error avatar-link-error"></span>
          <button type="submit" className="popup__button">
            Сохранить
          </button>
        </>
      }
    />
  );
}
export default EditAvatarPopup;
