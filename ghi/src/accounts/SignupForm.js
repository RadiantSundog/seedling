// SignUpForm.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../app/authApi";
import { updateField, SIGN_UP_MODAL } from "../app/accountSlice";
import ErrorNotification from "../ErrorNotification";
import { useNavigate } from "react-router-dom";
import "./AccountsForm.css";

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
    <section>
      <div className={modalClass} key="signup-modal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box content floating-rectangle">
            <h3>Sign Up</h3>
            {error && (
              <ErrorNotification type="danger">
                {error.data.detail}
              </ErrorNotification>
            )}
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
                  required
                  onChange={field}
                  value={email}
                  name="email"
                  id="email"
                  className="form__input"
                  type="email"
                  placeholder="YourEmail@email.com"
                />
              </div>
              <div className="row">
                <input type="submit" value="Submit" className="btn" />
              </div>
            </form>
            <div className="row">
            <p>
              Already have an account? <br></br>
              <a href="#" onClick={() => navigate("/accounts/login/")}>Log In Here</a>
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
