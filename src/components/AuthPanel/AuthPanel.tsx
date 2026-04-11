import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { loginUser, logoutUser, registerUser } from "../../api/auth";
import type { StoredAuthData } from "../../types/auth";
import css from "./AuthPanel.module.css";

interface AuthPanelProps {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
  onClose: () => void;
}

export default function AuthPanel({
  authUser,
  setAuthUser,
  onClose,
}: AuthPanelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleWindowKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleCloseClick = () => {
    onClose();
  };

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const handleRegister = async () => {
    try {
      setError("");
      setIsLoading(true);

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const data = await registerUser(trimmedEmail, trimmedPassword);
      setAuthUser(data);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Register failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setError("");
      setIsLoading(true);

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const data = await loginUser(trimmedEmail, trimmedPassword);
      setAuthUser(data);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setAuthUser(null);
    onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <section
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={handleModalClick}
      >
        <div className={css.top}>
          <div>
            <h2 id="auth-modal-title" className={css.title}>
              Authorization
            </h2>
            <p className={css.text}>
              Register a new account or log in to continue.
            </p>
          </div>

          <button
            type="button"
            className={css.closeButton}
            onClick={handleCloseClick}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className={css.fields}>
          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className={css.input}
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.primaryButton}
            onClick={handleRegister}
            disabled={isLoading}
          >
            Register
          </button>

          <button
            type="button"
            className={css.primaryButton}
            onClick={handleLogin}
            disabled={isLoading}
          >
            Login
          </button>

          {authUser && (
            <button
              type="button"
              className={css.secondaryButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        <div className={css.messages}>
          {isLoading && <p className={css.info}>Loading...</p>}
          {error && <p className={css.error}>{error}</p>}
        </div>

        {authUser && (
          <div className={css.userBox}>
            <p className={css.userTitle}>User is logged in</p>
            <p className={css.userText}>Email: {authUser.email}</p>
            <p className={css.userText}>User ID: {authUser.userId}</p>
          </div>
        )}
      </section>
    </div>,
    document.body
  );
}