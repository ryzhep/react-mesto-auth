
function ImagePopup({ card, onClose }) {
    
    return (
      <div id="image-popup" className={`popup ${card.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
      <img className="popup__image" id="pupup__image" src={card.link} alt={card.name}/>
      <h2 className="popup__title-image" id="popup-name">{card.name}</h2>
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
  export default ImagePopup;


