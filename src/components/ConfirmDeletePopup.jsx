import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <button
            id="close-delete-form"
            className="popup__close-button"
            type="button"
          ></button>
          <button type="submit" className="popup__submit-button">
            Да
          </button>
        </>
      }
    />
  );
}

export default ConfirmDeletePopup;
