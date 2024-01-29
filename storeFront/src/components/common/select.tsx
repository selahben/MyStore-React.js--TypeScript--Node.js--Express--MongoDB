type SelectProps = {
  label: string;
  name: string;
  options: {
    text: string;
    value: string;
  }[];
  error: string | false | undefined;
  required?: boolean;
};

export function Select({
  label,
  name,
  options,
  error,
  required = false,
  ...rest
}: SelectProps & React.InputHTMLAttributes<any>) {
  return (
    <div className="form-group mt-1 mb-2">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <select
        {...rest}
        name={name}
        className={["form-select", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      <span className="invalid-feedback">{error}</span>
    </div>
  );
}
