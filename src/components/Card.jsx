import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
const currentUser = React.useContext(CurrentUserContext);
// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner._id === currentUser._id;
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some((i) => i._id === currentUser._id);
// Создаём переменную, которую после зададим в className для кнопки лайка
const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

const cardDeleteButtonClassName = `element__delete ${
  isOwn ? '' : 'element__delete_invisible'
}`;
  return (

    <article className="element">
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img
        className="element__image"
        onClick={handleCardClick}
        src={card.link}
        title={card.name}
        alt={card.name}
  
      />
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-elements">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
