import styles from './Input.module.scss';

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  style,
}) => {
  return (
    <div style={style} className={styles.root}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
