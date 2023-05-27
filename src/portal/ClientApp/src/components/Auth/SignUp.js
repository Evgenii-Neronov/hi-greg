import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валидация email
        if (!email) {
            setEmailError('Введите email');
            return;
        }

        // Валидация пароля
        if (password.length < 5) {
            setPasswordError('Пароль должен быть не менее 5 символов');
            return;
        }

        // Очистка ошибок
        setEmailError('');
        setPasswordError('');

        // Отправка данных на сервер или выполнение другой логики
        // ...
    };

    return (
        <div className="container">
            <h2>Регистрация нового пользователя</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                        id="password"
                        placeholder="Введите пароль (минимум 5 символов)"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default SignUp;
