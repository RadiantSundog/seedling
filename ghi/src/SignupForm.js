import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.prevemtDefault();

    const formData = {
      email: email,
      username: username,
      password: password,
    };

    const response = fetch("/accounts/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newAccount = (await response).json();
      console.log(newAccount);

      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input
          onChange={handleEmailChange}
          value={email}
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          onChange={handleUsernameChange}
          value={username}
          type="text"
          className="form-control"
          id="floatingUsername"
          placeholder="Username"
        />
        <label htmlFor="floatingUsername">Username</label>
      </div>
      <div className="form-floating">
        <input
          onChange={handlePasswordChange}
          value={password}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button className="btn btn-success">Sign Up</button>
    </form>
  );
}

export default Signup;
