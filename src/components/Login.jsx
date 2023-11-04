import React from 'react';

const Login = ({ handleLogIn }) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    handleLogIn(userEmail, userPassword);
  };
  
  React.useEffect(() => {
    const previousEmail = localStorage.getItem('userName');
    const previousPassword = localStorage.getItem('userPassword');

    previousEmail ? setUserEmail(previousEmail) : setUserEmail('');
    previousPassword ? setUserPassword(previousPassword) : setUserPassword('');
  }, []);

  return (
    <form name="login" onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form__title">Вход</h2>
      <input
        className="auth-form__input"
        type="email"
        name="userEmail"
        placeholder="Email"
        value={userEmail}
        onChange={({ target: { value } }) => setUserEmail(value)}
        required
      />
      <input
        className="auth-form__input"
        type="password"
        name="userPassword"
        placeholder="Пароль"
        value={userPassword}
        onChange={({ target: { value } }) => setUserPassword(value)}
        required
      />
      <button type="submit" className="auth-form__submit-button">
        Войти
      </button>
    </form>
  );
};

export default Login;