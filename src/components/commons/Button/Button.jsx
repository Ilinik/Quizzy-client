import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({
  children,
  color = 'primary', // primary | accent | success | danger | warning | info | neutral
  variant = 'filled', // filled | light | outline
  className,
  disabled = false,
  ...props
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[color],
    styles[variant],
    disabled && styles.disabled,
    className,
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
