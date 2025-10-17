import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({
  children,
  color = 'primary', // primary | accent | success | danger | warning | info | neutral
  variant = 'filled', // filled | light | outline
  className,
  ...props
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[color],
    styles[variant],
    className,
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
