function PopupWithForm({ popupId, idForm, title, name, children, isOpen, onClose, onSubmit }) {
  return (
    <div id={popupId} className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form id={idForm} className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
        <button
          id="close-delete-form"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
