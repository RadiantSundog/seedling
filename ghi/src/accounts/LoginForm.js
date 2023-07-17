import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../app/authApi";
import { updateField, LOG_IN_MODAL } from "../app/accountSlice";
import ErrorNotification from "../ErrorNotification";
import { useNavigate } from "react-router-dom";
import "./AccountsForm.css";
import BluePot from "./BluePot.svg";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, username, password } = useSelector((state) => state.account);
  const modalClass = `my-modal ${show === LOG_IN_MODAL ? "is-active" : ""}`;
  const [logIn, { error, isLoading: logInLoading }] = useLogInMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );



  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              {error && (
                <ErrorNotification type="danger">
                  {error.data.detail}
                </ErrorNotification>
              )}
              <div className="form-outline mb-4">
                <input
                  type="string"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter username"
                  onChange={field}
                  value={username}
                  name="username"
                />
                <label className="form-label" htmlFor="form3Example3">
                  Username
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={field}
                  value={password}
                  name="password"
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="link-danger"
                    onClick={() => navigate("/accounts/signup/")}
                  >
                    Register
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
