import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onRegister(userEmail, userPassword);
  };

  return (
    <form name="registration" className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Регистрация</h2>
      <input
        className="auth-form__input"
        type="email"
        name="email"
        placeholder="Email"
        value={userEmail}
        onChange={({ target }) => setUserEmail(target.value)}
        autoComplete="off"
      />
      <input
        className="auth-form__input"
        type="password"
        name="password"
        placeholder="Пароль"
        value={userPassword}
        onChange={({ target }) => setUserPassword(target.value)}
        autoComplete="off"
      />
      <button type="submit" className="auth-form__submit-button">
        Зарегистрироваться
      </button>
      <p className="auth-form__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="auth-form__link">
          {' '}
          Войти
        </Link>
      </p>
    </form>
  );
};
export default Register;