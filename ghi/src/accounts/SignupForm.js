import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../app/authApi";
import { updateField, SIGN_UP_MODAL } from "../app/accountSlice";
import ErrorNotification from "../ErrorNotification";
import { useNavigate } from "react-router-dom";
import "./AccountsForm.css";
import PinkPot from "./PinkPot.svg";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, username, password, email } = useSelector(
    (state) => state.account
  );
  const modalClass = `my-modal ${show === SIGN_UP_MODAL ? "is-active" : ""}`;
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
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
    const response = await signUp({ username, password, email });
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
          <div className="col-lg-4 offset-lg-1">
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Sign Up</p>
              </div>
              {error && (
                <ErrorNotification type="danger">
                  {error.data.detail}
                </ErrorNotification>
              )}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a username"
                  onChange={field}
                  value={username}
                  name="username"
                />
                <label className="form-label" htmlFor="form3Example3">
                  Username
                </label>
              </div>
              <div className="form-outline mb-4">
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
                  Sign Up
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <a
                    href="#!"
                    className="link-danger"
                    onClick={() => navigate("/accounts/login/")}
                  >
                    Log Here
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <img
              src={PinkPot}
              alt="seedling-logo"
              height={windowWidth > 768 ? "500" : "250"}
              width={windowWidth > 768 ? "500" : "250"}
              className="title-pic"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
