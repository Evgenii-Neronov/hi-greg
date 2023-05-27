import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ResetPwd = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на совпадение нового и подтверждающего паролей
        if (newPassword !== confirmPassword) {
            setPasswordError('Новый пароль и подтверждение пароля не совпадают');
            return;
        }

        // Очистка ошибки
        setPasswordError('');

        // Отправка данных на сервер или выполнение другой логики
        // ...
    };

    return (
        <div className="container">
            <h2>Смена пароля</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Текущий пароль:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        placeholder="Введите текущий пароль"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Новый пароль:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Введите новый пароль"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Подтвердите новый пароль:</label>
                    <input
                        type="password"
                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        placeholder="Подтвердите новый пароль"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                <button type="submit" className="btn btn-primary">
                    Сменить пароль
                </button>
            </form>
        </div>
    );
};

export default ResetPwd;
