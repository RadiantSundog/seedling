import { useCallback, useState, useEffect } from "react";
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
  const [logIn, { isLoading: logInLoading }] = useLogInMutation();
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await logIn({ username, password });
    if (response.error) {
      setError("Incorrect username or password");
    } else {
      dispatch(showModal(null));
      dispatch(updateToken(response.data.token));
      navigate("/");
    }
  };

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <img
              src={BluePot}
              alt="seedling-logo"
              height={windowWidth > 768 ? "500" : "250"}
              width={windowWidth > 768 ? "500" : "250"}
              className="title-pic"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Login</p>
              </div>
              {error ? (
                <ErrorNotification type="danger">
                  {error.data.detail}
                </ErrorNotification>
              ) : null}
              <div className="form-group">
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
              </div>
              <div className="row">
                <p>
                  Don't have an account? <br />
                  <a href="#" onClick={() => navigate("/accounts/signup/")}>
                    Register Here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
