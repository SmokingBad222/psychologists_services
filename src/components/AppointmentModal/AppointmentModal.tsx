import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Psychologist } from "../../types/psychologist";
import {
  appointmentSchema,
  type AppointmentFormValues,
} from "../../schemas/appointmentSchema";
import css from "./AppointmentModal.module.css";

interface AppointmentModalProps {
  psychologist: Psychologist;
  onClose: () => void;
}

export default function AppointmentModal({
  psychologist,
  onClose,
}: AppointmentModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      comment: "",
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

  const onSubmit = async (values: AppointmentFormValues) => {
    await Promise.resolve(values);
    setIsSubmitted(true);
    reset();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <section
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        onClick={handleModalClick}
      >
        <div className={css.top}>
          <div>
            <h2 id="appointment-modal-title" className={css.title}>
              Make an appointment
            </h2>
            <p className={css.text}>
              Fill the form below to book a personal meeting with{" "}
              {psychologist.name}.
            </p>
          </div>

          <button
            type="button"
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close appointment modal"
          >
            ×
          </button>
        </div>

        <div className={css.psychologistBox}>
          <img
            className={css.avatar}
            src={psychologist.avatar_url}
            alt={psychologist.name}
          />
          <div>
            <p className={css.psychologistLabel}>Your psychologist</p>
            <p className={css.psychologistName}>{psychologist.name}</p>
          </div>
        </div>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.field}>
            <input
              className={css.input}
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.field}>
            <input
              className={css.input}
              type="tel"
              placeholder="Phone"
              {...register("phone")}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>

          <div className={css.field}>
            <input
              className={css.input}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </div>

          <div className={css.field}>
            <textarea
              className={css.textarea}
              placeholder="Comment"
              rows={5}
              {...register("comment")}
            />
            {errors.comment && (
              <p className={css.error}>{errors.comment.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            Send
          </button>

          {isSubmitted && (
            <p className={css.success}>
              Your appointment request has been sent.
            </p>
          )}
        </form>
      </section>
    </div>,
    document.body
  );
}