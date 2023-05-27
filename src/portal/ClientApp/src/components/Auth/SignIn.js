import React, { useState } from 'react';

export function SignIn() {
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
    <div className="container">
        <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
        <div className="mb-3">
        <label className="form-label">Username:</label>
        <input type="text" className="form-control" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" name="password" value={password} onChange={handlePasswordChange} /> </div>
        <div className="mb-3">
        <input type="submit" className="btn btn-primary" value="Submit" /></div>
        </form>
        </div>
);
}

export default SignIn;