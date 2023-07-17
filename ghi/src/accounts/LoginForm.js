// LoginForm.js
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../app/authApi";
import {
  updateField,
  LOG_IN_MODAL,
  updateToken,
  showModal,
} from "../app/accountSlice";
import ErrorNotification from "../ErrorNotification";
import { useNavigate } from "react-router-dom";
import "./AccountsForm.css";
import BluePot from "./BluePot.svg";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, username, password } = useSelector((state) => state.account);
  const modalClass = `my-modal ${show === LOG_IN_MODAL ? "is-active" : ""}`;
  const [logIn, { isLoading: logInLoading }] = useLogInMutation();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await logIn({ username, password });
    if (error) {
      setError("Incorrect username or password");
    } else {
      dispatch(showModal(null));
      dispatch(updateToken(data.token));
      navigate("/");
    }
  };

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await logIn({ username, password });
    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response.data);
      navigate("/");
    }
  };

  return (
    <div className={modalClass} key="login-modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box content floating-rectangle">
          <h3>Log In</h3>
          {error ? (
            <ErrorNotification type="danger">
              {error.data.detail}
            </ErrorNotification>
          ) : null}
          <form onSubmit={handleSubmit} className="form-group">
            <div className="row">
              <input
                required
                onChange={field}
                value={username}
                name="username"
                id="username"
                className="form__input"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="row">
              <input
                required
                onChange={field}
                value={password}
                name="password"
                id="password"
                className="form__input"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="remember_me"
                id="remember_me"
                className=""
              />
              <label htmlFor="remember_me">Remember Me!</label>
            </div>
            <div className="row">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </form>
          <div className="row">
            <p>
              Don't have an account? <br></br>
              <a href="#" onClick={() => navigate("/accounts/signup/")}>Register Here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
