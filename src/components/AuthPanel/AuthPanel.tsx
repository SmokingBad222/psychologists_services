import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../../api/auth";
import type { StoredAuthData } from "../../types/auth";
import { authSchema, type AuthFormValues } from "../../schemas/authSchema";
import css from "./AuthPanel.module.css";


interface AuthPanelProps {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
  onClose: () => void;
  mode: "login" | "register";
}

export default function AuthPanel({
  authUser,
  setAuthUser,
  onClose,
  mode,
}: AuthPanelProps) {

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoginMode = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormValues>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleSubmitForm = async (values: AuthFormValues) => {
    try {
      setServerError("");
      setIsLoading(true);

      const data = isLoginMode
        ? await loginUser(values.email.trim(), values.password.trim())
        : await registerUser(values.email.trim(), values.password.trim());
      
      setAuthUser(data);
      reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError(isLoginMode ? "Login failed" : "Register failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authUser) {
    return null;
  }


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
          <div className={ css.heading}>
            <h2 id="auth-modal-title" className={css.title}>
              {isLoginMode ? "Log In" : "Registration"}
            </h2>

            <p className={css.text}>
              { isLoginMode ? "Welcome back! Please enter your credentials to access your account and continue your search for a psychologist."
                : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."}
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

        <form className={css.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={css.fields}>
            <div className={css.field}>
              <input
                className={css.input}
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className={css.error}>{ errors.email.message}</p>
              )}
            </div>
  
            <div className={css.field}>
              <input
                className={css.input}
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className={css.error}>{ errors.password.message}</p>
              )}
            </div>
          </div>
  
          <div className={css.actions}>
            <button
              type="submit"
              className={css.primaryButton}
              disabled={isLoading}
            >
              {isLoginMode ? "Log In" : "Sign Up"}
            </button>
          </div>
  
          <div className={css.messages}>
            {isLoading && <p className={css.info}>Loading...</p>}
            {serverError && <p className={css.error}>{serverError}</p>}
          </div>
        </form>
      </section>
    </div>,
    document.body
  );
}