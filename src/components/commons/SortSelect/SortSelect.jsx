import styles from './SortSelect.module.scss';

const SortSelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="" disabled className={styles.option}>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={styles.option}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
