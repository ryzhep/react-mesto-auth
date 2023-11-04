import buttonImage from "../images/button-1.svg";
import plus from "../images/button-2.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <a
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          alt="Аватар профиля"
          className="profile__avatar"
          onClick={onEditAvatar}
        ></a>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__open-popup"
            type="button"
            onClick={onEditProfile}
          >
            <img
              src={buttonImage}
              alt="изображение карандаша для редактирования"
              className="profile__image-edit"
            />
          </button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}>
          <img src={plus} alt="плюсик" className="profile__add-icon" />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
