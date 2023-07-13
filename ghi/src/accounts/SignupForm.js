import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../app/authApi";
import { preventDefault } from "../app/utils";
import { showModal, updateField, SIGN_UP_MODAL } from "../app/accountSlice";
import ErrorNotification from "../ErrorNotification";

function SignUp() {
  const dispatch = useDispatch();
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
  const handleSubmit = preventDefault(signUp, () => ({
    username,
    password,
    email,
  }));

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
            <form method="POST" onSubmit={handleSubmit}>
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
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    required
                    onChange={field}
                    value={email}
                    name="email"
                    className="input"
                    type="email"
                    placeholder="YourEmail@email.com"
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    disabled={signUpLoading}
                    className="button is-primary"
                  >
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
        </div>
      </div>
    </section>
  );
}

export default SignUp;
