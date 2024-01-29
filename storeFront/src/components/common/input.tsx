type InputProps = {
  label: string;
  name: string;
  error: string | false | undefined;
  required?: boolean;
  type: string;
  placeholder?: string;
  id?: string;
};

export function Input({
  label,
  name,
  error,
  required = false,
  ...rest
}: InputProps & React.InputHTMLAttributes<any>) {
  return (
    <div className="form-group mt-1 mb-2">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        {...rest}
        required={required}
        name={name}
        className={["form-control", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      />
      <span className="invalid-feedback">{error}</span>
    </div>
  );
}
