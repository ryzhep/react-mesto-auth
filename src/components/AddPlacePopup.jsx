import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
  
    React.useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name,
          link
        });
      }

      function handleAddCardName(e) {
        setName(e.target.value);
      }
    
      function handleAddCardLink(e) {
        setLink(e.target.value);
      }

  return (
    <PopupWithForm
    onClose={onClose}
    isOpen={isOpen}
    popupId="newcard-popup"
    idForm="newcard-form"
    title="Новое место"
    name="formEdit"
    onSubmit={handleSubmit}
    children={
      <>
        <input
          id="name-card"
          type="text"
          className="popup__input"
          name="name"
          placeholder="Название"
          required
          value={name || ''}
          onChange={handleAddCardName}
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error name-card-error"></span>
        <input
          id="image-link"
          type="url"
          className="popup__input"
          name="link"
          value={link}
          onChange={handleAddCardLink}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error image-link-error"></span>
        <button type="submit" className="popup__button">
          Создать
        </button>
      </>
    }
  />
  );
}

export default AddPlacePopup;