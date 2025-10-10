import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({
  children,
  color = 'primary', // primary | accent | success | neutral
  outline = false,
  className,
  ...props
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[color],
    outline && styles.outline,
    className,
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
