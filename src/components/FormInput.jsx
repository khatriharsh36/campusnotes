import ErrorMessage from "./ErrorMessage";

export default function FormInput({ label, id, error, touched, success, ...props }) {
  const showError = touched && error;
  const showSuccess = touched && !error && props.value;

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <input
          id={id}
          className={`form-input ${showError ? "input-error" : ""} ${showSuccess ? "input-success" : ""}`}
          {...props}
        />
        {showSuccess && <span className="input-check">✓</span>}
      </div>
      {showError && <ErrorMessage message={error} />}
    </div>
  );
}
