import styles from './Textarea.module.scss';

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 1,
  required = false,
  disabled = false,
}) => {
  return (
    <div className={styles.root}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={styles.textarea}
      />
    </div>
  );
};

export default Textarea;
