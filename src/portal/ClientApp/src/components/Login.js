import React, { useState } from 'react';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        console.log(`Logging in with ${username} and ${password}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Login;
