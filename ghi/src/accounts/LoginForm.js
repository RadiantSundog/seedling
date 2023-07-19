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
        <div className="row d-flex align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Login</p>
              </div>
              {error && (
                <ErrorNotification type="danger">{error}</ErrorNotification>
              )}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  onChange={field}
                  value={username}
                  name="username"
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  onChange={field}
                  value={password}
                  name="password"
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember_me"
                  name="remember_me"
                />
                <label className="form-check-label" htmlFor="remember_me">
                  Remember Me!
                </label>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="link-danger"
                    onClick={() => navigate("/accounts/signup/")}
                  >
                    Register Here
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <div className="image-container">
              <img
                src={BluePot}
                alt="seedling-logo"
                height={windowWidth > 768 ? "500" : "250"}
                width={windowWidth > 768 ? "500" : "250"}
                className="title-pic"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
