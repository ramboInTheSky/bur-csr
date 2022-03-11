import React from 'react';
const InputFeedback = ({ error }) =>
  error ? <span className={'formValidationError'}>{error}</span> : null;

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  disabled,
  className,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id}>
        <input
          name={name}
          id={id}
          type="checkbox"
          value={value}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={'formValidationError'}
        />
        {label}
      </label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

export default Checkbox;
