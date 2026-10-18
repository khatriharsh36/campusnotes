import ErrorMessage from "./ErrorMessage";

export default function SelectField({ label, id, options, error, touched, value, onChange, onBlur, placeholder }) {
  const showError = touched && error;
  const showSuccess = touched && !error && value;

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <select
          id={id}
          className={`form-input form-select ${showError ? "input-error" : ""} ${showSuccess ? "input-success" : ""}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {showSuccess && <span className="input-check">✓</span>}
      </div>
      {showError && <ErrorMessage message={error} />}
    </div>
  );
}
