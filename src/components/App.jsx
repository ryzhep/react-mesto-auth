import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api.js";
import EditProfilePopup from "../components/EditProfilePopup.jsx";
import EditAvatarPopup from "../components/EditAvatarPopup.jsx";
import AddPlacePopup from "../components/AddPlacePopup.jsx";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup.jsx";
//12 работа
import ProtectedRouteElement from "./ProtectedRoute.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import  * as auth from "../utils/auth.js";

function App() {
  // переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false,
  });
  const [currentUser, setCurrentUser] = React.useState({});

  //12 работа
  const [isSucceeded, setIsSucceeded] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getInfoUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [loggedIn]);


  const checkToken = jwt => {
    auth
      .checkToken(jwt)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(`Ошибка доступа: ${err}`);
      });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt);
    }
  }, []);


  const handleLogIn = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        if (res.statusCode === 401) throw new Error("Ошибка авторизации");
        if (res) {
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("userName", email);
          localStorage.setItem("userPassword", password);
          setLoggedIn(true);
          navigate("/",{ replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in', { replace: true }).catch(err => console.log(`Ошибка ${err}`));
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) {
          setIsSucceeded(false);
          setInfoTooltipOpen(true);
        } else {
          setIsSucceeded(true);
          setInfoTooltipOpen(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setIsSucceeded(false);
        setInfoTooltipOpen(true);
        console.log(`Ошибка: ${err}`);
      });
  };

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name, isOpen: true });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleConfirmDeleteClick(card) {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setSelectedCardDelete(card);
  }
  function handleCardDelete() {
    api
      .deleteCard(selectedCardDelete._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== selectedCardDelete._id);
        setCards(newCards);
        setSelectedCardDelete();
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: "", name: "", isOpen: false });
    setConfirmDeletePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  //изменяют значение
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
 
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then(() => {
        setCurrentUser((prevUser) => ({
          ...prevUser, // сохраняем предыдущие свойства пользователя
          ...data, // обновляем только измененные свойства из data
        }));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .newAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .apiAddNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignout={handleSignout}/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDeleteClick}
              />
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login handleLogIn={handleLogIn} />} />
          <Route path="/" element={!loggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/" />} />
        </Routes>
       
        <Footer />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSucceeded={isSucceeded}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
