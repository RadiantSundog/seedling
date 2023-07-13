import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../app/authApi";
import { eventTargetSelector as target, preventDefault } from "../app/utils";
import { showModal, updateField, LOG_IN_MODAL } from "../app/accountSlice";
import ErrorNotification from "../ErrorNotification";
import { useNavigate } from "react-router-dom";
import "./AccountsForm.css";

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

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const response = await logIn({ username, password });
  //   if (response.error) {
  //     console.log(response.error);
  //   } else {
  //     console.log(response.data);
  //     navigate("/");
  //   }
  // };

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
          <form method="POST" onSubmit={preventDefault(logIn, target)}>
            <div className="field">
              <label className="label" htmlFor="email">
                Username
              </label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={username}
                  name="username"
                  className="input"
                  type="text"
                  placeholder="username"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  required
                  onChange={field}
                  value={password}
                  name="password"
                  className="input"
                  type="password"
                  placeholder="secret..."
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button disabled={logInLoading} className="button is-primary">
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  onClick={() => dispatch(showModal(null))}
                  className="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="picture">
          {/* <img src="" alt="login-pic" /> */}
        </div>
      </div>
    </div>
  );
}

export default LogIn;
